"use server"

import { headers } from "next/headers"
import nodemailer from "nodemailer"

// Rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}, 3600000)

function checkRateLimit(identifier: string): boolean {
  const now = Date.now()
  const entry = rateLimitStore.get(identifier)

  if (!entry || now > entry.resetTime) {
    // First request or expired, create new entry
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + 5 * 60 * 1000, // 5 minutes
    })
    return true
  }

  if (entry.count >= 3) {
    // Rate limit exceeded
    return false
  }

  // Increment count
  entry.count++
  return true
}

export async function sendContactEmail(formData: FormData) {
  try {
    // Extract form data
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string
    const website = formData.get("website") as string

    // Honeypot check - if this field is filled, it's a bot
    if (website) {
      console.log("[v0] Bot detected via honeypot field")
      return { success: false, error: "Invalid submission" }
    }

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return { success: false, error: "All fields are required" }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { success: false, error: "Invalid email address" }
    }

    // Validate lengths
    if (name.length > 100 || email.length > 100 || subject.length > 200 || message.length > 2000) {
      return { success: false, error: "Input exceeds maximum length" }
    }

    // Rate limiting by email
    if (!checkRateLimit(email)) {
      return { success: false, error: "Too many requests. Please try again in a few minutes." }
    }

    // Get IP for additional rate limiting (optional)
    const headersList = await headers()
    const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown"
    if (!checkRateLimit(ip)) {
      return { success: false, error: "Too many requests from your network. Please try again later." }
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <br>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error("[v0] Error sending email:", error)
    return { success: false, error: "Failed to send message. Please try again later." }
  }
}
