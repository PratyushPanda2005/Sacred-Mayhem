"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import Link from "next/link"

const collections = [
  {
    id: 1,
    title: "CHAOS THEORY",
    subtitle: "SPRING/SUMMER 2024",
    description: "Embrace the beautiful disorder of modern streetwear. Where structure meets rebellion.",
    image: "/placeholder.svg?height=600&width=800",
    products: 12,
    featured: true,
  },
  {
    id: 2,
    title: "VOID WALKER",
    subtitle: "FALL/WINTER 2023",
    description: "Navigate the space between luxury and street. Premium materials meet urban aesthetics.",
    image: "/placeholder.svg?height=600&width=800",
    products: 18,
    featured: false,
  },
  {
    id: 3,
    title: "SACRED GEOMETRY",
    subtitle: "CAPSULE COLLECTION",
    description: "Architectural lines and sacred proportions define this limited edition series.",
    image: "/placeholder.svg?height=600&width=800",
    products: 8,
    featured: false,
  },
  {
    id: 4,
    title: "BINARY CODE",
    subtitle: "TECH WEAR SERIES",
    description: "Digital age meets analog craftsmanship in our most technical collection yet.",
    image: "/placeholder.svg?height=600&width=800",
    products: 15,
    featured: false,
  },
]

export default function CollectionsPage() {
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

          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">COLLECTIONS</h1>
            <p className="text-xl tracking-widest">CURATED CHAOS</p>
          </motion.div>

          <div className="space-y-20">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                  }`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <motion.div
                    className="relative overflow-hidden bg-black group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.title}
                      className="w-full h-96 lg:h-[500px] object-cover filter grayscale group-hover:scale-110 transition-transform duration-500"
                    />
                    <motion.div className="absolute inset-0 bg-white mix-blend-difference opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                    {collection.featured && (
                      <div className="absolute top-6 left-6">
                        <span className="bg-white text-black px-4 py-2 font-bold tracking-wider">FEATURED</span>
                      </div>
                    )}
                  </motion.div>
                </div>

                <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                  <div>
                    <h3 className="text-sm font-bold tracking-widest mb-2 text-gray-600">{collection.subtitle}</h3>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">{collection.title}</h2>
                    <p className="text-lg leading-relaxed mb-6">{collection.description}</p>
                    <p className="text-sm font-bold tracking-wider mb-8">{collection.products} PIECES</p>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <Link href="/shop">
                      <Button className="bg-black text-white hover:bg-white hover:text-black border-2 border-black px-8 py-4 text-lg font-bold tracking-wider transition-all duration-300 w-full sm:w-auto">
                        SHOP COLLECTION
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/lookbook">
                      <Button className="bg-white text-black border-2 border-black hover:bg-black hover:text-white px-8 py-4 text-lg font-bold tracking-wider transition-all duration-300 w-full sm:w-auto">
                        VIEW LOOKBOOK
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <motion.div
            className="mt-20 bg-black text-white p-12 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-3xl font-black tracking-wider mb-4">STAY IN THE LOOP</h2>
            <p className="text-lg mb-8">Be the first to know about new collections and exclusive drops</p>
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
  )
}
