"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Navigation from "@/components/navigation"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Contact form:", formData)
  }

  return (
    <div className="bg-white text-black min-h-screen">
      <Navigation />

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/shop">
            <motion.div
              className="flex items-center space-x-2 mb-8 cursor-pointer hover:underline"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-bold tracking-wider">BACK TO SHOP</span>
            </motion.div>
          </Link>

          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">CONTACT US</h1>
            <p className="text-xl tracking-widest">GET IN TOUCH WITH THE MAYHEM</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-black tracking-wider mb-8">SEND US A MESSAGE</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="font-bold tracking-wider">
                    NAME
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-2 border-black focus:ring-0 focus:border-black mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="font-bold tracking-wider">
                    EMAIL
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-2 border-black focus:ring-0 focus:border-black mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="font-bold tracking-wider">
                    SUBJECT
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="border-2 border-black focus:ring-0 focus:border-black mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="font-bold tracking-wider">
                    MESSAGE
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="border-2 border-black focus:ring-0 focus:border-black mt-2 resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black py-4 text-lg font-bold tracking-wider transition-all duration-300"
                >
                  <Send className="w-5 h-5 mr-2" />
                  SEND MESSAGE
                </Button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-black tracking-wider mb-8">GET IN TOUCH</h2>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-black text-white">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-wider mb-2">EMAIL</h3>
                    <p className="text-lg">orders@sacredmayhem.club</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-black text-white">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-wider mb-2">PHONE</h3>
                    <p className="text-lg">+971 502575498</p>
                    <p className="text-sm">Mon-Fri 9AM-6PM EST</p>
                  </div>
                </div>
              </div>

              <motion.div
                className="mt-12 p-8 bg-black text-white"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold tracking-wider mb-4">CUSTOMER SERVICE</h3>
                <p className="mb-4">
                  Need help with your order? Our customer service team is here to assist you with any questions about
                  sizing, shipping, returns, or product information.
                </p>
                <div className="space-y-2">
                  <p>
                    <strong>Response Time:</strong> Within 24 hours
                  </p>
                  <p>
                    <strong>Live Chat:</strong> Available Mon-Fri 9AM-6PM EST
                  </p>
                  <p>
                    <strong>Phone Support:</strong> Available Mon-Fri 9AM-6PM EST
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-black tracking-wider mb-8 text-center">FREQUENTLY ASKED QUESTIONS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold tracking-wider mb-2">How do I track my order?</h3>
                  <p>
                    Once your order ships, you'll receive a tracking number via email. You can also track your order in
                    your account dashboard.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-wider mb-2">What is your return policy?</h3>
                  <p>
                    We offer 30-day returns on all unworn items with original tags. See our returns page for full
                    details.
                  </p>
                </div>

              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold tracking-wider mb-2">How do I find my size?</h3>
                  <p>
                    Check our detailed size guide for measurements. If you're between sizes, we recommend sizing up for
                    our oversized fits.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-wider mb-2">Do you ship internationally?</h3>
                  <p>Yes, we ship worldwide. International shipping rates and delivery times vary by location.</p>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
