"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, Heart, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/navigation"
import Link from "next/link"

const saleProducts = [
  {
    id: 3,
    name: "REBELLION HOODIE",
    price: 280,
    originalPrice: 350,
    discount: 20,
    image: "/placeholder.svg?height=400&width=400",
    category: "TOPS",
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 5,
  },
  {
    id: 8,
    name: "CHAOS JOGGERS",
    price: 200,
    originalPrice: 250,
    discount: 20,
    image: "/placeholder.svg?height=400&width=400",
    category: "BOTTOMS",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 12,
  },
  {
    id: 9,
    name: "VOID JACKET",
    price: 360,
    originalPrice: 450,
    discount: 20,
    image: "/placeholder.svg?height=400&width=400",
    category: "OUTERWEAR",
    sizes: ["S", "M", "L", "XL"],
    stock: 3,
  },
  {
    id: 10,
    name: "SACRED TEE",
    price: 144,
    originalPrice: 180,
    discount: 20,
    image: "/placeholder.svg?height=400&width=400",
    category: "TOPS",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 8,
  },
]

export default function SalePage() {
  const [wishlist, setWishlist] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45,
  })

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <div className="bg-white text-black min-h-screen">
      <Navigation wishlistCount={wishlist.length} />

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

          {/* Sale Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">SALE</h1>
            <p className="text-xl tracking-widest mb-8">UP TO 20% OFF SELECTED ITEMS</p>

            {/* Countdown Timer */}
            <motion.div
              className="bg-black text-white p-6 inline-block"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="w-5 h-5" />
                <span className="font-bold tracking-wider">SALE ENDS IN:</span>
              </div>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-3xl font-black">{timeLeft.days}</div>
                  <div className="text-sm tracking-wider">DAYS</div>
                </div>
                <div>
                  <div className="text-3xl font-black">{timeLeft.hours}</div>
                  <div className="text-sm tracking-wider">HOURS</div>
                </div>
                <div>
                  <div className="text-3xl font-black">{timeLeft.minutes}</div>
                  <div className="text-sm tracking-wider">MINS</div>
                </div>
                <div>
                  <div className="text-3xl font-black">{timeLeft.seconds}</div>
                  <div className="text-sm tracking-wider">SECS</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Sale Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {saleProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="group"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative overflow-hidden bg-black mb-4">
                  {/* Sale Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <Badge className="bg-white text-black font-bold tracking-wider">-{product.discount}%</Badge>
                  </div>

                  {/* Stock Warning */}
                  {product.stock <= 5 && (
                    <div className="absolute top-4 right-4 z-20">
                      <Badge className="bg-black text-white font-bold tracking-wider">ONLY {product.stock} LEFT</Badge>
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <motion.button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute bottom-4 right-4 z-20 p-2 bg-white text-black hover:bg-black hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? "fill-current" : ""}`} />
                  </motion.button>

                  <Link href={`/product/${product.id}`}>
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-96 object-cover filter grayscale cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>

                  {/* Improved Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />

                  {/* Add to Cart Button - Aligned with Heart */}
                  <motion.div
                    className="absolute bottom-4 left-4 right-16 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                  >
                    <Button
                      className="w-full bg-white text-black hover:bg-black hover:text-white border-2 border-white py-3 font-bold tracking-wider transition-all duration-300 shadow-lg"
                      onClick={(e) => {
                        e.preventDefault();
                        // Add to cart logic here
                      }}
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      ADD TO CART
                    </Button>
                  </motion.div>
                </div>

                <div className="text-center">
                  <Badge className="bg-black text-white mb-2 tracking-wider">{product.category}</Badge>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-xl font-bold tracking-wider mb-2 cursor-pointer hover:underline">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-center space-x-3">
                    <p className="text-2xl font-black">${product.price}</p>
                    <p className="text-lg line-through text-gray-500">${product.originalPrice}</p>
                    <Badge className="bg-black text-white text-sm">SAVE ${product.originalPrice - product.price}</Badge>
                  </div>
                  <p className="text-sm mt-2">
                    <strong>Sizes:</strong> {product.sizes.join(", ")}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sale Terms */}
          <motion.div
            className="mt-16 bg-black text-white p-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl font-black tracking-wider mb-6 text-center">SALE TERMS & CONDITIONS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div>
                <h3 className="font-bold tracking-wider mb-3">GENERAL TERMS</h3>
                <ul className="space-y-2">
                  <li>• Sale prices are valid for a limited time only</li>
                  <li>• Discounts cannot be combined with other offers</li>
                  <li>• Sale items are final sale - no returns or exchanges</li>
                  <li>• Limited quantities available</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold tracking-wider mb-3">SHIPPING & DELIVERY</h3>
                <ul className="space-y-2">
                  <li>• Free shipping on orders over $200</li>
                  <li>• Express shipping available for additional cost</li>
                  <li>• Sale items ship within 1-2 business days</li>
                  <li>• International shipping rates apply</li>
                </ul>
              </div>
            </div>
          </motion.div>
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
    </div>
  )
}