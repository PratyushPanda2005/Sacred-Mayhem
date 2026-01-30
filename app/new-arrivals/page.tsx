"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Heart, ShoppingBag, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/navigation"
import Link from "next/link"

const newProducts = [
  {
    id: 11,
    name: "NEON CHAOS TEE",
    price: 190,
    image: "/placeholder.svg?height=400&width=400",
    category: "TOPS",
    releaseDate: "2024-01-20",
    isLimited: true,
    stock: 25,
  },
  {
    id: 12,
    name: "DIGITAL VOID HOODIE",
    price: 320,
    image: "/placeholder.svg?height=400&width=400",
    category: "TOPS",
    releaseDate: "2024-01-18",
    isLimited: false,
    stock: 50,
  },
  {
    id: 13,
    name: "CYBER CARGO PANTS",
    price: 380,
    image: "/placeholder.svg?height=400&width=400",
    category: "BOTTOMS",
    releaseDate: "2024-01-15",
    isLimited: true,
    stock: 15,
  },
  {
    id: 14,
    name: "MATRIX BOMBER",
    price: 520,
    image: "/placeholder.svg?height=400&width=400",
    category: "OUTERWEAR",
    releaseDate: "2024-01-12",
    isLimited: true,
    stock: 8,
  },
  {
    id: 15,
    name: "GLITCH TANK",
    price: 140,
    image: "/placeholder.svg?height=400&width=400",
    category: "TOPS",
    releaseDate: "2024-01-10",
    isLimited: false,
    stock: 40,
  },
  {
    id: 16,
    name: "QUANTUM SHORTS",
    price: 180,
    image: "/placeholder.svg?height=400&width=400",
    category: "BOTTOMS",
    releaseDate: "2024-01-08",
    isLimited: false,
    stock: 30,
  },
]

export default function NewArrivalsPage() {
  const [wishlist, setWishlist] = useState<number[]>([])

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
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

          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Sparkles className="w-8 h-8" />
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter">NEW ARRIVALS</h1>
              <Sparkles className="w-8 h-8" />
            </div>
            <p className="text-xl tracking-widest">FRESH CHAOS JUST DROPPED</p>
          </motion.div>

          {/* Featured New Item */}
          <motion.div
            className="bg-black text-white p-8 mb-16"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="bg-white text-black mb-4 font-bold tracking-wider">JUST DROPPED</Badge>
                <h2 className="text-4xl font-black tracking-tighter mb-4">NEON CHAOS TEE</h2>
                <p className="text-lg mb-6">
                  Our latest creation merges digital aesthetics with street rebellion. Limited to 25 pieces worldwide.
                </p>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-black">$190</span>
                  <Badge className="bg-white text-black">LIMITED EDITION</Badge>
                </div>
                <div className="flex space-x-4">
                  <Link href="/product/11">
                    <Button className="bg-white text-black hover:bg-black hover:text-white border-2 border-white px-8 py-4 text-lg font-bold tracking-wider transition-all duration-300">
                      SHOP NOW
                    </Button>
                  </Link>
                  <Button
                    onClick={() => toggleWishlist(11)}
                    className="bg-black text-white border-2 border-white hover:bg-white hover:text-black px-8 py-4 text-lg font-bold tracking-wider transition-all duration-300"
                  >
                    <Heart className={`w-5 h-5 mr-2 ${wishlist.includes(11) ? "fill-current" : ""}`} />
                    WISHLIST
                  </Button>
                </div>
              </div>
              <motion.div
                className="relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/placeholder.svg?height=500&width=400"
                  alt="Neon Chaos Tee"
                  className="w-full h-96 object-cover filter grayscale"
                />
                <motion.div className="absolute inset-0 bg-white mix-blend-difference opacity-0 hover:opacity-30 transition-opacity duration-500" />
              </motion.div>
            </div>
          </motion.div>

          {/* New Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newProducts.slice(1).map((product, index) => (
              <motion.div
                key={product.id}
                className="group"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
              >
                <div className="relative overflow-hidden bg-black mb-4">
                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-10 space-y-2">
                    <Badge className="bg-white text-black font-bold tracking-wider">NEW</Badge>
                    {product.isLimited && (
                      <Badge className="bg-black text-white border-2 border-white font-bold tracking-wider">
                        LIMITED
                      </Badge>
                    )}
                  </div>

                  {/* Stock Info */}
                  {product.stock <= 10 && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-white text-black font-bold tracking-wider">ONLY {product.stock} LEFT</Badge>
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <motion.button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute bottom-4 right-4 z-10 p-2 bg-white text-black hover:bg-black hover:text-white transition-all duration-300"
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

                  <motion.div className="absolute inset-0 bg-white mix-blend-difference opacity-0 group-hover:opacity-30 transition-opacity duration-300" />

                  <motion.div
                    className="absolute bottom-4 left-4 right-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ y: 20 }}
                    whileHover={{ y: 0 }}
                  >
                    <Button className="w-full bg-white text-black hover:bg-black hover:text-white border-2 border-black py-3 font-bold tracking-wider transition-all duration-300">
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
                  <p className="text-2xl font-black mb-2">${product.price}</p>
                  <p className="text-sm text-gray-600">Released {formatDate(product.releaseDate)}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Coming Soon Section */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-4xl font-black tracking-wider mb-8">COMING SOON</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-black text-white p-6">
                <h3 className="text-xl font-bold tracking-wider mb-2">HOLOGRAM COLLECTION</h3>
                <p className="mb-4">Next-gen streetwear meets holographic technology</p>
                <p className="text-sm font-bold tracking-wider">FEBRUARY 2024</p>
              </div>
              <div className="bg-black text-white p-6">
                <h3 className="text-xl font-bold tracking-wider mb-2">SACRED X ARTIST COLLAB</h3>
                <p className="mb-4">Limited collaboration with underground artists</p>
                <p className="text-sm font-bold tracking-wider">MARCH 2024</p>
              </div>
              <div className="bg-black text-white p-6">
                <h3 className="text-xl font-bold tracking-wider mb-2">MAYHEM ACCESSORIES</h3>
                <p className="mb-4">Complete your look with our first accessory line</p>
                <p className="text-sm font-bold tracking-wider">APRIL 2024</p>
              </div>
            </div>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            className="mt-16 bg-black text-white p-8 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <h2 className="text-3xl font-black tracking-wider mb-4">NEVER MISS A DROP</h2>
            <p className="text-lg mb-8">Get notified about new arrivals and exclusive releases</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="flex-1 px-4 py-3 bg-white text-black font-bold tracking-wider focus:outline-none"
              />
              <Button className="bg-white text-black hover:bg-black hover:text-white border-2 border-white px-8 py-3 font-bold tracking-wider transition-all duration-300">
                SUBSCRIBE
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
