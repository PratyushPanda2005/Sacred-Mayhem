"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Navigation from "@/components/navigation"
import Link from "next/link"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic
    console.log("Login:", formData)
  }

  return (
    <div className="bg-white text-black min-h-screen">
      <Navigation />

      <div className="pt-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-black tracking-tighter mb-4">SIGN IN</h1>
            <p className="text-lg tracking-wider">WELCOME BACK TO THE MAYHEM</p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <Label htmlFor="email" className="font-bold tracking-wider">
                EMAIL
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border-2 border-black focus:ring-0 focus:border-black mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="font-bold tracking-wider">
                PASSWORD
              </Label>
              <div className="relative mt-2">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="border-2 border-black focus:ring-0 focus:border-black pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:bg-black hover:text-white p-1 transition-all duration-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 border-2 border-black" />
                <span className="text-sm">Remember me</span>
              </label>
              <Link href="/forgot-password">
                <span className="text-sm underline cursor-pointer hover:no-underline">Forgot password?</span>
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black py-4 text-lg font-bold tracking-wider transition-all duration-300"
            >
              SIGN IN
            </Button>
          </motion.form>

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-lg">
              {"Don't have an account? "}
              <Link href="/signup">
                <span className="font-bold underline cursor-pointer hover:no-underline">SIGN UP</span>
              </Link>
            </p>
          </motion.div>

          <motion.div
            className="border-t border-black mt-12 pt-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="space-y-4">
              <Button className="w-full bg-white text-black border-2 border-black hover:bg-black hover:text-white py-4 font-bold tracking-wider transition-all duration-300">
                CONTINUE WITH GOOGLE
              </Button>
              <Button className="w-full bg-white text-black border-2 border-black hover:bg-black hover:text-white py-4 font-bold tracking-wider transition-all duration-300">
                CONTINUE WITH APPLE
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
