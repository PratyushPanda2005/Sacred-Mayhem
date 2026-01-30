"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Truck, Globe, Clock, Shield } from "lucide-react"
import Navigation from "@/components/navigation"
import Link from "next/link"

const shippingRates = [
  { region: "United States", standard: "Free over $200", express: "$25", time: "3-5 business days" },
  { region: "Canada", standard: "$15", express: "$35", time: "5-7 business days" },
  { region: "Europe", standard: "$25", express: "$45", time: "7-10 business days" },
  { region: "Asia Pacific", standard: "$30", express: "$55", time: "10-14 business days" },
  { region: "Rest of World", standard: "$35", express: "$65", time: "14-21 business days" },
]

export default function ShippingPage() {
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
            <Truck className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">SHIPPING INFO</h1>
            <p className="text-xl tracking-widest">WORLDWIDE DELIVERY</p>
          </motion.div>

          {/* Shipping Options */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-black tracking-wider mb-8">SHIPPING OPTIONS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-2 border-black p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Truck className="w-6 h-6" />
                  <h3 className="text-xl font-bold tracking-wider">STANDARD SHIPPING</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li>• Free shipping on orders over $200 (US only)</li>
                  <li>• 3-5 business days (US)</li>
                  <li>• 5-14 business days (International)</li>
                  <li>• Tracking included</li>
                  <li>• Signature not required</li>
                </ul>
              </div>

              <div className="border-2 border-black p-6 bg-black text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-6 h-6" />
                  <h3 className="text-xl font-bold tracking-wider">EXPRESS SHIPPING</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li>• 1-2 business days (US)</li>
                  <li>• 3-7 business days (International)</li>
                  <li>• Priority handling</li>
                  <li>• Real-time tracking</li>
                  <li>• Signature required</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Shipping Rates Table */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-black tracking-wider mb-8">SHIPPING RATES</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-2 border-black">
                <thead>
                  <tr className="bg-black text-white">
                    <th className="p-4 text-left font-bold tracking-wider">REGION</th>
                    <th className="p-4 text-left font-bold tracking-wider">STANDARD</th>
                    <th className="p-4 text-left font-bold tracking-wider">EXPRESS</th>
                    <th className="p-4 text-left font-bold tracking-wider">DELIVERY TIME</th>
                  </tr>
                </thead>
                <tbody>
                  {shippingRates.map((rate, index) => (
                    <tr key={index} className="border-b border-black">
                      <td className="p-4 font-bold">{rate.region}</td>
                      <td className="p-4">{rate.standard}</td>
                      <td className="p-4">{rate.express}</td>
                      <td className="p-4">{rate.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Processing & Handling */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-black tracking-wider mb-8">PROCESSING & HANDLING</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold tracking-wider mb-4">ORDER PROCESSING</h3>
                <ul className="space-y-2">
                  <li>• Orders placed before 2PM EST ship same day</li>
                  <li>• Weekend orders processed Monday</li>
                  <li>• Custom orders take 5-7 business days</li>
                  <li>• Sale items ship within 1-2 business days</li>
                  <li>• You'll receive tracking info via email</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-wider mb-4">PACKAGING</h3>
                <ul className="space-y-2">
                  <li>• Eco-friendly packaging materials</li>
                  <li>• Items carefully wrapped and protected</li>
                  <li>• Signature Sacred Mayhem packaging</li>
                  <li>• Discreet shipping labels available</li>
                  <li>• Gift wrapping available upon request</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* International Shipping */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-3xl font-black tracking-wider mb-8">INTERNATIONAL SHIPPING</h2>
            <div className="bg-black text-white p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Globe className="w-6 h-6" />
                <h3 className="text-xl font-bold tracking-wider">WORLDWIDE DELIVERY</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold tracking-wider mb-4">CUSTOMS & DUTIES</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Customer responsible for customs fees</li>
                    <li>• Duties vary by country and order value</li>
                    <li>• Items marked as merchandise</li>
                    <li>• No control over customs delays</li>
                    <li>• Refused packages incur return fees</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold tracking-wider mb-4">RESTRICTIONS</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Some countries have import restrictions</li>
                    <li>• PO Boxes not accepted for international</li>
                    <li>• Address must match payment method</li>
                    <li>• Contact us for restricted countries</li>
                    <li>• Military addresses require special handling</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tracking & Support */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <h2 className="text-3xl font-black tracking-wider mb-8">TRACKING & SUPPORT</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-2 border-black p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-6 h-6" />
                  <h3 className="text-xl font-bold tracking-wider">ORDER TRACKING</h3>
                </div>
                <ul className="space-y-2">
                  <li>• Real-time tracking updates</li>
                  <li>• SMS and email notifications</li>
                  <li>• Track multiple orders in account</li>
                  <li>• Delivery confirmation photos</li>
                  <li>• 24/7 tracking support</li>
                </ul>
              </div>
              <div className="border-2 border-black p-6">
                <h3 className="text-xl font-bold tracking-wider mb-4">SHIPPING ISSUES</h3>
                <ul className="space-y-2">
                  <li>• Lost packages fully covered</li>
                  <li>• Damaged items replaced free</li>
                  <li>• Wrong address corrections available</li>
                  <li>• Delivery attempts and holds</li>
                  <li>• Customer service assistance</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <h2 className="text-3xl font-black tracking-wider mb-8">SHIPPING FAQ</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold tracking-wider mb-2">
                  Can I change my shipping address after ordering?
                </h3>
                <p>
                  Address changes are possible within 2 hours of placing your order. Contact customer service
                  immediately for assistance.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-wider mb-2">Do you ship to PO Boxes?</h3>
                <p>
                  We ship to PO Boxes within the United States only. International orders require a physical address.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-wider mb-2">What if my package is stolen?</h3>
                <p>
                  We work with shipping carriers to investigate stolen packages. Signature delivery is recommended for
                  high-value orders.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-wider mb-2">Can I expedite my order after it's placed?</h3>
                <p>
                  Shipping upgrades are available within 2 hours of ordering, subject to additional fees and processing
                  status.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
