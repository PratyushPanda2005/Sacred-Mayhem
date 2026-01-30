"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Users, Target, Award, Linkedin, Twitter, Instagram, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import Link from "next/link"

const stats = [
  { number: 50000, label: "REBELS WORLDWIDE", suffix: "+" },
  { number: 2019, label: "FOUNDED", suffix: "" },
  { number: 100, label: "UNIQUE DESIGNS", suffix: "+" },
  { number: 25, label: "COUNTRIES", suffix: "+" },
]

const values = [
  {
    icon: Users,
    title: "COMMUNITY",
    description: "Building a global community of rebels who dare to be different and express their authentic selves.",
  },
  {
    icon: Target,
    title: "AUTHENTICITY",
    description: "Every piece tells a story of rebellion, crafted with genuine passion and uncompromising quality.",
  },
  {
    icon: Award,
    title: "EXCELLENCE",
    description: "Premium materials, innovative designs, and meticulous attention to detail in every creation.",
  },
]

const teamMember = {
  name: "SIDDARTH MUKERJI",
  role: "FOUNDER & CEO",
  image: "/placeholder.svg?height=400&width=400&text=SIDDARTH+MUKERJI",
  bio: "Visionary entrepreneur and creative director behind Sacred Mayhem. With over a decade of experience in luxury fashion and streetwear, Siddarth founded Sacred Mayhem to bridge the gap between high-end fashion and authentic street culture. His rebellious spirit and commitment to quality have made Sacred Mayhem a global phenomenon.",
  achievements: [
    "Former Creative Director at luxury fashion houses",
    "Featured in Vogue, GQ, and Hypebeast",
    "Winner of Fashion Innovator Award 2023",
    "Advocate for sustainable fashion practices",
  ],
  social: {
    linkedin: "#",
    twitter: "#",
    instagram: "#",
    email: "siddarth@sacredmayhem.com",
  },
}

export default function AboutPage() {
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0))

  useEffect(() => {
    const timers = stats.map((stat, index) => {
      return setTimeout(() => {
        const duration = 2000
        const steps = 60
        const increment = stat.number / steps
        let current = 0

        const counter = setInterval(() => {
          current += increment
          if (current >= stat.number) {
            current = stat.number
            clearInterval(counter)
          }
          setAnimatedStats((prev) => {
            const newStats = [...prev]
            newStats[index] = Math.floor(current)
            return newStats
          })
        }, duration / steps)
      }, index * 200)
    })

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="bg-white text-black min-h-screen">
      <Navigation />

      <div className="pt-16">
        {/* Hero Section with Same Animation */}
        <section className="relative h-screen flex items-center justify-center bg-black text-white overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ transformOrigin: "left" }}
          />

          <motion.div
            className="relative z-10 text-center max-w-4xl mx-auto px-4"
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
                OUR
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
                STORY
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl font-light tracking-widest mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
            >
              WHERE REBELLION MEETS LUXURY
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 0.8 }}
            >
              <Link href="/">
                <motion.div
                  className="flex items-center space-x-2 mb-8 cursor-pointer hover:underline justify-center"
                  whileHover={{ x: -5 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-bold tracking-wider">BACK TO HOME</span>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Brand Story */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-8">THE SACRED MAYHEM STORY</h2>
              <div className="space-y-8 text-lg leading-relaxed">
                <p>
                  Born from the streets and elevated to luxury, Sacred Mayhem represents the intersection of rebellion
                  and refinement. We believe that true style comes from authentic self-expression, not conformity to
                  trends.
                </p>
                <p>
                  Our journey began in 2019 with a simple mission: to create premium streetwear that speaks to the
                  rebels, the dreamers, and the ones who dare to be different. Every piece in our collection is
                  meticulously crafted to embody the spirit of controlled chaos—where precision meets rebellion.
                </p>
                <p>
                  From our signature oversized silhouettes to our bold graphic statements, Sacred Mayhem isn't just
                  clothing—it's armor for the modern rebel. We source only the finest materials and work with skilled
                  artisans who share our commitment to excellence.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">BY THE NUMBERS</h2>
              <p className="text-xl tracking-widest">OUR IMPACT WORLDWIDE</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl md:text-6xl font-black mb-4">
                    {animatedStats[index].toLocaleString()}
                    {stat.suffix}
                  </div>
                  <div className="text-sm tracking-widest">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">OUR VALUES</h2>
              <p className="text-xl tracking-widest">WHAT DRIVES US FORWARD</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-6">
                    <value.icon className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-2xl font-black tracking-wider mb-4">{value.title}</h3>
                  <p className="text-lg leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">MEET THE TEAM</h2>
              <p className="text-xl tracking-widest">THE VISIONARIES BEHIND THE REBELLION</p>
            </motion.div>

            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="mb-6">
                    <h3 className="text-4xl font-black tracking-tighter mb-2">{teamMember.name}</h3>
                    <p className="text-xl tracking-widest text-gray-300">{teamMember.role}</p>
                  </div>

                  <p className="text-lg leading-relaxed mb-8">{teamMember.bio}</p>

                  <div className="mb-8">
                    <h4 className="text-xl font-bold tracking-wider mb-4">KEY ACHIEVEMENTS</h4>
                    <ul className="space-y-2">
                      {teamMember.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <span className="w-2 h-2 bg-white mt-3 flex-shrink-0"></span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex space-x-4">
                    <a
                      href={teamMember.social.linkedin}
                      className="p-3 bg-white text-black hover:bg-gray-200 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={teamMember.social.twitter}
                      className="p-3 bg-white text-black hover:bg-gray-200 transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a
                      href={teamMember.social.instagram}
                      className="p-3 bg-white text-black hover:bg-gray-200 transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href={`mailto:${teamMember.social.email}`}
                      className="p-3 bg-white text-black hover:bg-gray-200 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                <div className="order-1 lg:order-2">
                  <div className="relative">
                    <img
                      src={teamMember.image || "/placeholder.svg"}
                      alt={teamMember.name}
                      className="w-full h-96 object-cover filter grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-8">OUR MISSION</h2>
              <p className="text-2xl leading-relaxed mb-12">
                "To empower individuals to express their authentic selves through premium streetwear that challenges
                conventions and celebrates the beautiful chaos of human creativity."
              </p>
              <Link href="/shop">
                <Button className="bg-black text-white hover:bg-white hover:text-black border-2 border-black px-8 py-4 text-lg font-bold tracking-wider transition-all duration-300">
                  JOIN THE REBELLION
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
