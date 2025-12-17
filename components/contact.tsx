"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    _honeypot: "",
  })

  const [formStatus, setFormStatus] = useState<{
    submitted: boolean
    success: boolean
    message: string
  } | null>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData._honeypot) {
      console.log("[v0] Spam detected via honeypot")
      setFormStatus({
        submitted: true,
        success: false,
        message: "Invalid submission detected.",
      })
      return
    }

    setIsSubmitting(true)

    try {
      if (typeof window !== "undefined" && window.location) {
        const form = e.target as HTMLFormElement
        const formAction = `https://formsubmit.co/${encodeURIComponent("azrealjames@gmail.com")}`

        const hiddenForm = document.createElement("form")
        hiddenForm.method = "POST"
        hiddenForm.action = formAction
        hiddenForm.style.display = "none"

        // Add form data (excluding honeypot)
        for (const key in formData) {
          if (Object.prototype.hasOwnProperty.call(formData, key) && key !== "_honeypot") {
            const input = document.createElement("input")
            input.type = "hidden"
            input.name = key
            // @ts-ignore
            input.value = formData[key]
            hiddenForm.appendChild(input)
          }
        }

        const redirectInput = document.createElement("input")
        redirectInput.type = "hidden"
        redirectInput.name = "_next"
        redirectInput.value = window.location.href
        hiddenForm.appendChild(redirectInput)

        const subjectInput = document.createElement("input")
        subjectInput.type = "hidden"
        subjectInput.name = "_subject"
        subjectInput.value = `Portfolio Contact: ${formData.subject}`
        hiddenForm.appendChild(subjectInput)

        const captchaInput = document.createElement("input")
        captchaInput.type = "hidden"
        captchaInput.name = "_captcha"
        captchaInput.value = "true"
        hiddenForm.appendChild(captchaInput)

        document.body.appendChild(hiddenForm)
        hiddenForm.submit()

        setFormStatus({
          submitted: true,
          success: true,
          message: "Your message has been sent successfully!",
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          _honeypot: "",
        })
      } else {
        throw new Error("Browser environment not available")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setFormStatus({
        submitted: true,
        success: false,
        message: "Failed to send message. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-muted/30" aria-labelledby="contact-heading">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 id="contact-heading" className="text-3xl font-bold tracking-tighter mb-4">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" aria-hidden="true"></div>
          <p className="text-muted-foreground">
            Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you!
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            aria-label="Contact form"
            action="https://formsubmit.co/azrealjames@gmail.com"
            method="POST"
          >
            {/* Hidden fields for FormSubmit.co */}
            <input type="hidden" name="_subject" value="Portfolio Contact Form Submission" />
            <input type="hidden" name="_next" value={typeof window !== "undefined" ? window.location.href : ""} />
            <input type="hidden" name="_captcha" value="true" />

            <div className="sr-only" aria-hidden="true">
              <label htmlFor="honeypot">Leave this field empty</label>
              <Input
                id="honeypot"
                name="_honeypot"
                value={formData._honeypot}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium sr-only">
                  Your Name
                </label>
                <Input
                  id="name"
                  placeholder="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  className="focus:ring-2 focus:ring-primary"
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium sr-only">
                  Your Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  className="focus:ring-2 focus:ring-primary"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium sr-only">
                Subject
              </label>
              <Input
                id="subject"
                placeholder="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                aria-required="true"
                className="focus:ring-2 focus:ring-primary"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium sr-only">
                Your Message
              </label>
              <Textarea
                id="message"
                placeholder="Your Message"
                className="min-h-[150px] focus:ring-2 focus:ring-primary"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                aria-required="true"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto focus:ring-2 focus:ring-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    <span>Sending...</span>
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>

              {formStatus && (
                <div
                  className={`mt-4 p-3 rounded-md ${formStatus.success ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}
                  role="alert"
                  aria-live="polite"
                >
                  <p className="font-medium">{formStatus.message}</p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
