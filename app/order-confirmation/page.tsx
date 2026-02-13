"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Package, Truck, Mail, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import Link from "next/link"

const ADMIN_WHATSAPP_NUMBER = "+919535475154"

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    const savedOrder = localStorage.getItem("last-order")
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder))
    }
  }, [])

  const generateWhatsAppMessage = () => {
    if (!order) return ""
    const orderNumber = `SM-${Math.floor(100000 + Math.random() * 900000)}`
    let message = `*NEW ORDER FROM SACRED MAYHEM*%0A%0A`
    message += `*Order Number:* ${orderNumber}%0A`
    message += `*Customer:* ${order.formData.firstName} ${order.formData.lastName}%0A`
    message += `*Email:* ${order.formData.email}%0A`
    message += `*Phone:* ${order.formData.phone}%0A%0A`
    message += `*Shipping Address:*%0A${order.formData.address}, ${order.formData.city}, ${order.formData.state} ${order.formData.zipCode}, ${order.formData.country}%0A%0A`
    message += `*ITEMS:*%0A`

    order.items.forEach((item: any) => {
      message += `- ${item.name} (${item.selectedSize || "N/A"}) x ${item.quantity} - $${item.price * item.quantity}%0A`
    })

    message += `%0A*TOTAL:* $${order.total.toFixed(2)}`

    return message
  }

  const handleWhatsAppResend = () => {
    const message = generateWhatsAppMessage()
    const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP_NUMBER.replace(/\+/g, "")}?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  const items = order?.items || [
    { name: "CHAOS OVERSIZED TEE", size: "L", quantity: 1, price: 180 },
    { name: "VOID CARGO PANTS", size: "M", quantity: 1, price: 320 },
  ]

  const shippingCost = order?.total > 200 ? 0 : 25
  const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
  const total = order?.total || (subtotal + shippingCost)
  const email = order?.formData?.email || "john.doe@example.com"
  const address = order ? `${order.formData.address}, ${order.formData.city}, ${order.formData.state}` : "123 Main St, New York, NY 10001"

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
            <div className="text-2xl font-bold tracking-wider">
              {order ? "YOUR ORDER HAS BEEN SENT VIA WHATSAPP" : "ORDER #SM001234"}
            </div>
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

              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center border-b border-white pb-4">
                    <div>
                      <h3 className="font-bold uppercase">{item.name}</h3>
                      <p className="text-sm">
                        {item.selectedSize ? `Size: ${item.selectedSize} | ` : ""}Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-white pt-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{shippingCost === 0 ? "FREE" : `$${shippingCost}`}</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t border-white pt-2">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>

            {/* Order Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold tracking-wider mb-6">CONCIERGE DETAILS</h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-black text-white">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold tracking-wider mb-1">WHATSAPP CONCIERGE</h3>
                    <p>Your order has been forwarded to our team.</p>
                    <Button
                      onClick={handleWhatsAppResend}
                      variant="link"
                      className="p-0 h-auto text-black font-bold hover:underline"
                    >
                      Resend message via WhatsApp
                    </Button>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-black text-white">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold tracking-wider mb-1">SHIPPING TO</h3>
                    <p className="text-sm">{address}</p>
                    <p className="text-sm">Estimated delivery: 3-5 business days</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-black text-white">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold tracking-wider mb-1">CONFIRMATION</h3>
                    <p>Copy sent to:</p>
                    <p className="font-bold">{email}</p>
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
            <div className="space-y-4">
              <Link href="/">
                <Button className="bg-black text-white hover:bg-white hover:text-black border-2 border-black px-8 py-4 text-lg font-bold tracking-wider transition-all duration-300">
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
