"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import Link from "next/link"

import { getCollections } from "@/lib/collections"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"

export default function LookbookPage() {
  const { data: collections, isLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
  })

  if (isLoading) {
    return (
      <div className="bg-white text-black min-h-screen">
        <Navigation />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] pt-16">
          <Loader2 className="w-8 h-8 animate-spin text-black" />
        </div>
      </div>
    )
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
            {collections?.map((collection, index) => (
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
                      src={collection.image_url || "/placeholder.svg"}
                      alt={collection.title}
                      className="w-full h-96 lg:h-[500px] object-cover  group-hover:scale-110 transition-transform duration-500"
                    />
                    <motion.div className="absolute inset-0 bg-white mix-blend-difference opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                    {collection.is_featured && (
                      <div className="absolute top-6 left-6">
                        <span className="bg-white text-black px-4 py-2 font-bold tracking-wider">FEATURED</span>
                      </div>
                    )}
                  </motion.div>
                </div>

                <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                  <div>
                    <h3 className="text-sm font-bold tracking-widest mb-2 text-gray-600">{collection.season}</h3>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">{collection.title}</h2>
                    <p className="text-lg leading-relaxed mb-6">{collection.description}</p>
                    <p className="text-sm font-bold tracking-wider mb-8">{collection.piece_count} PIECES</p>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <Link href={`/lookbook/${collection.id}`} className="flex-1">
                      <Button className="bg-black text-white hover:bg-white hover:text-black border-2 border-black px-8 py-4 text-lg font-bold tracking-wider transition-all duration-300 w-full sm:w-auto">
                        VIEW LOOKBOOK
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/shop" className="flex-1">
                      <Button variant="outline" className="bg-transparent text-black hover:bg-black hover:text-white border-2 border-black px-8 py-4 text-lg font-bold tracking-wider transition-all duration-300 w-full sm:w-auto">
                        SHOP PIECES
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
    </div>
  )
}
