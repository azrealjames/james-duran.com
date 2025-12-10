"use server"

import nodemailer from "nodemailer"

// Rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; timestamp: number }>()

export async function sendContactEmail(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string
  const honeypot = formData.get("website") as string

  // Honeypot check - if filled, it's a bot
  if (honeypot) {
    return { success: false, error: "Invalid submission" }
  }

  // Validate inputs
  if (!name || !email || !subject || !message) {
    return { success: false, error: "All fields are required" }
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: "Invalid email address" }
  }

  // Rate limiting - 3 submissions per 5 minutes per email
  const now = Date.now()
  const rateKey = email.toLowerCase()
  const existing = rateLimitStore.get(rateKey)

  if (existing) {
    const timeDiff = now - existing.timestamp
    if (timeDiff < 5 * 60 * 1000) {
      // Within 5 minutes
      if (existing.count >= 3) {
        return { success: false, error: "Too many submissions. Please try again later." }
      }
      existing.count++
    } else {
      // Reset after 5 minutes
      rateLimitStore.set(rateKey, { count: 1, timestamp: now })
    }
  } else {
    rateLimitStore.set(rateKey, { count: 1, timestamp: now })
  }

  // Send email using nodemailer
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `Portfolio Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
      replyTo: email,
    })

    return { success: true }
  } catch (error) {
    console.error("Email send error:", error)
    return { success: false, error: "Failed to send email. Please try again later." }
  }
}
