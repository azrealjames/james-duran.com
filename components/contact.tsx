"use client"

import type React from "react"
import { useState } from "react"
import { Loader2, CheckCircle, AlertCircle, Send, Radio } from "lucide-react"

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
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus(null)

    if (formData._honeypot) {
      setFormStatus({
        submitted: true,
        success: false,
        message: "Invalid submission detected.",
      })
      return
    }

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
    <section id="contact" className="py-20 relative" aria-labelledby="contact-heading">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-20" aria-hidden="true" />
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="section-header">Initialize Connection</p>
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
            <span className="neon-text">Connect</span> With Me
          </h2>
          <div className="w-20 h-0.5 bg-[hsl(185_100%_50%)] mx-auto mb-6 shadow-[0_0_10px_hsl(185_100%_50%)]" />
          <p className="text-muted-foreground">
            Have a project in mind or want to discuss a potential collaboration? Send a transmission.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="glass-panel corner-accent rounded-xl p-8">
            {/* Status Bar */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[hsl(185_100%_50%/0.2)]">
              <Radio className="h-4 w-4 text-[hsl(150_100%_50%)] animate-pulse" />
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                Transmission Channel: <span className="text-[hsl(150_100%_60%)]">Open</span>
              </span>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              aria-label="Contact form"
            >
              {/* Honeypot */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="honeypot">Leave this field empty</label>
                <input
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
                  <label htmlFor="name" className="text-xs uppercase tracking-wider text-muted-foreground">
                    Identifier (Name)
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    className={`w-full px-4 py-3 rounded-lg bg-[hsl(220_30%_10%)] border ${
                      errors.name ? "border-red-500" : "border-[hsl(185_100%_50%/0.2)]"
                    } text-foreground placeholder-muted-foreground focus:outline-none focus:border-[hsl(185_100%_50%/0.6)] focus:shadow-[0_0_10px_hsl(185_100%_50%/0.2)] transition-all`}
                    placeholder="Enter your name"
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground">
                    Comm Link (Email)
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    className={`w-full px-4 py-3 rounded-lg bg-[hsl(220_30%_10%)] border ${
                      errors.email ? "border-red-500" : "border-[hsl(185_100%_50%/0.2)]"
                    } text-foreground placeholder-muted-foreground focus:outline-none focus:border-[hsl(185_100%_50%/0.6)] focus:shadow-[0_0_10px_hsl(185_100%_50%/0.2)] transition-all`}
                    placeholder="Enter your email"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs uppercase tracking-wider text-muted-foreground">
                  Subject Line
                </label>
                <input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.subject}
                  className={`w-full px-4 py-3 rounded-lg bg-[hsl(220_30%_10%)] border ${
                    errors.subject ? "border-red-500" : "border-[hsl(185_100%_50%/0.2)]"
                  } text-foreground placeholder-muted-foreground focus:outline-none focus:border-[hsl(185_100%_50%/0.6)] focus:shadow-[0_0_10px_hsl(185_100%_50%/0.2)] transition-all`}
                  placeholder="What's this about?"
                  disabled={isSubmitting}
                />
                {errors.subject && (
                  <p className="text-red-400 text-xs flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs uppercase tracking-wider text-muted-foreground">
                  Transmission Data (Message)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg bg-[hsl(220_30%_10%)] border ${
                    errors.message ? "border-red-500" : "border-[hsl(185_100%_50%/0.2)]"
                  } text-foreground placeholder-muted-foreground focus:outline-none focus:border-[hsl(185_100%_50%/0.6)] focus:shadow-[0_0_10px_hsl(185_100%_50%/0.2)] transition-all resize-none`}
                  placeholder="Enter your message (min. 10 characters)"
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <p className="text-red-400 text-xs flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.message}
                  </p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto cyber-button flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Transmitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Transmission
                    </>
                  )}
                </button>

                {formStatus && (
                  <div
                    className={`mt-6 p-4 rounded-lg flex items-start gap-3 ${
                      formStatus.success
                        ? "bg-[hsl(150_100%_50%/0.1)] border border-[hsl(150_100%_50%/0.3)]"
                        : "bg-[hsl(0_100%_50%/0.1)] border border-[hsl(0_100%_50%/0.3)]"
                    }`}
                    role="alert"
                    aria-live="polite"
                  >
                    {formStatus.success ? (
                      <CheckCircle className="h-5 w-5 text-[hsl(150_100%_60%)] mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <p className={`font-medium ${formStatus.success ? "text-[hsl(150_100%_60%)]" : "text-red-400"}`}>
                        {formStatus.success ? "Transmission Successful!" : "Transmission Failed"}
                      </p>
                      <p className="text-sm mt-1 text-muted-foreground">{formStatus.message}</p>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
