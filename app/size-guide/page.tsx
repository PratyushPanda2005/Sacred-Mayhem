"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Ruler } from "lucide-react"
import Navigation from "@/components/navigation"
import Link from "next/link"

const sizeCharts = {
  tshirts: {
    title: "T-SHIRTS",
    headers: ["SIZE", "LENGTH", "SHOULDER", "CHEST", "SLEEVE LENGTH", "SLEEVE OPENING", "ARMHOLE"],
    rows: [
      ["M", '27.5"', '22"', '48"', '12"', '16"', '23"'],
      ["L", '28.5"', '23"', '50"', '12.5"', '16.5"', '24"'],
    ],
  },
  shirts: {
    title: "SHIRTS",
    headers: ["SIZE", "LENGTH", "SHOULDER", "CHEST", "SLEEVE LENGTH", "SLEEVE OPENING", "ARMHOLE"],
    rows: [
      ["S", '25.5"', '21"', '44"', '11.5"', '22"', '22"'],
      ["M", '26.5"', '22"', '46"', '12"', '23"', '23"'],
      ["L", '27.5"', '23"', '48"', '12.5"', '24"', '24"'],
      ["XL", '28.5"', '24"', '50"', '13"', '25"', '25"'],
      ["XXL", '29.5"', '25"', '52"', '13.5"', '26"', '26"'],
    ],
  },
}

export default function SizeGuidePage() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Navigation />

      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <Ruler className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">SIZE GUIDE</h1>
            <p className="text-xl tracking-widest">FIND YOUR PERFECT FIT</p>
          </motion.div>

          {/* How to Measure */}
          <motion.div
            className="bg-black text-white p-8 mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-black tracking-wider mb-8 text-center">HOW TO MEASURE</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-lg font-bold tracking-wider mb-4">CHEST</h3>
                <p className="text-sm leading-relaxed">
                  Measure around the fullest part of your chest, keeping the tape horizontal and close to your body.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold tracking-wider mb-4">LENGTH</h3>
                <p className="text-sm leading-relaxed">
                  Measure from the highest point of the shoulder to the bottom hem of the garment.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold tracking-wider mb-4">SHOULDER</h3>
                <p className="text-sm leading-relaxed">
                  Measure from one shoulder point to the other across the natural curve of your upper back.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold tracking-wider mb-4">SLEEVE LENGTH</h3>
                <p className="text-sm leading-relaxed">
                  Measure from the shoulder seam down to the end of the sleeve.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold tracking-wider mb-4">ARMHOLE</h3>
                <p className="text-sm leading-relaxed">
                  Measure the circumference of the sleeve where it attaches to the body of the garment.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold tracking-wider mb-4">SLEEVE OPENING</h3>
                <p className="text-sm leading-relaxed">
                  Measure the width of the sleeve at its bottom opening.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Size Charts */}
          <div className="space-y-16">
            {Object.entries(sizeCharts).map(([key, chart], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
              >
                <h2 className="text-3xl font-black tracking-wider mb-8 text-center">{chart.title}</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-2 border-black">
                    <thead>
                      <tr className="bg-black text-white">
                        {chart.headers.map((header) => (
                          <th key={header} className="p-4 text-left font-bold tracking-wider">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {chart.rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b border-black">
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className={`p-4 ${cellIndex === 0 ? "font-bold tracking-wider" : ""}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Fit Guide */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <h2 className="text-3xl font-black tracking-wider mb-8 text-center">FIT GUIDE</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-bold tracking-wider mb-4">OVERSIZED FIT</h3>
                <p className="leading-relaxed">
                  Our signature oversized pieces are designed to be loose and comfortable. Size down for a more fitted
                  look.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold tracking-wider mb-4">REGULAR FIT</h3>
                <p className="leading-relaxed">
                  True to size with a comfortable fit. Follow the size chart for the best fit.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold tracking-wider mb-4">SLIM FIT</h3>
                <p className="leading-relaxed">
                  Tailored for a closer fit to the body. Consider sizing up if you prefer more room.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <h2 className="text-2xl font-black tracking-wider mb-4">STILL NEED HELP?</h2>
            <p className="text-lg mb-6">Our customer service team is here to help you find the perfect fit.</p>
            <Link href="/contact">
              <motion.button
                className="bg-black text-white hover:bg-white hover:text-black border-2 border-black px-8 py-4 text-lg font-bold tracking-wider transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                CONTACT US
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
