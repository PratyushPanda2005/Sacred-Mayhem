"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"

import { getCollectionById } from "@/lib/collections"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"

interface LookbookDetailProps {
  collectionId: string
}

export function LookbookDetail({ collectionId }: LookbookDetailProps) {
  const { data: collection, isLoading } = useQuery({
    queryKey: ["collection", collectionId],
    queryFn: () => getCollectionById(collectionId),
  })

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
      </div>
    )
  }

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center mx-4 lg:mx-8">
        <h1 className="text-3xl font-black uppercase tracking-wider">Collection Not Found</h1>
      </div>
    )
  }

  // Use gallery from DB or generate placeholders for demonstration if empty
  const galleryImages = (collection.gallery && collection.gallery.length > 0)
    ? collection.gallery
    : Array.from({ length: 25 }).map((_, i) => `/placeholder.svg?height=1080&width=1920&text=${collection.title}+Gallery+${i + 1}`)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <div className="min-h-screen pt-16 lg:pt-20 mx-4 lg:mx-8 xl:mx-12">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-black text-white overflow-hidden rounded-lg">
        <Image
          src={galleryImages[currentImageIndex] || collection.image_url || "/placeholder.svg"}
          alt={collection.title}
          fill
          className="object-cover transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <ScrollReveal direction="up" delay={200}>
              <h1 className="mb-4 text-4xl font-black uppercase tracking-wider md:text-6xl lg:text-8xl">
                {collection.title}
              </h1>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={400}>
              <p className="text-lg uppercase tracking-wide md:text-xl lg:text-2xl">{collection.season}</p>
            </ScrollReveal>
          </div>
        </div>

        {/* Image Navigation */}
        {galleryImages.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 z-20 backdrop-blur-md"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 z-20 backdrop-blur-md"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Collection Description */}
        <ScrollReveal direction="up">
          <div className="mb-16 max-w-4xl mx-auto text-center">
            <h2 className="text-sm font-bold tracking-[0.3em] text-gray-400 mb-6 uppercase">The Story</h2>
            <p className="text-2xl font-light leading-relaxed text-gray-800 italic">{collection.description}</p>
          </div>
        </ScrollReveal>

        {/* Masonry-style Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img, index) => (
            <ScrollReveal key={index} direction="up" delay={(index % 3) * 100}>
              <div className={`relative overflow-hidden rounded-lg bg-gray-100 group cursor-pointer ${index % 5 === 0 ? "md:col-span-2 aspect-video" : "aspect-[3/4]"
                }`}>
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`${collection.title} gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Related Products Placeholder / Section */}
        <section className="mt-24">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black uppercase tracking-wider mb-2">Shop the Collection</h2>
              <div className="w-20 h-1 bg-black mx-auto" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-lg">
              <p className="text-gray-400 font-bold tracking-widest uppercase">Coming Soon</p>
            </div>
            <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-lg">
              <p className="text-gray-400 font-bold tracking-widest uppercase">Coming Soon</p>
            </div>
            <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-lg">
              <p className="text-gray-400 font-bold tracking-widest uppercase">Coming Soon</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <ScrollReveal direction="up" delay={400}>
          <div className="mt-24 text-center py-20 bg-gray-50 rounded-2xl">
            <h2 className="mb-8 text-4xl font-black uppercase tracking-tighter md:text-5xl">Explore Other Worlds</h2>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-black px-12 py-8 text-xl font-black uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all duration-500 bg-transparent rounded-none"
            >
              <Link href="/lookbook">Back to Collections</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}