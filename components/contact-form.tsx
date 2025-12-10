"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { sendContactEmail } from "@/app/actions/contact"
import { Loader2 } from "lucide-react"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)

    try {
      const result = await sendContactEmail(formData)

      if (result.success) {
        setMessage({ type: "success", text: "Message sent successfully! I'll get back to you soon." })
        e.currentTarget.reset()
      } else {
        setMessage({ type: "error", text: result.error || "Failed to send message. Please try again." })
      }
    } catch (error) {
      setMessage({ type: "error", text: "An unexpected error occurred. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="bg-[#1a1f2e] border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>
        <div>
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="bg-[#1a1f2e] border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>
      </div>

      <div>
        <Input
          type="text"
          name="subject"
          placeholder="Subject"
          required
          className="bg-[#1a1f2e] border-gray-700 text-white placeholder:text-gray-500"
        />
      </div>

      <div>
        <Textarea
          name="message"
          placeholder="Your Message"
          required
          rows={6}
          className="bg-[#1a1f2e] border-gray-700 text-white placeholder:text-gray-500 resize-none"
        />
      </div>

      {/* Honeypot field - hidden from real users but visible to bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      {message && (
        <div
          className={`p-4 rounded-md ${
            message.type === "success"
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : "bg-red-500/10 text-red-400 border border-red-500/20"
          }`}
        >
          {message.text}
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-6 text-base"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  )
}
