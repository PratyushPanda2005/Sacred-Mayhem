"use client"

import { motion } from "framer-motion"
import { CheckCircle, Package, Truck, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import Link from "next/link"

const orderDetails = {
  orderNumber: "SM001234",
  date: "January 15, 2024",
  total: 500,
  items: [
    { name: "CHAOS OVERSIZED TEE", size: "L", quantity: 1, price: 180 },
    { name: "VOID CARGO PANTS", size: "M", quantity: 1, price: 320 },
  ],
  shipping: {
    method: "Express Shipping",
    cost: 25,
    address: "123 Main St, New York, NY 10001",
  },
  email: "john.doe@example.com",
}

export default function OrderConfirmationPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Navigation />

      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-block mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 10 }}
            >
              <CheckCircle className="w-24 h-24 text-black" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">ORDER CONFIRMED</h1>
            <p className="text-xl tracking-widest mb-8">THANK YOU FOR JOINING THE MAYHEM</p>
            <div className="text-2xl font-bold tracking-wider">ORDER #{orderDetails.orderNumber}</div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Order Summary */}
            <motion.div
              className="bg-black text-white p-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold tracking-wider mb-6">ORDER SUMMARY</h2>

              <div className="space-y-4 mb-6">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-white pb-4">
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-sm">
                        Size: {item.size} | Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold">${item.price}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-white pt-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${orderDetails.items.reduce((sum, item) => sum + item.price, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>${orderDetails.shipping.cost}</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t border-white pt-2">
                  <span>Total:</span>
                  <span>${orderDetails.total}</span>
                </div>
              </div>
            </motion.div>

            {/* Order Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold tracking-wider mb-6">ORDER DETAILS</h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-black text-white">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold tracking-wider mb-1">ORDER NUMBER</h3>
                    <p>{orderDetails.orderNumber}</p>
                    <p className="text-sm text-gray-600">Placed on {orderDetails.date}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-black text-white">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold tracking-wider mb-1">SHIPPING</h3>
                    <p>{orderDetails.shipping.method}</p>
                    <p className="text-sm">{orderDetails.shipping.address}</p>
                    <p className="text-sm">Estimated delivery: 3-5 business days</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-black text-white">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold tracking-wider mb-1">CONFIRMATION</h3>
                    <p>Confirmation sent to:</p>
                    <p className="font-bold">{orderDetails.email}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Next Steps */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-black tracking-wider mb-8">WHAT'S NEXT?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-bold tracking-wider mb-2">PROCESSING</h3>
                <p className="text-sm">We'll prepare your order with care</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-bold tracking-wider mb-2">SHIPPING</h3>
                <p className="text-sm">You'll receive tracking information</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-bold tracking-wider mb-2">DELIVERY</h3>
                <p className="text-sm">Your Sacred Mayhem arrives</p>
              </div>
            </div>

            <div className="space-y-4">
              <Link href="/account">
                <Button className="bg-black text-white hover:bg-white hover:text-black border-2 border-black px-8 py-4 text-lg font-bold tracking-wider transition-all duration-300 mr-4">
                  TRACK ORDER
                </Button>
              </Link>
              <Link href="/">
                <Button className="bg-white text-black border-2 border-black hover:bg-black hover:text-white px-8 py-4 text-lg font-bold tracking-wider transition-all duration-300">
                  CONTINUE SHOPPING
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
