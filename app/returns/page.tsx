"use client"

import { motion } from "framer-motion"
import { ArrowLeft, RotateCcw, Package, CreditCard, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import Link from "next/link"

export default function ReturnsPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Navigation />

      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <RotateCcw className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">RETURNS & EXCHANGES</h1>
            <p className="text-xl tracking-widest">30-DAY RETURN POLICY</p>
          </motion.div>

          {/* Return Policy Overview */}
          <motion.div
            className="bg-black text-white p-8 mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-black tracking-wider mb-6 text-center">OUR RETURN PROMISE</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">30</span>
                </div>
                <h3 className="text-lg font-bold tracking-wider mb-2">DAYS TO RETURN</h3>
                <p className="text-sm">Full 30 days from delivery date</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold tracking-wider mb-2">FREE RETURNS</h3>
                <p className="text-sm">We cover return shipping costs</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold tracking-wider mb-2">FULL REFUND</h3>
                <p className="text-sm">Money back to original payment</p>
              </div>
            </div>
          </motion.div>

          {/* Return Process */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-black tracking-wider mb-8">HOW TO RETURN</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="font-bold tracking-wider mb-2">INITIATE RETURN</h3>
                <p className="text-sm">Log into your account or contact customer service</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="font-bold tracking-wider mb-2">PRINT LABEL</h3>
                <p className="text-sm">Download and print your prepaid return label</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="font-bold tracking-wider mb-2">PACK & SHIP</h3>
                <p className="text-sm">Package items securely and drop off at carrier</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">4</span>
                </div>
                <h3 className="font-bold tracking-wider mb-2">GET REFUND</h3>
                <p className="text-sm">Receive refund within 5-7 business days</p>
              </div>
            </div>
          </motion.div>

          {/* Return Conditions */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-black tracking-wider mb-8">RETURN CONDITIONS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-2 border-black p-6">
                <h3 className="text-xl font-bold tracking-wider mb-4 text-green-600">✓ RETURNABLE ITEMS</h3>
                <ul className="space-y-2">
                  <li>• Unworn items with original tags</li>
                  <li>• Items in original packaging</li>
                  <li>• No signs of wear, damage, or alteration</li>
                  <li>• No odors (perfume, smoke, etc.)</li>
                  <li>• Returned within 30 days of delivery</li>
                </ul>
              </div>
              <div className="border-2 border-black p-6 bg-gray-50">
                <h3 className="text-xl font-bold tracking-wider mb-4 text-red-600">✗ NON-RETURNABLE ITEMS</h3>
                <ul className="space-y-2">
                  <li>• Sale/clearance items (final sale)</li>
                  <li>• Custom or personalized items</li>
                  <li>• Items worn or washed</li>
                  <li>• Items without original tags</li>
                  <li>• Undergarments and swimwear</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Exchanges */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-3xl font-black tracking-wider mb-8">EXCHANGES</h2>
            <div className="bg-black text-white p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold tracking-wider mb-4">SIZE EXCHANGES</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Free size exchanges within 30 days</li>
                    <li>• Subject to availability</li>
                    <li>• One exchange per item</li>
                    <li>• Original item must be unworn</li>
                    <li>• Processing time: 3-5 business days</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-wider mb-4">DEFECTIVE ITEMS</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Manufacturing defects covered</li>
                    <li>• Free replacement or full refund</li>
                    <li>• Contact us within 30 days</li>
                    <li>• Photos may be required</li>
                    <li>• Expedited processing available</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* International Returns */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <h2 className="text-3xl font-black tracking-wider mb-8">INTERNATIONAL RETURNS</h2>
            <div className="border-2 border-black p-6">
              <div className="flex items-start space-x-4 mb-6">
                <AlertCircle className="w-6 h-6 mt-1" />
                <div>
                  <h3 className="text-xl font-bold tracking-wider mb-2">SPECIAL CONSIDERATIONS</h3>
                  <p className="mb-4">
                    International returns require additional processing time and may incur customs fees.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold tracking-wider mb-3">RETURN PROCESS</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Contact customer service first</li>
                    <li>• Return shipping at customer expense</li>
                    <li>• Use trackable shipping method</li>
                    <li>• Mark package as "RETURN MERCHANDISE"</li>
                    <li>• Include original order number</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold tracking-wider mb-3">REFUND DETAILS</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Original shipping fees non-refundable</li>
                    <li>• Customs fees not covered</li>
                    <li>• Processing time: 10-14 business days</li>
                    <li>• Refund in original currency</li>
                    <li>• Bank fees may apply</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact & Support */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <h2 className="text-3xl font-black tracking-wider mb-8">NEED HELP?</h2>
            <div className="text-center">
              <p className="text-lg mb-8">Our customer service team is here to help with your return or exchange.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="bg-black text-white hover:bg-white hover:text-black border-2 border-black px-8 py-4 text-lg font-bold tracking-wider transition-all duration-300">
                    CONTACT SUPPORT
                  </Button>
                </Link>
                <Link href="/account">
                  <Button className="bg-white text-black border-2 border-black hover:bg-black hover:text-white px-8 py-4 text-lg font-bold tracking-wider transition-all duration-300">
                    START RETURN
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
