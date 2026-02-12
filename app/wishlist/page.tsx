"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Heart, ShoppingBag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import Navigation from "@/components/navigation"
import Link from "next/link"

interface Product {
  id: number
  name: string
  price: number
  image: string
  hoverImage: string
  category: string
  description: string
  sizes: string[]
  colors: string[]
  isNew?: boolean
  onSale?: boolean
  originalPrice?: number
  stock: number
}

interface CartItem extends Product {
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

const products: Product[] = [
  {
    id: 1,
    name: "CHAOS OVERSIZED TEE",
    price: 180,
    image: "/placeholder.svg?height=400&width=400&text=CHAOS+TEE+FRONT",
    hoverImage: "/placeholder.svg?height=400&width=400&text=CHAOS+TEE+BACK",
    category: "TOPS",
    description:
      "Embrace the beautiful chaos with our signature oversized tee. Premium cotton blend with rebellious graphics.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["BLACK", "WHITE"],
    isNew: true,
    stock: 15,
  },
  {
    id: 2,
    name: "VOID CARGO PANTS",
    price: 320,
    image: "/placeholder.svg?height=400&width=400&text=VOID+CARGO+FRONT",
    hoverImage: "/placeholder.svg?height=400&width=400&text=VOID+CARGO+DETAIL",
    category: "BOTTOMS",
    description: "Navigate the urban landscape in style. Technical fabric meets street aesthetics.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["BLACK", "CHARCOAL"],
    stock: 8,
  },
  {
    id: 3,
    name: "REBELLION HOODIE",
    price: 280,
    originalPrice: 350,
    image: "/placeholder.svg?height=400&width=400&text=REBELLION+HOODIE+FRONT",
    hoverImage: "/placeholder.svg?height=400&width=400&text=REBELLION+HOODIE+BACK",
    category: "TOPS",
    description: "Soft rebellion in premium fleece. Oversized fit with sacred geometry details.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["BLACK", "WHITE"],
    onSale: true,
    stock: 12,
  },
  {
    id: 4,
    name: "SHADOW BOMBER",
    price: 450,
    image: "/placeholder.svg?height=400&width=400&text=SHADOW+BOMBER+FRONT",
    hoverImage: "/placeholder.svg?height=400&width=400&text=SHADOW+BOMBER+DETAIL",
    category: "OUTERWEAR",
    description: "Military-inspired silhouette meets luxury streetwear. Water-resistant finish.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["BLACK"],
    isNew: true,
    stock: 5,
  },
  {
    id: 5,
    name: "MAYHEM TANK",
    price: 120,
    image: "/placeholder.svg?height=400&width=400&text=MAYHEM+TANK+FRONT",
    hoverImage: "/placeholder.svg?height=400&width=400&text=MAYHEM+TANK+BACK",
    category: "TOPS",
    description: "Minimalist rebellion. Lightweight cotton with subtle branding.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["BLACK", "WHITE"],
    stock: 20,
  },
  {
    id: 6,
    name: "URBAN SHORTS",
    price: 160,
    image: "/placeholder.svg?height=400&width=400&text=URBAN+SHORTS+FRONT",
    hoverImage: "/placeholder.svg?height=400&width=400&text=URBAN+SHORTS+DETAIL",
    category: "BOTTOMS",
    description: "Street-ready comfort. Technical fabric with multiple pockets.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["BLACK", "CHARCOAL"],
    stock: 18,
  },
]

export default function WishlistPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<number[]>([])
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

  // Load cart and wishlist from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("sacred-mayhem-cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    const savedWishlist = localStorage.getItem("sacred-mayhem-wishlist")
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist))
    }
  }, [])

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("sacred-mayhem-cart", JSON.stringify(cart))
  }, [cart])

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("sacred-mayhem-wishlist", JSON.stringify(wishlist))
  }, [wishlist])

  const wishlistProducts = products.filter((product) => wishlist.includes(product.id))

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        if (existing.quantity < product.stock) {
          return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
        }
        return prev
      }
      return [...prev, { ...product, quantity: 1, selectedSize: product.sizes[0], selectedColor: product.colors[0] }]
    })
  }

  const removeFromWishlist = (productId: number) => {
    setWishlist((prev) => prev.filter((id) => id !== productId))
    setSelectedItems((prev) => prev.filter((id) => id !== productId))
  }

  const toggleSelectItem = (productId: number) => {
    setSelectedItems((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const selectAll = () => {
    setSelectedItems(wishlistProducts.map((p) => p.id))
  }

  const deselectAll = () => {
    setSelectedItems([])
  }

  const addSelectedToCart = () => {
    selectedItems.forEach((productId) => {
      const product = products.find((p) => p.id === productId)
      if (product) {
        addToCart(product)
      }
    })
    setSelectedItems([])
  }

  const removeSelected = () => {
    setWishlist((prev) => prev.filter((id) => !selectedItems.includes(id)))
    setSelectedItems([])
  }

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  if (wishlistProducts.length === 0) {
    return (
      <div className="bg-white text-black min-h-screen">
        <Navigation cartItemCount={cartItemCount} wishlistCount={0} onCartOpen={() => { }} />

        <div className="pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Link href="/shop">
              <motion.div
                className="flex items-center space-x-2 mb-8 cursor-pointer hover:underline"
                whileHover={{ x: -5 }}
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-bold tracking-wider">CONTINUE SHOPPING</span>
              </motion.div>
            </Link>

            <div className="text-center py-16">
              <Heart className="w-24 h-24 mx-auto mb-8 text-gray-400" />
              <h1 className="text-4xl font-black tracking-wider mb-4">YOUR WISHLIST IS EMPTY</h1>
              <p className="text-xl text-gray-600 mb-8">Save items you love for later</p>
              <Link href="/shop">
                <Button className="bg-black text-white hover:bg-white hover:text-black border-2 border-black px-8 py-4 text-lg font-bold tracking-wider transition-all duration-300">
                  DISCOVER PRODUCTS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white text-black min-h-screen">
      <Navigation cartItemCount={cartItemCount} wishlistCount={wishlist.length} onCartOpen={() => { }} />

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

          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl md:text-5xl font-black tracking-wider">WISHLIST</h1>
              <Badge className="bg-black text-white text-lg px-4 py-2">
                {wishlistProducts.length} {wishlistProducts.length === 1 ? "Item" : "Items"}
              </Badge>
            </div>
          </motion.div>

          {/* Bulk Actions */}
          <motion.div
            className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-gray-50 border-2 border-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="select-all"
                  checked={selectedItems.length === wishlistProducts.length && wishlistProducts.length > 0}
                  onCheckedChange={(checked) => (checked ? selectAll() : deselectAll())}
                />
                <label htmlFor="select-all" className="font-bold tracking-wider cursor-pointer">
                  SELECT ALL
                </label>
              </div>
              {selectedItems.length > 0 && (
                <Badge className="bg-blue-100 text-blue-800">{selectedItems.length} Selected</Badge>
              )}
            </div>

            {selectedItems.length > 0 && (
              <div className="flex space-x-3">
                <Button
                  onClick={addSelectedToCart}
                  className="bg-black text-white hover:bg-white hover:text-black border-2 border-black"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  ADD TO CART ({selectedItems.length})
                </Button>
                <Button
                  onClick={removeSelected}
                  className="bg-red-600 text-white hover:bg-white hover:text-red-600 border-2 border-red-600"
                >
                  <X className="w-4 h-4 mr-2" />
                  REMOVE ({selectedItems.length})
                </Button>
              </div>
            )}
          </motion.div>

          {/* Wishlist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence>
              {wishlistProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onHoverStart={() => setHoveredProduct(product.id)}
                  onHoverEnd={() => setHoveredProduct(null)}
                >
                  {/* Selection Checkbox */}
                  <div className="absolute top-4 left-4 z-20">
                    <Checkbox
                      checked={selectedItems.includes(product.id)}
                      onCheckedChange={() => toggleSelectItem(product.id)}
                      className="bg-white border-2 border-black data-[state=checked]:bg-black data-[state=checked]:border-black"
                    />
                  </div>

                  <div className="relative overflow-hidden bg-black mb-4">
                    {/* Badges */}
                    <div className="absolute top-4 right-4 z-20 space-y-2">
                      {product.isNew && <Badge className="bg-white text-black font-bold tracking-wider">NEW</Badge>}
                      {product.onSale && (
                        <Badge className="bg-black text-white border-2 border-white font-bold tracking-wider">
                          SALE
                        </Badge>
                      )}
                      {product.stock <= 5 && (
                        <Badge className="bg-red-600 text-white font-bold tracking-wider">LOW STOCK</Badge>
                      )}
                    </div>

                    {/* Remove from Wishlist */}
                    <motion.button
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-4 right-4 z-30 p-2 bg-red-600 text-white hover:bg-red-700 transition-all duration-300 opacity-0 group-hover:opacity-100"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.button>

                    {/* Dynamic Image */}
                    <Link href={`/product/${product.id}`}>
                      <div className="relative w-full h-80 cursor-pointer">
                        <motion.img
                          src={product.image}
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-cover filter grayscale"
                          initial={{ opacity: 1 }}
                          animate={{ opacity: hoveredProduct === product.id ? 0 : 1 }}
                          transition={{ duration: 0.5 }}
                        />
                        <motion.img
                          src={product.hoverImage}
                          alt={`${product.name} hover`}
                          className="absolute inset-0 w-full h-full object-cover filter grayscale"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredProduct === product.id ? 1 : 0 }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </Link>

                    {/* Stock Status Overlay */}
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                        <Badge className="bg-red-600 text-white text-lg px-4 py-2">OUT OF STOCK</Badge>
                      </div>
                    )}

                    {/* Add to Cart Button */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <Button
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                        className="w-full bg-white text-black hover:bg-black hover:text-white border-2 border-white py-3 font-bold tracking-wider transition-all duration-300 disabled:opacity-50"
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        {product.stock === 0 ? "OUT OF STOCK" : "ADD TO CART"}
                      </Button>
                    </div>
                  </div>

                  <div className="text-center">
                    <Badge className="bg-black text-white mb-2 tracking-wider">{product.category}</Badge>
                    <Link href={`/product/${product.id}`}>
                      <h3 className="text-lg font-bold tracking-wider mb-2 hover:underline cursor-pointer">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <p className="text-xl font-black">${product.price}</p>
                      {product.onSale && product.originalPrice && (
                        <p className="text-sm line-through text-gray-500">${product.originalPrice}</p>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                    <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                      <span>Stock: {product.stock}</span>
                      {product.stock <= 5 && product.stock > 0 && (
                        <span className="text-red-600 font-bold">• Low Stock!</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Continue Shopping */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/shop">
              <Button className="bg-black text-white hover:bg-white hover:text-black border-2 border-black px-8 py-4 text-lg font-bold tracking-wider transition-all duration-300">
                CONTINUE SHOPPING
              </Button>
            </Link>
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
