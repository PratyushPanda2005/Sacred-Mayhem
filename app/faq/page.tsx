"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Search, Plus, ShoppingBag, Truck, RotateCcw, CreditCard, Users, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navigation from "@/components/navigation"
import Link from "next/link"

const faqCategories = [
  {
    id: "orders",
    name: "ORDERS & SHIPPING",
    icon: Truck,
    color: "bg-blue-500",
  },
  {
    id: "returns",
    name: "RETURNS & EXCHANGES",
    icon: RotateCcw,
    color: "bg-green-500",
  },
  {
    id: "products",
    name: "PRODUCTS & SIZING",
    icon: ShoppingBag,
    color: "bg-purple-500",
  },
  {
    id: "payment",
    name: "PAYMENT & BILLING",
    icon: CreditCard,
    color: "bg-orange-500",
  },
  {
    id: "account",
    name: "ACCOUNT & PROFILE",
    icon: Users,
    color: "bg-red-500",
  },
  {
    id: "general",
    name: "GENERAL QUESTIONS",
    icon: Mail,
    color: "bg-gray-500",
  },
]

const faqData = {
  orders: [
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping takes 3-5 business days within the US. Express shipping (1-2 business days) and international shipping (7-14 business days) are also available. Free shipping is included on all orders over $200.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes! We ship to over 25 countries worldwide. International shipping costs and delivery times vary by location. Customs duties and taxes may apply and are the responsibility of the customer.",
    },
    {
      question: "Can I track my order?",
      answer:
        "Once your order ships, you'll receive a tracking number via email. You can also track your order status in your account dashboard or contact our support team.",
    },
    {
      question: "Can I change or cancel my order?",
      answer:
        "Orders can be modified or cancelled within 1 hour of placement. After this window, orders enter our fulfillment process and cannot be changed. Contact us immediately if you need to make changes.",
    },
  ],
  returns: [
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for unworn, unwashed items with original tags. Items must be in original condition. Sale items and limited edition pieces are final sale and cannot be returned.",
    },
    {
      question: "How do I return an item?",
      answer:
        "Log into your account, go to 'Order History', and select 'Return Item'. Print the prepaid return label and drop off at any authorized shipping location. Refunds are processed within 5-7 business days after we receive your return.",
    },
    {
      question: "Can I exchange for a different size?",
      answer:
        "Yes! Exchanges for different sizes are free within 30 days. Use our online exchange portal or contact customer service. We'll send the new size once we receive your return.",
    },
    {
      question: "What if my item is defective?",
      answer:
        "We stand behind our quality! If you receive a defective item, contact us within 7 days with photos. We'll provide a prepaid return label and send a replacement or full refund immediately.",
    },
  ],
  products: [
    {
      question: "How do your sizes run?",
      answer:
        "Our pieces are designed with an oversized, streetwear fit. We recommend checking our detailed size guide for measurements. When in doubt, size down for a more fitted look or stay true to size for the intended oversized aesthetic.",
    },
    {
      question: "What materials do you use?",
      answer:
        "We use only premium materials: 100% organic cotton, sustainable fleece, and high-quality technical fabrics. All materials are pre-shrunk and tested for durability. Care instructions are included with each item.",
    },
    {
      question: "Are your products sustainable?",
      answer:
        "Sustainability is core to our mission. We use organic and recycled materials, work with ethical manufacturers, and focus on creating timeless pieces that last. Our packaging is also 100% recyclable.",
    },
    {
      question: "Do you restock sold-out items?",
      answer:
        "Popular items are restocked regularly, but limited edition pieces are truly limited. Sign up for restock notifications on product pages, and follow our social media for drop announcements.",
    },
  ],
  payment: [
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and Shop Pay. All transactions are secured with 256-bit SSL encryption.",
    },
    {
      question: "Do you offer payment plans?",
      answer:
        "Yes! We partner with Klarna and Afterpay to offer flexible payment options. Split your purchase into 4 interest-free payments or choose longer-term financing options at checkout.",
    },
    {
      question: "When will I be charged?",
      answer:
        "Your payment method is charged immediately when you place your order. For pre-orders, you'll be charged when the item ships. Payment plan options charge according to their respective schedules.",
    },
    {
      question: "Can I use multiple promo codes?",
      answer:
        "Only one promo code can be used per order. Codes cannot be combined with other offers or applied to sale items. Some exclusions may apply - check the terms of each promotion.",
    },
  ],
  account: [
    {
      question: "How do I create an account?",
      answer:
        "Click 'Sign Up' in the top right corner and provide your email and create a password. You can also sign up during checkout. Account holders get early access to drops, exclusive offers, and order tracking.",
    },
    {
      question: "I forgot my password. What do I do?",
      answer:
        "Click 'Forgot Password' on the login page and enter your email. We'll send you a secure link to reset your password. If you don't receive the email, check your spam folder or contact support.",
    },
    {
      question: "How do I update my account information?",
      answer:
        "Log into your account and go to 'Profile Settings'. You can update your personal information, shipping addresses, payment methods, and communication preferences at any time.",
    },
    {
      question: "Can I delete my account?",
      answer:
        "Yes, you can delete your account by contacting our customer service team. Please note that this action is permanent and cannot be undone. Your order history will be permanently removed.",
    },
  ],
  general: [
    {
      question: "What is Sacred Mayhem's story?",
      answer:
        "Sacred Mayhem was founded in 2019 to bridge luxury fashion and authentic street culture. We create premium streetwear for rebels, dreamers, and those who dare to be different. Every piece embodies controlled chaos - where precision meets rebellion.",
    },
    {
      question: "How can I contact customer service?",
      answer:
        "Reach us via email at support@sacredmayhem.com, through our contact form, or via live chat during business hours (9 AM - 6 PM PST, Monday-Friday). We typically respond within 24 hours.",
    },
    {
      question: "Do you have a physical store?",
      answer:
        "We're primarily online, but we occasionally host pop-up events in major cities. Follow our social media (@sacredmayhem) and subscribe to our newsletter for announcements about upcoming events and collaborations.",
    },
    {
      question: "How do I stay updated on new releases?",
      answer:
        "Subscribe to our newsletter, follow us on social media, and create an account for early access to drops. We announce new releases, restocks, and exclusive collaborations through these channels first.",
    },
  ],
}

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState("orders")
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedItems, setExpandedItems] = useState<number[]>([])

  const toggleExpanded = (index: number) => {
    setExpandedItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const filteredFAQs = faqData[selectedCategory as keyof typeof faqData].filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="bg-white text-black min-h-screen">
      <Navigation />

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/">
            <motion.div
              className="flex items-center space-x-2 mb-8 cursor-pointer hover:underline"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-bold tracking-wider">BACK TO HOME</span>
            </motion.div>
          </Link>

          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">
              FREQUENTLY ASKED
              <br />
              <motion.span
                animate={{
                  textShadow: ["0 0 0px #000", "0 0 20px #000", "0 0 40px #000", "0 0 20px #000", "0 0 0px #000"],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                QUESTIONS
              </motion.span>
            </h1>
            <p className="text-xl tracking-widest mb-8">GET THE ANSWERS YOU NEED</p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-4 text-lg border-2 border-black focus:border-black"
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Categories */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl font-black tracking-wider mb-6">CATEGORIES</h2>
              <div className="space-y-3">
                {faqCategories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id)
                      setExpandedItems([])
                    }}
                    className={`w-full text-left p-4 border-2 transition-all duration-300 ${selectedCategory === category.id
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-black hover:bg-black hover:text-white"
                      }`}
                    whileHover={{ scale: 1.02, rotateY: 2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center space-x-3">
                      <category.icon className="w-5 h-5" />
                      <span className="font-bold tracking-wider text-sm">{category.name}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* FAQ Content */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-black tracking-wider mb-2">
                  {faqCategories.find((cat) => cat.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-600">
                  {filteredFAQs.length} question{filteredFAQs.length !== 1 ? "s" : ""} found
                </p>
              </div>

              {filteredFAQs.length === 0 ? (
                <motion.div
                  className="text-center py-16"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-2xl font-bold tracking-wider mb-2">NO RESULTS FOUND</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search terms or browse different categories</p>
                  <Button
                    onClick={() => setSearchTerm("")}
                    className="bg-black text-white hover:bg-white hover:text-black border-2 border-black"
                  >
                    CLEAR SEARCH
                  </Button>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {filteredFAQs.map((faq, index) => (
                      <motion.div
                        key={index}
                        className="border-2 border-black overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.01 }}
                      >
                        <motion.button
                          onClick={() => toggleExpanded(index)}
                          className="w-full text-left p-6 bg-white hover:bg-gray-50 transition-colors duration-300"
                          whileHover={{ backgroundColor: "#f9fafb" }}
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold tracking-wider pr-4">{faq.question}</h3>
                            <motion.div
                              animate={{ rotate: expandedItems.includes(index) ? 45 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Plus className="w-6 h-6 flex-shrink-0" />
                            </motion.div>
                          </div>
                        </motion.button>

                        <AnimatePresence>
                          {expandedItems.includes(index) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="p-6 pt-0 bg-gray-50">
                                <motion.p
                                  className="text-gray-700 leading-relaxed"
                                  initial={{ y: -10, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  transition={{ duration: 0.3, delay: 0.1 }}
                                >
                                  {faq.answer}
                                </motion.p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          </div>

          {/* Contact Support */}
          <motion.div
            className="mt-20 bg-black text-white p-12 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black tracking-wider mb-4">STILL HAVE QUESTIONS?</h2>
            <p className="text-xl mb-8">Our rebel support team is here to help</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-black hover:bg-black hover:text-white border-2 border-white px-8 py-4 text-lg font-bold tracking-wider transition-all duration-300">
                  CONTACT SUPPORT
                </Button>
              </Link>
              <Button className="bg-black text-white border-2 border-white hover:bg-white hover:text-black px-8 py-4 text-lg font-bold tracking-wider transition-all duration-300">
                LIVE CHAT
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-white border-t border-black py-14 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

            {/* Support */}
            <div>
              <h4 className="font-bold tracking-widest mb-5 text-sm">
                SUPPORT
              </h4>

              <ul className="space-y-3 text-sm tracking-wide">
                <li>
                  <Link href="/size-guide" className="hover:underline underline-offset-4">
                    Size Guide
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:underline underline-offset-4">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:underline underline-offset-4">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline underline-offset-4">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:underline underline-offset-4">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Brand */}
            <div className="flex flex-col items-center md:items-center text-center">
              <h3 className="text-2xl font-black tracking-widest mb-4">
                SACRED MAYHEM
              </h3>
              <p className="tracking-wide text-sm max-w-xs">
                Luxury streetwear for the rebellious soul.
              </p>
            </div>

            {/* Connect */}
            <div className="md:flex md:flex-col md:items-end text-center md:text-right">
              <h4 className="font-bold tracking-widest mb-5 text-sm">
                CONNECT
              </h4>

              <div className="flex justify-center md:justify-end gap-5">
                <a href="#" className="hover:opacity-70 transition">
                  <img src="/instagram.png" alt="Instagram" className="w-7 h-7" />
                </a>

                <a href="#" className="hover:opacity-70 transition">
                  <img src="/whatsapp.png" alt="Whatsapp" className="w-6 h-6" />
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Section */}
          <div className="border-t border-black mt-12 pt-8 flex flex-col items-center gap-3 text-center">
            <p className="tracking-widest text-xs sm:text-sm">
              &copy; 2026 SACRED MAYHEM. ALL RIGHTS RESERVED.
            </p>

            <Link
              href="/admin/login"
              className="text-xs text-gray-500 hover:text-black transition-colors tracking-wide"
            >
              Admin Access
            </Link>
          </div>

        </div>
      </footer>
    </div>
  )
}
