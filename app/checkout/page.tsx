"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, CreditCard, Truck, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Navigation from "@/components/navigation"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { saveCheckoutUser } from "@/lib/users"

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  selectedSize?: string
  selectedColor?: string
  category: string
}

const ADMIN_WHATSAPP_NUMBER = "+919535475154" // Change this to the actual admin number

export default function CheckoutPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
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
    phone: "",
  })

  useEffect(() => {
    const savedCart = localStorage.getItem("sacred-mayhem-cart")
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
    setIsLoaded(true)
  }, [])

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 200 ? 0 : 15
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const generateWhatsAppMessage = () => {
    const orderNumber = `SM-${Math.floor(100000 + Math.random() * 900000)}`
    let message = `*NEW ORDER FROM SACRED MAYHEM*%0A%0A`
    message += `*Order Number:* ${orderNumber}%0A`
    message += `*Customer:* ${formData.firstName} ${formData.lastName}%0A`
    message += `*Email:* ${formData.email}%0A`
    message += `*Phone:* ${formData.phone}%0A%0A`
    message += `*Shipping Address:*%0A${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}, ${formData.country}%0A%0A`
    message += `*ITEMS:*%0A`

    cartItems.forEach((item) => {
      message += `- ${item.name} (${item.selectedSize || "N/A"}) x ${item.quantity} - $${item.price * item.quantity}%0A`
    })

    message += `%0A*Subtotal:* $${subtotal.toFixed(2)}`
    message += `%0A*Shipping:* $${shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}`
    message += `%0A*Tax:* $${tax.toFixed(2)}`
    message += `%0A*TOTAL:* $${total.toFixed(2)}`

    return message
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Store user details as soon as they complete Step 1 (Contact Info)
    if (step === 1) {
      saveCheckoutUser({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zipCode,
        country: formData.country,
      }).catch(console.error)
    }

    if (step < 3) {
      setStep(step + 1)
    } else {
      // Process order
      const message = generateWhatsAppMessage()
      const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP_NUMBER.replace(/\+/g, "")}?text=${message}`

      // Final save to capture full shipping details
      saveCheckoutUser({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zipCode,
        country: formData.country,
      }).catch(console.error)

      // Save order info for confirmation page
      localStorage.setItem("last-order", JSON.stringify({
        items: cartItems,
        total,
        formData,
        date: new Date().toLocaleDateString(),
      }))

      // Clear cart
      localStorage.removeItem("sacred-mayhem-cart")

      // Open WhatsApp and redirect
      window.open(whatsappUrl, "_blank")
      router.push("/order-confirmation")
    }
  }

  if (!isLoaded) return null

  if (cartItems.length === 0 && step === 1) {
    return (
      <div className="bg-white text-black min-h-screen">
        <Navigation />
        <div className="pt-32 text-center">
          <h1 className="text-3xl font-bold mb-8">YOUR CART IS EMPTY</h1>
          <Link href="/shop">
            <Button className="bg-black text-white hover:bg-white hover:text-black border-2 border-black px-8 py-4">
              BACK TO SHOP
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white text-black min-h-screen">
      <Navigation />

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/cart">
            <motion.div
              className="flex items-center space-x-2 mb-8 cursor-pointer hover:underline"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-bold tracking-wider">BACK TO CART</span>
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
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= stepNumber ? "bg-black text-white" : "bg-white border-2 border-black text-black"
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
                      <div>
                        <Label htmlFor="phone" className="font-bold tracking-wider">
                          PHONE NUMBER
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="border-2 border-black focus:ring-0 focus:border-black"
                          placeholder="+1 234 567 8900"
                          required
                        />
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
                    {step === 3 ? "PLACE ORDER VIA WHATSAPP" : "CONTINUE"}
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

              <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                {cartItems.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex justify-between items-center border-b border-white pb-4">
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
                  <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t border-white pt-2">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-8 space-y-4 border-t border-white pt-6">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Truck className="w-5 h-5" />
                  <span className="text-sm">Free shipping on orders over $200</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm">Concierge WhatsApp confirmation</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <CreditCard className="w-5 h-5" />
                  <span className="text-sm">Secure data handling</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
