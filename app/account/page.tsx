"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  User,
  Package,
  Settings,
  CreditCard,
  MapPin,
  Eye,
  RotateCcw,
  Download,
  Trash2,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navigation from "@/components/navigation"
import Link from "next/link"

interface Order {
  id: string
  date: string
  status: "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  items: {
    id: number
    name: string
    image: string
    quantity: number
    price: number
    size?: string
    color?: string
  }[]
  trackingNumber?: string
  estimatedDelivery?: string
  canReturn?: boolean
  canExchange?: boolean
}

interface Address {
  id: string
  type: "shipping" | "billing"
  name: string
  street: string
  city: string
  state: string
  zip: string
  country: string
  isDefault: boolean
}

interface PaymentMethod {
  id: string
  type: "card"
  last4: string
  brand: string
  expiryMonth: number
  expiryYear: number
  isDefault: boolean
}

const mockOrders: Order[] = [
  {
    id: "SM-2024-001",
    date: "2024-01-15",
    status: "delivered",
    total: 460,
    items: [
      {
        id: 1,
        name: "CHAOS OVERSIZED TEE",
        image: "/placeholder.svg?height=100&width=100&text=CHAOS+TEE",
        quantity: 1,
        price: 180,
        size: "L",
        color: "BLACK",
      },
      {
        id: 4,
        name: "SHADOW BOMBER",
        image: "/placeholder.svg?height=100&width=100&text=SHADOW+BOMBER",
        quantity: 1,
        price: 280,
        size: "M",
        color: "BLACK",
      },
    ],
    trackingNumber: "SM1234567890",
    canReturn: true,
    canExchange: true,
  },
  {
    id: "SM-2024-002",
    date: "2024-01-20",
    status: "shipped",
    total: 320,
    items: [
      {
        id: 2,
        name: "VOID CARGO PANTS",
        image: "/placeholder.svg?height=100&width=100&text=VOID+CARGO",
        quantity: 1,
        price: 320,
        size: "L",
        color: "BLACK",
      },
    ],
    trackingNumber: "SM0987654321",
    estimatedDelivery: "2024-01-25",
  },
  {
    id: "SM-2024-003",
    date: "2024-01-22",
    status: "processing",
    total: 400,
    items: [
      {
        id: 3,
        name: "REBELLION HOODIE",
        image: "/placeholder.svg?height=100&width=100&text=REBELLION+HOODIE",
        quantity: 1,
        price: 280,
        size: "XL",
        color: "WHITE",
      },
      {
        id: 5,
        name: "MAYHEM TANK",
        image: "/placeholder.svg?height=100&width=100&text=MAYHEM+TANK",
        quantity: 1,
        price: 120,
        size: "L",
        color: "BLACK",
      },
    ],
  },
]

const mockAddresses: Address[] = [
  {
    id: "1",
    type: "shipping",
    name: "John Rebel",
    street: "123 Chaos Street",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA",
    isDefault: true,
  },
  {
    id: "2",
    type: "billing",
    name: "John Rebel",
    street: "456 Mayhem Avenue",
    city: "Los Angeles",
    state: "CA",
    zip: "90210",
    country: "USA",
    isDefault: false,
  },
]

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "1",
    type: "card",
    last4: "4242",
    brand: "Visa",
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true,
  },
  {
    id: "2",
    type: "card",
    last4: "5555",
    brand: "Mastercard",
    expiryMonth: 8,
    expiryYear: 2026,
    isDefault: false,
  },
]

export default function AccountPage() {
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState<number[]>([])
  const [orders] = useState<Order[]>(mockOrders)
  const [addresses] = useState<Address[]>(mockAddresses)
  const [paymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods)
  const [activeTab, setActiveTab] = useState("orders")

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

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleReturn = (orderId: string) => {
    alert(`Return initiated for order ${orderId}. You will receive an email with return instructions.`)
  }

  const handleExchange = (orderId: string) => {
    alert(`Exchange initiated for order ${orderId}. You will receive an email with exchange instructions.`)
  }

  const handleTrackOrder = (trackingNumber: string) => {
    alert(`Tracking order with number: ${trackingNumber}`)
  }

  const cartItemCount = Array.isArray(cart) ? cart.reduce((sum: number, item: any) => sum + item.quantity, 0) : 0

  return (
    <div className="bg-white text-black min-h-screen">
      <Navigation cartItemCount={cartItemCount} wishlistCount={wishlist.length} onCartOpen={() => { }} />

      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <h1 className="text-4xl md:text-5xl font-black tracking-wider mb-8">MY ACCOUNT</h1>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="orders" className="flex items-center space-x-2">
                <Package className="w-4 h-4" />
                <span>Orders</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="addresses" className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Addresses</span>
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4" />
                <span>Payment</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Security</span>
              </TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black tracking-wider">ORDER HISTORY</h2>
                <Badge className="bg-black text-white">{orders.length} Orders</Badge>
              </div>

              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  className="border-2 border-black p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold tracking-wider">Order #{order.id}</h3>
                      <p className="text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(order.status)}>{order.status.toUpperCase()}</Badge>
                      <p className="text-xl font-black mt-2">${order.total}</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    {order.items.map((item) => (
                      <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center space-x-3">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover filter"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-600">
                            {item.size && `Size: ${item.size}`}
                            {item.color && ` | Color: ${item.color}`}
                          </p>
                          <p className="text-xs">
                            Qty: {item.quantity} | ${item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Actions */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                    {order.trackingNumber && (
                      <Button
                        onClick={() => handleTrackOrder(order.trackingNumber!)}
                        className="bg-white text-black border-2 border-black hover:bg-black hover:text-white"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Track Order
                      </Button>
                    )}

                    {order.canReturn && (
                      <Button
                        onClick={() => handleReturn(order.id)}
                        className="bg-white text-black border-2 border-black hover:bg-black hover:text-white"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Return Items
                      </Button>
                    )}

                    {order.canExchange && (
                      <Button
                        onClick={() => handleExchange(order.id)}
                        className="bg-white text-black border-2 border-black hover:bg-black hover:text-white"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Exchange Items
                      </Button>
                    )}

                    <Link href={`/product/${order.items[0].id}`}>
                      <Button className="bg-black text-white hover:bg-white hover:text-black border-2 border-black">
                        Buy Again
                      </Button>
                    </Link>
                  </div>

                  {order.estimatedDelivery && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                      <p className="text-sm text-blue-800">
                        Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <h2 className="text-2xl font-black tracking-wider">PROFILE INFORMATION</h2>

              <motion.div
                className="border-2 border-black p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold tracking-wider mb-2">FIRST NAME</label>
                    <Input defaultValue="John" className="border-black focus:border-black" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold tracking-wider mb-2">LAST NAME</label>
                    <Input defaultValue="Rebel" className="border-black focus:border-black" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold tracking-wider mb-2">EMAIL</label>
                    <Input defaultValue="john.rebel@email.com" className="border-black focus:border-black" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold tracking-wider mb-2">PHONE</label>
                    <Input defaultValue="+1 (555) 123-4567" className="border-black focus:border-black" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold tracking-wider mb-2">DATE OF BIRTH</label>
                    <Input type="date" defaultValue="1990-01-01" className="border-black focus:border-black" />
                  </div>
                </div>

                <Button className="mt-6 bg-black text-white hover:bg-white hover:text-black border-2 border-black">
                  UPDATE PROFILE
                </Button>
              </motion.div>
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black tracking-wider">ADDRESSES</h2>
                <Button className="bg-black text-white hover:bg-white hover:text-black border-2 border-black">
                  ADD NEW ADDRESS
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((address) => (
                  <motion.div
                    key={address.id}
                    className="border-2 border-black p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <Badge
                          className={
                            address.type === "shipping" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                          }
                        >
                          {address.type.toUpperCase()}
                        </Badge>
                        {address.isDefault && <Badge className="bg-black text-white ml-2">DEFAULT</Badge>}
                      </div>
                    </div>

                    <div className="space-y-1 text-sm">
                      <p className="font-bold">{address.name}</p>
                      <p>{address.street}</p>
                      <p>
                        {address.city}, {address.state} {address.zip}
                      </p>
                      <p>{address.country}</p>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <Button
                        size="sm"
                        className="bg-white text-black border border-black hover:bg-black hover:text-white"
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        className="bg-white text-black border border-black hover:bg-black hover:text-white"
                      >
                        Delete
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Payment Tab */}
            <TabsContent value="payment" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black tracking-wider">PAYMENT METHODS</h2>
                <Button className="bg-black text-white hover:bg-white hover:text-black border-2 border-black">
                  ADD NEW CARD
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paymentMethods.map((method) => (
                  <motion.div
                    key={method.id}
                    className="border-2 border-black p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-8 h-8" />
                        <div>
                          <p className="font-bold">
                            {method.brand} •••• {method.last4}
                          </p>
                          <p className="text-sm text-gray-600">
                            Expires {method.expiryMonth.toString().padStart(2, "0")}/{method.expiryYear}
                          </p>
                        </div>
                      </div>
                      {method.isDefault && <Badge className="bg-black text-white">DEFAULT</Badge>}
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="bg-white text-black border border-black hover:bg-black hover:text-white"
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        className="bg-white text-black border border-black hover:bg-black hover:text-white"
                      >
                        Delete
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <h2 className="text-2xl font-black tracking-wider">SECURITY SETTINGS</h2>

              <motion.div
                className="border-2 border-black p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-bold tracking-wider mb-4">CHANGE PASSWORD</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold tracking-wider mb-2">CURRENT PASSWORD</label>
                    <Input type="password" className="border-black focus:border-black" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold tracking-wider mb-2">NEW PASSWORD</label>
                    <Input type="password" className="border-black focus:border-black" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold tracking-wider mb-2">CONFIRM NEW PASSWORD</label>
                    <Input type="password" className="border-black focus:border-black" />
                  </div>
                  <Button className="bg-black text-white hover:bg-white hover:text-black border-2 border-black">
                    <Lock className="w-4 h-4 mr-2" />
                    UPDATE PASSWORD
                  </Button>
                </div>
              </motion.div>

              <motion.div
                className="border-2 border-black p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-xl font-bold tracking-wider mb-4">DATA & PRIVACY</h3>
                <div className="space-y-4">
                  <Button className="bg-white text-black border-2 border-black hover:bg-black hover:text-white">
                    <Download className="w-4 h-4 mr-2" />
                    DOWNLOAD MY DATA
                  </Button>
                  <Button className="bg-red-600 text-white border-2 border-red-600 hover:bg-white hover:text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
                    DELETE ACCOUNT
                  </Button>
                  <p className="text-sm text-gray-600">
                    Deleting your account will permanently remove all your data and cannot be undone.
                  </p>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
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
