"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Plus, Minus, X, ShoppingBag, Tag, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navigation from "@/components/navigation"
import Link from "next/link"

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  selectedSize?: string
  selectedColor?: string
  category: string
}

const promoCodes = {
  MAYHEM10: { discount: 0.1, description: "10% off your order" },
  SACRED20: { discount: 0.2, description: "20% off your order" },
  CHAOS15: { discount: 0.15, description: "15% off your order" },
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [promoError, setPromoError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedCart = localStorage.getItem("sacred-mayhem-cart")
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    localStorage.setItem("sacred-mayhem-cart", JSON.stringify(cartItems))
  }, [cartItems])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }

    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item)),
    )
  }

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    const code = promoCode.toUpperCase()
    if (promoCodes[code as keyof typeof promoCodes]) {
      setAppliedPromo(code)
      setPromoError("")
      setPromoCode("")
    } else {
      setPromoError("Invalid promo code")
      setAppliedPromo(null)
    }
  }

  const removePromoCode = () => {
    setAppliedPromo(null)
    setPromoCode("")
    setPromoError("")
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = appliedPromo ? subtotal * promoCodes[appliedPromo as keyof typeof promoCodes].discount : 0
  const shipping = subtotal > 200 ? 0 : 15
  const tax = (subtotal - discount) * 0.08
  const total = subtotal - discount + shipping + tax

  if (isLoading) {
    return (
      <div className="bg-white text-black min-h-screen">
        <Navigation />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <motion.div
            className="text-2xl font-bold tracking-wider"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            LOADING CART...
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white text-black min-h-screen">
      <Navigation cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/shop">
            <motion.div
              className="flex items-center space-x-2 mb-8 cursor-pointer hover:underline"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-bold tracking-wider">CONTINUE SHOPPING</span>
            </motion.div>
          </Link>

          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">SHOPPING CART</h1>
            <p className="text-xl tracking-widest">
              {cartItems.length === 0 ? "YOUR CART IS EMPTY" : `${cartItems.length} ITEMS IN YOUR CART`}
            </p>
          </motion.div>

          {cartItems.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ShoppingBag className="w-24 h-24 mx-auto mb-8 text-gray-300" />
              <h2 className="text-3xl font-bold tracking-wider mb-4">YOUR CART IS EMPTY</h2>
              <p className="text-lg mb-8">Add some rebellious pieces to get started</p>
              <Link href="/shop">
                <Button className="bg-black text-white hover:bg-white hover:text-black border-2 border-black px-8 py-4 text-lg font-bold tracking-wider transition-all duration-300">
                  START SHOPPING
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <AnimatePresence>
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                      className="flex items-center space-x-6 border-b border-gray-200 py-6"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-24 h-24 object-cover filter grayscale"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-bold tracking-wider mb-2">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                        {item.selectedSize && (
                          <p className="text-sm">
                            <strong>Size:</strong> {item.selectedSize}
                          </p>
                        )}
                        {item.selectedColor && (
                          <p className="text-sm">
                            <strong>Color:</strong> {item.selectedColor}
                          </p>
                        )}
                        <p className="text-lg font-black mt-2">${item.price}</p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 border border-black hover:bg-black hover:text-white transition-all duration-300"
                          size="sm"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="text-lg font-bold w-8 text-center">{item.quantity}</span>
                        <Button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 border border-black hover:bg-black hover:text-white transition-all duration-300"
                          size="sm"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="text-xl font-black mb-2">${(item.price * item.quantity).toFixed(2)}</p>
                        <Button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 transition-all duration-300"
                          size="sm"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Order Summary */}
              <motion.div
                className="bg-gray-50 p-8 h-fit"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-2xl font-black tracking-wider mb-6">ORDER SUMMARY</h2>

                {/* Promo Code */}
                <div className="mb-6">
                  <label className="block text-sm font-bold tracking-wider mb-2">PROMO CODE</label>
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 border-black focus:border-black"
                      disabled={!!appliedPromo}
                    />
                    <Button
                      onClick={applyPromoCode}
                      disabled={!promoCode || !!appliedPromo}
                      className="bg-black text-white hover:bg-gray-800 px-4"
                    >
                      <Tag className="w-4 h-4" />
                    </Button>
                  </div>
                  {promoError && <p className="text-red-600 text-sm mt-2">{promoError}</p>}
                  {appliedPromo && (
                    <motion.div
                      className="flex items-center justify-between bg-green-100 p-3 mt-2 rounded"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div>
                        <p className="text-sm font-bold text-green-800">{appliedPromo} Applied</p>
                        <p className="text-xs text-green-600">
                          {promoCodes[appliedPromo as keyof typeof promoCodes].description}
                        </p>
                      </div>
                      <Button onClick={removePromoCode} size="sm" className="text-green-800 hover:bg-green-200">
                        <X className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-300 pt-4">
                    <div className="flex justify-between text-xl font-black">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-4 h-4" />
                    <span>Free shipping on orders over $200</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RotateCcw className="w-4 h-4" />
                    <span>30-day return policy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Secure checkout</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link href="/checkout">
                  <Button className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black py-4 text-lg font-bold tracking-wider transition-all duration-300">
                    PROCEED TO CHECKOUT
                  </Button>
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
