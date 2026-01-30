"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, CreditCard, Truck, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Navigation from "@/components/navigation"
import Link from "next/link"

const cartItems = [
  { id: 1, name: "CHAOS OVERSIZED TEE", price: 180, quantity: 1, size: "L" },
  { id: 2, name: "VOID CARGO PANTS", price: 320, quantity: 1, size: "M" },
]

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  })

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 25
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Process order
      window.location.href = "/order-confirmation"
    }
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Checkout Form */}
            <div>
              <motion.h1
                className="text-4xl font-black tracking-tighter mb-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                CHECKOUT
              </motion.h1>

              {/* Progress Steps */}
              <div className="flex items-center mb-8">
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        step >= stepNumber ? "bg-black text-white" : "bg-white border-2 border-black text-black"
                      }`}
                    >
                      {stepNumber}
                    </div>
                    {stepNumber < 3 && <div className="w-12 h-0.5 bg-black mx-2" />}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-2xl font-bold tracking-wider mb-6">CONTACT INFORMATION</h2>
                    <div className="space-y-4">
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
                          className="border-2 border-black focus:ring-0 focus:border-black"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName" className="font-bold tracking-wider">
                            FIRST NAME
                          </Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="border-2 border-black focus:ring-0 focus:border-black"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="font-bold tracking-wider">
                            LAST NAME
                          </Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="border-2 border-black focus:ring-0 focus:border-black"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-2xl font-bold tracking-wider mb-6">SHIPPING ADDRESS</h2>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address" className="font-bold tracking-wider">
                          ADDRESS
                        </Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="border-2 border-black focus:ring-0 focus:border-black"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city" className="font-bold tracking-wider">
                            CITY
                          </Label>
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="border-2 border-black focus:ring-0 focus:border-black"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="state" className="font-bold tracking-wider">
                            STATE
                          </Label>
                          <Input
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="border-2 border-black focus:ring-0 focus:border-black"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="zipCode" className="font-bold tracking-wider">
                            ZIP CODE
                          </Label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            className="border-2 border-black focus:ring-0 focus:border-black"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="country" className="font-bold tracking-wider">
                            COUNTRY
                          </Label>
                          <Input
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="border-2 border-black focus:ring-0 focus:border-black"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-2xl font-bold tracking-wider mb-6">PAYMENT INFORMATION</h2>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber" className="font-bold tracking-wider">
                          CARD NUMBER
                        </Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          className="border-2 border-black focus:ring-0 focus:border-black"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate" className="font-bold tracking-wider">
                            EXPIRY DATE
                          </Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className="border-2 border-black focus:ring-0 focus:border-black"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv" className="font-bold tracking-wider">
                            CVV
                          </Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            className="border-2 border-black focus:ring-0 focus:border-black"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="nameOnCard" className="font-bold tracking-wider">
                          NAME ON CARD
                        </Label>
                        <Input
                          id="nameOnCard"
                          name="nameOnCard"
                          value={formData.nameOnCard}
                          onChange={handleInputChange}
                          className="border-2 border-black focus:ring-0 focus:border-black"
                          required
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="flex space-x-4">
                  {step > 1 && (
                    <Button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="flex-1 bg-white text-black border-2 border-black hover:bg-black hover:text-white py-3 font-bold tracking-wider transition-all duration-300"
                    >
                      BACK
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className="flex-1 bg-black text-white hover:bg-white hover:text-black border-2 border-black py-3 font-bold tracking-wider transition-all duration-300"
                  >
                    {step === 3 ? "PLACE ORDER" : "CONTINUE"}
                  </Button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <motion.div
              className="bg-black text-white p-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold tracking-wider mb-6">ORDER SUMMARY</h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b border-white pb-4">
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-sm">
                        Size: {item.size} | Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold">${item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-white pt-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>${shipping}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t border-white pt-2">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5" />
                  <span className="text-sm">Free shipping on orders over $200</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm">Secure checkout with SSL encryption</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5" />
                  <span className="text-sm">We accept all major credit cards</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
