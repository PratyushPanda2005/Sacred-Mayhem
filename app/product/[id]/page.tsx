
"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ShoppingBag, ArrowLeft, Plus, Minus, Star, Truck, Shield, RotateCcw, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/navigation"
import Link from "next/link"
import { getAnyProductById } from "@/lib/products"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState("description")

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getAnyProductById(params.id)
        // Map database fields to UI fields
        const mappedProduct = {
          ...data,
          images: data.image_url ? [data.image_url] : ["/placeholder.svg?height=600&width=600&text=PRODUCT+IMAGE"],
          category: "EXCLUSIVE",
          longDescription: data.description,
          details: data.product_details
            ? data.product_details.split('\n').filter((line: string) => line.trim() !== '')
            : ["Premium Materials", "Quality Construction", "Unique Design"],
          sizes: ["S", "M", "L", "XL"],
          colors: ["BLACK"],
          rating: data.rating || 4.5,
          reviews: data.reviews_count || 50,
          stock: data.stockQuantity || 10,
          isNew: new Date(data.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          features: [
            { icon: Truck, title: "Free Shipping", description: "On orders over $200" },
            { icon: RotateCcw, title: "30-Day Returns", description: "Easy returns & exchanges" },
            { icon: Shield, title: "Authenticity", description: "100% authentic guarantee" },
          ],
        }
        setProduct(mappedProduct)
        if (mappedProduct.colors && mappedProduct.colors.length > 0) {
          setSelectedColor(mappedProduct.colors[0])
        }
      } catch (err) {
        console.error("Error fetching product:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-current text-black" : "text-gray-300"}`} />
    ))
  }

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen">
        <Navigation />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
          <Loader2 className="w-12 h-12 animate-spin mb-4" />
          <p className="text-xl font-bold tracking-widest">LOADING PRODUCT...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="bg-white min-h-screen">
        <Navigation />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
          <h1 className="text-4xl font-black mb-4">PRODUCT NOT FOUND</h1>
          <Link href="/shop">
            <Button className="bg-black text-white hover:bg-white hover:text-black border-2 border-black px-8 py-3 font-bold tracking-wider">
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
            {/* Product Images */}
            <div className="space-y-4">
              <motion.div
                className="aspect-square bg-black overflow-hidden relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={product.images[selectedImage]}
                    alt={`${product.name} ${selectedImage + 1}`}
                    className="w-full h-full object-cover filter grayscale"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                {/* Image Navigation Dots */}
                {product.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {product.images.map((_: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${selectedImage === index ? "bg-white" : "bg-white/50"
                          }`}
                      />
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {product.images.map((image: string, index: number) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square bg-black overflow-hidden border-2 transition-all duration-300 ${selectedImage === index ? "border-black" : "border-transparent"
                        }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover filter grayscale"
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <Badge className="bg-black text-white tracking-wider">{product.category}</Badge>
                  {product.isNew && (
                    <Badge className="bg-white text-black border-2 border-black tracking-wider">NEW</Badge>
                  )}
                </div>

                <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">{product.name}</h1>

                <div className="flex items-center space-x-4 mb-6">
                  <p className="text-3xl font-black">${product.price}</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex">{renderStars(product.rating)}</div>
                    <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
                  </div>
                </div>

                <p className="text-lg leading-relaxed mb-6">{product.description}</p>

                {product.stock <= 5 && (
                  <div className="bg-black text-white p-3 mb-6">
                    <p className="font-bold tracking-wider">⚡ ONLY {product.stock} LEFT IN STOCK</p>
                  </div>
                )}
              </motion.div>

              {/* Color Selection */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-xl font-bold tracking-wider mb-4">COLOR</h3>
                <div className="flex space-x-3 mb-6">
                  {product.colors.map((color: string) => (
                    <motion.button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-3 border-2 font-bold tracking-wider transition-all duration-300 ${selectedColor === color
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-black hover:bg-black hover:text-white"
                        }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {color}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Size Selection */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-xl font-bold tracking-wider mb-4">SIZE</h3>
                <div className="grid grid-cols-6 gap-2 mb-6">
                  {product.sizes.map((size: string) => (
                    <motion.button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-4 border-2 font-bold tracking-wider transition-all duration-300 ${selectedSize === size
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-black hover:bg-black hover:text-white"
                        }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
                <Link href="/size-guide">
                  <span className="text-sm underline cursor-pointer hover:no-underline">SIZE GUIDE</span>
                </Link>
              </motion.div>

              {/* Quantity */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3 className="text-xl font-bold tracking-wider mb-4">QUANTITY</h3>
                <div className="flex items-center space-x-4 mb-8">
                  <Button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 border-2 border-black hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                  <Button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-3 border-2 border-black hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Button
                  disabled={!selectedSize}
                  className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black py-4 text-lg font-bold tracking-wider transition-all duration-300 disabled:opacity-50"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  ADD TO CART - ${product.price * quantity}
                </Button>

                <Button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-full border-2 border-black py-4 text-lg font-bold tracking-wider transition-all duration-300 ${isWishlisted
                    ? "bg-black text-white hover:bg-white hover:text-black"
                    : "bg-white text-black hover:bg-black hover:text-white"
                    }`}
                >
                  <Heart className={`w-5 h-5 mr-2 ${isWishlisted ? "fill-current" : ""}`} />
                  {isWishlisted ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
                </Button>
              </motion.div>

              {/* Features */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {product.features.map((feature: any, index: number) => (
                  <div key={index} className="flex items-center space-x-3 p-4 border border-black">
                    <feature.icon className="w-6 h-6" />
                    <div>
                      <h4 className="font-bold text-sm">{feature.title}</h4>
                      <p className="text-xs text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="border-b border-black mb-8">
              <div className="flex space-x-8">
                {["description", "details", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 font-bold tracking-wider uppercase transition-all duration-300 ${activeTab === tab ? "border-b-2 border-black text-black" : "text-gray-500 hover:text-black"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "description" && (
                  <div className="prose max-w-none">
                    <p className="text-lg leading-relaxed">{product.longDescription}</p>
                  </div>
                )}

                {activeTab === "details" && (
                  <div>
                    <h3 className="text-xl font-bold tracking-wider mb-6">PRODUCT DETAILS</h3>
                    <ul className="space-y-3">
                      {product.details.map((detail: string, index: number) => (
                        <li key={index} className="flex items-center space-x-3">
                          <span className="w-2 h-2 bg-black"></span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div>
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="flex">{renderStars(product.rating)}</div>
                      <span className="text-2xl font-bold">{product.rating}</span>
                      <span className="text-gray-600">({product.reviews} reviews)</span>
                    </div>
                    <p className="text-gray-600">Reviews feature coming soon...</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
