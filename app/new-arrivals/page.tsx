"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Heart, ShoppingBag, Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/navigation"
import Link from "next/link"
import { getNewArrivals } from "@/lib/products"
import { type Product } from "@/lib/supabase"

export default function NewArrivalsPage() {
  const [wishlist, setWishlist] = useState<string[]>([])
  const [arrivals, setArrivals] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchArrivals() {
      try {
        const data = await getNewArrivals()
        setArrivals(data)
      } catch (error) {
        console.error("Failed to fetch new arrivals:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchArrivals()
  }, [])

  const toggleWishlist = (productId: string) => {
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

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 animate-spin mb-4" />
              <p className="text-xl font-bold tracking-widest">LOADING NEW ARRIVALS...</p>
            </div>
          ) : arrivals.length > 0 ? (
            <>
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
                    <h2 className="text-4xl font-black tracking-tighter mb-4 uppercase">{arrivals[0].name}</h2>
                    <p className="text-lg mb-6 line-clamp-3">
                      {arrivals[0].description}
                    </p>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="text-3xl font-black">${arrivals[0].price}</span>
                      <Badge className="bg-white text-black">LIMITED EDITION</Badge>
                    </div>
                    <div className="flex space-x-4">
                      <Link href={`/product/${arrivals[0].id}`}>
                        <Button className="bg-white text-black hover:bg-black hover:text-white border-2 border-white px-8 py-4 text-lg font-bold tracking-wider transition-all duration-300">
                          SHOP NOW
                        </Button>
                      </Link>
                      <Button
                        onClick={() => toggleWishlist(arrivals[0].id)}
                        className="bg-black text-white border-2 border-white hover:bg-white hover:text-black px-8 py-4 text-lg font-bold tracking-wider transition-all duration-300"
                      >
                        <Heart className={`w-5 h-5 mr-2 ${wishlist.includes(arrivals[0].id) ? "fill-current" : ""}`} />
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
                      src={arrivals[0].image_url || "/placeholder.svg?height=500&width=400"}
                      alt={arrivals[0].name}
                      className="w-full h-96 object-cover filter grayscale"
                    />
                    <motion.div className="absolute inset-0 bg-white mix-blend-difference opacity-0 hover:opacity-30 transition-opacity duration-500" />
                  </motion.div>
                </div>
              </motion.div>

              {/* New Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {arrivals.slice(1).map((product, index) => (
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
                      </div>

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
                          src={product.image_url || "/placeholder.svg?height=400&width=400"}
                          alt={product.name}
                          className="w-full h-96 object-cover filter grayscale cursor-pointer"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                      </Link>

                      <motion.div className="absolute inset-0 bg-white mix-blend-difference opacity-0 group-hover:opacity-30 transition-opacity duration-300" />

                      <motion.div
                        className="absolute bottom-4 left-4 right-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <Link href={`/product/${product.id}`}>
                          <Button className="w-full bg-white text-black hover:bg-black hover:text-white border-2 border-black py-3 font-bold tracking-wider transition-all duration-300">
                            <ShoppingBag className="w-4 h-4 mr-2" />
                            VIEW DETAILS
                          </Button>
                        </Link>
                      </motion.div>
                    </div>

                    <div className="text-center">
                      <Link href={`/product/${product.id}`}>
                        <h3 className="text-xl font-bold tracking-wider mb-2 cursor-pointer hover:underline uppercase">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-2xl font-black mb-2">${product.price}</p>
                      <p className="text-sm text-gray-600">Released {formatDate(product.created_at)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl font-bold tracking-widest">NO NEW ARRIVALS AT THE MOMENT.</p>
              <p className="mt-4">CHECK BACK SOON FOR THE LATEST DROPS.</p>
            </div>
          )}

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
