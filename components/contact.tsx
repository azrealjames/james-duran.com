"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Loader2 } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [formStatus, setFormStatus] = useState<{
    submitted: boolean
    success: boolean
    message: string
  } | null>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailJSLoaded, setEmailJSLoaded] = useState(false)

  // Load EmailJS script
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
    script.async = true
    script.onload = () => {
      // Initialize EmailJS with your user ID
      // @ts-ignore
      window.emailjs.init("Yd-Ck-Oe-Yd-Ck-Oe") // Replace with your actual EmailJS user ID
      setEmailJSLoaded(true)
    }
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!emailJSLoaded) {
      setFormStatus({
        submitted: true,
        success: false,
        message: "Email service is still loading. Please try again in a moment.",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Use FormData for direct form submission as a fallback
      if (typeof window !== "undefined" && window.location) {
        const form = e.target as HTMLFormElement
        const formAction = `https://formsubmit.co/${encodeURIComponent("azrealjames@gmail.com")}`

        // Create a hidden form to submit
        const hiddenForm = document.createElement("form")
        hiddenForm.method = "POST"
        hiddenForm.action = formAction
        hiddenForm.style.display = "none"

        // Add form data
        for (const key in formData) {
          if (Object.prototype.hasOwnProperty.call(formData, key)) {
            const input = document.createElement("input")
            input.type = "hidden"
            input.name = key
            // @ts-ignore
            input.value = formData[key]
            hiddenForm.appendChild(input)
          }
        }

        // Add success page redirect
        const redirectInput = document.createElement("input")
        redirectInput.type = "hidden"
        redirectInput.name = "_next"
        redirectInput.value = window.location.href
        hiddenForm.appendChild(redirectInput)

        // Add subject
        const subjectInput = document.createElement("input")
        subjectInput.type = "hidden"
        subjectInput.name = "_subject"
        subjectInput.value = `Portfolio Contact: ${formData.subject}`
        hiddenForm.appendChild(subjectInput)

        // Append form to body
        document.body.appendChild(hiddenForm)

        // Submit form
        hiddenForm.submit()

        // Show success message
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
        })
      } else {
        throw new Error("Browser environment not available")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setFormStatus({
        submitted: true,
        success: false,
        message: "Failed to send message. Please try again later or email me directly.",
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary" aria-hidden="true">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Email</h3>
                  <p className="text-muted-foreground">
                    <a
                      href="mailto:azrealjames@gmail.com"
                      className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:rounded-sm"
                    >
                      azrealjames@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary" aria-hidden="true">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Phone</h3>
                  <p className="text-muted-foreground">
                    <a
                      href="tel:+17202510866"
                      className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:rounded-sm"
                    >
                      (720) 251-0866
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary" aria-hidden="true">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Location</h3>
                  <p className="text-muted-foreground">United States</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
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
              <input type="hidden" name="_captcha" value="false" />

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
                    {!formStatus.success && (
                      <p className="text-sm mt-2">
                        If the issue persists, please email me directly at{" "}
                        <a href="mailto:azrealjames@gmail.com" className="underline hover:no-underline">
                          azrealjames@gmail.com
                        </a>
                      </p>
                    )}
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
