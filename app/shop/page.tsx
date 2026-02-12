"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Heart, ShoppingBag, Grid, List, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Navigation from "@/components/navigation"
import Link from "next/link"

import { useQuery } from "@tanstack/react-query"
import { getProducts } from "@/lib/products"
import { toast } from "sonner"

interface Product {
  id: string
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
  isSoldOut: boolean
}

interface CartItem extends Product {
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

export default function ShopPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL")
  const [sortBy, setSortBy] = useState<string>("newest")
  // const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  const { data: fetchedProducts = [] } = useQuery({
    queryKey: ['shop-products'],
    queryFn: getProducts
  });

  // Use useMemo to prevent recalculation on every render
  const products: Product[] = useMemo(() => fetchedProducts.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price || 0,
    image: p.image_url || "/placeholder.svg",
    hoverImage: p.image_url || "/placeholder.svg",
    category: "EXCLUSIVE",
    description: p.description,
    sizes: ["S", "M", "L", "XL"],
    colors: ["BLACK", "WHITE"],
    isNew: new Date(p.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    stock: p.stockQuantity || 0,
    isSoldOut: p.is_sold_out || false,
    onSale: false,
    originalPrice: undefined
  })), [fetchedProducts]);

  const [isInitialLoad, setIsInitialLoad] = useState(true)

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
    setIsInitialLoad(false)
  }, [])

  // Save cart to localStorage
  useEffect(() => {
    if (!isInitialLoad) {
      localStorage.setItem("sacred-mayhem-cart", JSON.stringify(cart))
    }
  }, [cart, isInitialLoad])

  // Save wishlist to localStorage
  useEffect(() => {
    if (!isInitialLoad) {
      localStorage.setItem("sacred-mayhem-wishlist", JSON.stringify(wishlist))
    }
  }, [wishlist, isInitialLoad])

  // Filter and sort products
  // useEffect(() => {
  //   let filtered = [...products]

  //   // Filter by search
  //   if (searchTerm) {
  //     filtered = filtered.filter((product) =>
  //       product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       product.description.toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  //   }

  //   // Filter by category
  //   if (selectedCategory !== "ALL") {
  //     filtered = filtered.filter((product) => product.category === selectedCategory)
  //   }

  //   // Sort products
  //   switch (sortBy) {
  //     case "price-low":
  //       filtered.sort((a, b) => a.price - b.price)
  //       break
  //     case "price-high":
  //       filtered.sort((a, b) => b.price - a.price)
  //       break
  //     case "name":
  //       filtered.sort((a, b) => a.name.localeCompare(b.name))
  //       break
  //     case "newest":
  //     default:
  //       filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
  //       break
  //   }

  //   setFilteredProducts(filtered)
  // }, [searchTerm, selectedCategory, sortBy, products])

  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== "ALL") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      )
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "newest":
      default:
        filtered.sort(
          (a, b) => Number(b.isNew) - Number(a.isNew)
        )
        break
    }

    return filtered
  }, [products, searchTerm, selectedCategory, sortBy])


  const addToCart = (product: Product, selectedSize?: string, selectedColor?: string) => {
    const size = selectedSize || product.sizes[0]
    const color = selectedColor || product.colors[0]

    setCart((prev) => {
      const existingItem = prev.find(
        (item) => item.id === product.id && item.selectedSize === size && item.selectedColor === color,
      )

      if (existingItem) {
        if (existingItem.quantity < product.stock) {
          toast.success(`Updated ${product.name} quantity in cart`)
          return prev.map((item) =>
            item.id === product.id && item.selectedSize === size && item.selectedColor === color
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        }
        toast.error("Reached stock limit")
        return prev
      }

      toast.success(`Added ${product.name} to cart`)
      return [
        ...prev,
        {
          ...product,
          quantity: 1,
          selectedSize: size,
          selectedColor: color,
        },
      ]
    })
  }

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const isInWishlist = prev.includes(productId)
      if (isInWishlist) {
        toast.success("Removed from wishlist")
        return prev.filter((id) => id !== productId)
      } else {
        toast.success("Added to wishlist")
        return [...prev, productId]
      }
    })
  }

  const categories = ["ALL", ...Array.from(new Set(products.map((p) => p.category)))]
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="bg-white text-black min-h-screen">
      <Navigation cartItemCount={cartItemCount} wishlistCount={wishlist.length} onCartOpen={() => { }} />

      <div className="pt-16">
        {/* Header */}
        <div className="bg-black text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/">
              <motion.div
                className="flex items-center space-x-2 mb-8 cursor-pointer hover:underline"
                whileHover={{ x: -5 }}
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-bold tracking-wider">BACK TO HOME</span>
              </motion.div>
            </Link>

            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">SHOP</h1>
              <p className="text-xl tracking-widest">EMBRACE THE CHAOS</p>
            </motion.div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white border-b border-black py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-black focus:border-black"
                />
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40 border-black">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 border-black">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className="flex border border-black rounded">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none border-r border-black"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl font-light tracking-wider">No products found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("ALL")
                }}
                className="mt-4 bg-black text-white hover:bg-white hover:text-black border-2 border-black"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                  : "space-y-8"
              }
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  className={viewMode === "grid" ? "relative" : "flex space-x-6 border-b border-gray-200 pb-8"}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {viewMode === "grid" ? (
                    // Grid View
                    <>
                      <div className="relative overflow-hidden bg-black mb-4">
                        {/* Badges */}
                        <div className="absolute top-4 left-4 z-20 space-y-2">
                          {product.isNew && <Badge className="bg-white text-black font-bold tracking-wider">NEW</Badge>}
                          {product.onSale && (
                            <Badge className="bg-black text-white border-2 border-white font-bold tracking-wider">
                              SALE
                            </Badge>
                          )}
                          {product.stock <= 5 && product.stock > 0 && (
                            <Badge className="bg-red-600 text-white font-bold tracking-wider">LOW STOCK</Badge>
                          )}
                          {product.isSoldOut && (
                            <Badge className="bg-black text-white border-2 border-white font-bold tracking-wider">SOLD OUT</Badge>
                          )}
                        </div>

                        {/* Wishlist Button */}
                        <motion.button
                          onClick={() => toggleWishlist(product.id)}
                          className="absolute top-4 right-4 z-20 p-2 bg-white text-black hover:bg-black hover:text-white transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? "fill-current" : ""}`} />
                        </motion.button>

                        {/* Dynamic Image */}
                        <Link href={`/product/${product.id}`}>
                          <div className="relative w-full h-80 cursor-pointer">
                            <img
                              src={product.image}
                              alt={product.name}
                              className={`absolute inset-0 w-full h-full object-cover filter  transition-opacity duration-500 ease-in-out ${hoveredProduct === product.id ? "opacity-0" : "opacity-100"
                                }`}
                            />
                            <img
                              src={product.hoverImage}
                              alt={`${product.name} hover`}
                              className={`absolute inset-0 w-full h-full object-cover filter  transition-opacity duration-500 ease-in-out ${hoveredProduct === product.id ? "opacity-100" : "opacity-0"
                                }`}
                            />
                            {/* Sold Out Overlay */}
                            {product.isSoldOut && (
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 transition-opacity duration-500">
                                <span className="text-white font-black text-xl tracking-tighter border-2 border-white px-4 py-2 transform -rotate-12">SOLD OUT</span>
                              </div>
                            )}
                          </div>
                        </Link>

                        {/* Stable Add to Cart Button */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <Button
                            onClick={() => addToCart(product)}
                            disabled={product.isSoldOut || (product.stock === 0)}
                            className={`w-full bg-white text-black hover:bg-black hover:text-white border-2 border-white py-3 font-bold tracking-wider transition-all duration-300 disabled:opacity-50 ${hoveredProduct === product.id
                              ? "translate-y-0 opacity-100"
                              : "translate-y-4 opacity-0"
                              }`}
                          >
                            <ShoppingBag className="w-4 h-4 mr-2" />
                            {product.isSoldOut || product.stock === 0 ? "OUT OF STOCK" : "ADD TO CART"}
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
                        <p className="text-xs text-gray-500">Stock: {product.stock}</p>
                      </div>
                    </>
                  ) : (
                    // List View
                    <>
                      <div className="flex-shrink-0 w-48">
                        <div className="relative overflow-hidden bg-black">
                          {/* Badges */}
                          <div className="absolute top-2 left-2 z-20 space-y-1">
                            {product.isNew && <Badge className="bg-white text-black font-bold text-xs">NEW</Badge>}
                            {product.isSoldOut && (
                              <Badge className="bg-black text-white border border-white font-bold text-xs uppercase">SOLD OUT</Badge>
                            )}
                          </div>

                          <Link href={`/product/${product.id}`}>
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-48 object-cover filter grayscale cursor-pointer hover:scale-105 transition-transform duration-300"
                            />
                          </Link>
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <Badge className="bg-black text-white mb-2 text-xs">{product.category}</Badge>
                            <Link href={`/product/${product.id}`}>
                              <h3 className="text-xl font-bold tracking-wider hover:underline cursor-pointer">
                                {product.name}
                              </h3>
                            </Link>
                          </div>
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className="p-2 hover:bg-gray-100 rounded transition-colors"
                          >
                            <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? "fill-current" : ""}`} />
                          </button>
                        </div>

                        <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <p className="text-2xl font-black">${product.price}</p>
                            {product.onSale && product.originalPrice && (
                              <p className="text-lg line-through text-gray-500">${product.originalPrice}</p>
                            )}
                          </div>

                          <div className="flex items-center space-x-4">
                            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                            <Button
                              onClick={() => addToCart(product)}
                              disabled={product.isSoldOut || product.stock === 0}
                              className="bg-black text-white hover:bg-white hover:text-black border-2 border-black px-6 py-2 font-bold tracking-wider transition-all duration-300 disabled:opacity-50"
                            >
                              <ShoppingBag className="w-4 h-4 mr-2" />
                              {product.isSoldOut || product.stock === 0 ? "OUT OF STOCK" : "ADD TO CART"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>

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
    </div>
  )
}