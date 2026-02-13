"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Heart, Eye, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import Link from "next/link"
import { toast } from "sonner"

// const featuredProducts = [
//   {
//     id: 1,
//     name: "CHAOS OVERSIZED TEE",
//     price: 180,
//     image: "/images/product-tee-front.png",
//     hoverImage: "/images/product-tee-back.png",
//     category: "TOPS",
//     isNew: true,
//   },
//   ...
// ]

import { useQuery } from "@tanstack/react-query"
import { getFeaturedCollection } from "@/lib/products"

export default function HomePage() {
  const [cartItems, setCartItems] = useState<any[]>([])
  const [wishlistItems, setWishlistItems] = useState<any[]>([])
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null) // Changed from number to string for ID

  const { data: featuredData } = useQuery({
    queryKey: ['home-featured-collection'],
    queryFn: getFeaturedCollection
  });

  const featuredProducts = featuredData?.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price || 0,
    image: p.image_url,
    hoverImage: p.image_url, // Use same image for now
    category: "EXCLUSIVE", // Default or extract if possible
    isNew: new Date(p.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // New if within 30 days
    isSoldOut: p.is_sold_out || false
  })) || [];

  useEffect(() => {
    const savedCart = localStorage.getItem("sacred-mayhem-cart")
    const savedWishlist = localStorage.getItem("sacred-mayhem-wishlist")

    if (savedCart) setCartItems(JSON.parse(savedCart))
    if (savedWishlist) setWishlistItems(JSON.parse(savedWishlist))
  }, [])

  const addToWishlist = (product: any) => {
    const isInWishlist = wishlistItems.some((item) => item.id === product.id)
    let newWishlist

    if (isInWishlist) {
      newWishlist = wishlistItems.filter((item) => item.id !== product.id)
      toast.success("Removed from wishlist")
    } else {
      newWishlist = [...wishlistItems, product]
      toast.success("Added to wishlist")
    }

    setWishlistItems(newWishlist)
    localStorage.setItem("sacred-mayhem-wishlist", JSON.stringify(newWishlist))
  }

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.id === productId)
  }

  return (
    <div className="bg-white text-black min-h-screen overflow-x-hidden">
      <Navigation
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistItems.length}
        onCartOpen={() => { }}
      />

      {/* Hero Section with Same Animation as About Page */}
      <section className="relative h-screen flex items-center justify-center bg-black text-white overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{ transformOrigin: "left" }}
        />

        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
          >
            <motion.span
              className="inline-block"
              animate={{
                color: ["#000000", "#ffffff", "#000000"],
                textShadow: ["0 0 0px #000", "0 0 20px #000", "0 0 0px #000"],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              SACRED
            </motion.span>
            <br />
            <motion.span
              className="inline-block"
              animate={{
                color: ["#ffffff", "#000000", "#ffffff"],
                textShadow: ["0 0 0px #fff", "0 0 20px #fff", "0 0 0px #fff"],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 }}
            >
              MAYHEM
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl font-light tracking-widest mb-12 text-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            LUXURY STREETWEAR FOR THE REBELLIOUS SOUL
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.8 }}
          >
            <Link href="/shop">
              <Button className="bg-black text-white hover:bg-white hover:text-black border-2 border-black px-12 py-4 text-lg font-bold tracking-wider transition-all duration-300">
                SHOP COLLECTION
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/lookbook">
              <Button className="bg-white text-black hover:bg-black hover:text-white border-2 border-black px-12 py-4 text-lg font-bold tracking-wider transition-all duration-300">
                VIEW LOOKBOOK
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronRight className="w-8 h-8 rotate-90" />
        </motion.div>
      </section>

      {/* Featured Products with Same Styling as ProductGrid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">IN THE SPOTLIGHT</h2>
            <p className="text-xl tracking-widest">EMBRACE THE CHAOS</p>
          </motion.div>

          {/* Centered Grid Layout */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-fit">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="group relative overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onHoverStart={() => setHoveredProduct(product.id)}
                  onHoverEnd={() => setHoveredProduct(null)}
                  style={{ width: '300px' }}
                >
                  <Link href={`/product/${product.id}`}>
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <img
                        src={hoveredProduct === product.id ? product.hoverImage : product.image}
                        alt={product.name}
                        className="w-full h-full object-cover filter transition-all duration-500 group-hover:scale-105"
                      />

                      <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-bold tracking-wider space-y-2">
                        {product.isNew && <div>NEW</div>}
                        {product.isSoldOut && <div className="bg-red-600 text-white px-2 py-1">SOLD OUT</div>}
                      </div>

                      {/* Sold Out Overlay */}
                      {product.isSoldOut && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10 pointer-events-none">
                          <span className="text-white font-black text-xl tracking-tighter border-2 border-white px-4 py-2 transform -rotate-12">SOLD OUT</span>
                        </div>
                      )}

                      {/* Hover Actions */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100">
                        <Button
                          onClick={(e) => {
                            e.preventDefault()
                            addToWishlist(product)
                          }}
                          className={`p-3 rounded-full transition-all duration-300 ${isInWishlist(product.id)
                            ? "bg-red-500 text-white"
                            : "bg-white text-black hover:bg-black hover:text-white"
                            }`}
                        >
                          <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                        </Button>

                        <Button className="p-3 rounded-full bg-white text-black hover:bg-black hover:text-white transition-all duration-300">
                          <Eye className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </Link>

                  <div className="p-4">
                    <p className="text-sm text-gray-600 tracking-wider">{product.category}</p>
                    <h3 className="text-lg font-bold tracking-wider mt-1">{product.name}</h3>
                    <p className="text-xl font-black mt-2">${product.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link href="/shop">
              <Button className="bg-black text-white hover:bg-white hover:text-black border-2 border-black px-8 py-4 text-lg font-bold tracking-wider transition-all duration-300">
                VIEW ALL PRODUCTS
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-8">
              BORN FROM
              <br />
              <motion.span
                animate={{
                  textShadow: ["0 0 0px #fff", "0 0 20px #fff", "0 0 40px #fff", "0 0 20px #fff", "0 0 0px #fff"],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                REBELLION
              </motion.span>
            </h2>

            <Link href="/about">
              <Button className="bg-white text-black hover:bg-black hover:text-white border-2 border-white px-8 py-4 text-lg font-bold tracking-wider transition-all duration-300">
                OUR STORY
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-8">JOIN THE REBELLION</h2>
            <p className="text-xl mb-8">Be the first to know about new drops, exclusive releases, and rebel updates.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 border-2 border-black focus:outline-none focus:ring-0 font-bold tracking-wider"
              />
              <Button className="bg-black text-white hover:bg-white hover:text-black border-2 border-black px-8 py-4 font-bold tracking-wider transition-all duration-300">
                SUBSCRIBE
              </Button>
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-white border-t border-black py-14">
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
  )
}