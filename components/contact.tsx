"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    _honeypot: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formStatus, setFormStatus] = useState<{
    submitted: boolean
    success: boolean
    message: string
  } | null>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset status
    setFormStatus(null)

    if (formData._honeypot) {
      setFormStatus({
        submitted: true,
        success: false,
        message: "Invalid submission detected.",
      })
      return
    }

    // Validate form
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      if (typeof window !== "undefined" && window.location) {
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
          message: "Thank you for reaching out! I typically respond within 24 hours.",
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          _honeypot: "",
        })
        setErrors({})
      } else {
        throw new Error("Browser environment not available")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setFormStatus({
        submitted: true,
        success: false,
        message: "Failed to send message. Please try again or email me directly at azrealjames@gmail.com",
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
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`focus:ring-2 focus:ring-primary ${errors.name ? "border-red-500" : ""}`}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p id="name-error" className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.name}
                  </p>
                )}
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
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`focus:ring-2 focus:ring-primary ${errors.email ? "border-red-500" : ""}`}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </p>
                )}
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
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                className={`focus:ring-2 focus:ring-primary ${errors.subject ? "border-red-500" : ""}`}
                disabled={isSubmitting}
              />
              {errors.subject && (
                <p id="subject-error" className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.subject}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium sr-only">
                Your Message
              </label>
              <Textarea
                id="message"
                placeholder="Your Message (min. 10 characters)"
                className={`min-h-[150px] focus:ring-2 focus:ring-primary ${errors.message ? "border-red-500" : ""}`}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                aria-required="true"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                disabled={isSubmitting}
              />
              {errors.message && (
                <p id="message-error" className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.message}
                </p>
              )}
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
                  className={`mt-4 p-4 rounded-md flex items-start gap-3 ${formStatus.success ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}
                  role="alert"
                  aria-live="polite"
                >
                  {formStatus.success ? (
                    <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <p className="font-medium">{formStatus.success ? "Message Sent!" : "Error"}</p>
                    <p className="text-sm mt-1">{formStatus.message}</p>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
