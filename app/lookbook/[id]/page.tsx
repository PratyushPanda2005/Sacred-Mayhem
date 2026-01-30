
import Navigation from "@/components/navigation"
import { LookbookDetail } from "@/components/lookbook-detail"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const lookbookCollections = [
  {
    id: "1",
    title: "URBAN MINIMALISM",
    subtitle: "Fall/Winter 2024",
    description:
      "Where concrete meets couture. A study in architectural fashion, blending harsh urban landscapes with refined, minimalist silhouettes. This collection explores the beauty in stark contrasts and the power of understated elegance.",
    images: [
      "/placeholder.svg?height=1080&width=1920&text=Urban+Minimalism+1",
      "/placeholder.svg?height=1080&width=1920&text=Urban+Minimalism+2",
      "/placeholder.svg?height=1080&width=1920&text=Urban+Minimalism+3",
    ],
    relatedProducts: [],
  },
  {
    id: "2",
    title: "STREET ELEGANCE",
    subtitle: "Capsule Collection",
    description:
      "Refined rebellion. Luxury meets the underground. This capsule collection redefines street style with elevated fabrics and sophisticated cuts, proving that comfort and high fashion can coexist.",
    images: [
      "/placeholder.svg?height=1080&width=1920&text=Street+Elegance+1",
      "/placeholder.svg?height=1080&width=1920&text=Street+Elegance+2",
    ],
    relatedProducts: [],
  },
  {
    id: "3",
    title: "MONOCHROME DREAMS",
    subtitle: "Editorial Series",
    description:
      "Black and white. Nothing more, nothing less. An editorial series that celebrates the timeless power of monochrome, showcasing how depth and emotion can be conveyed through the absence of color.",
    images: [
      "/placeholder.svg?height=1080&width=1920&text=Monochrome+Dreams+1",
      "/placeholder.svg?height=1080&width=1920&text=Monochrome+Dreams+2",
      "/placeholder.svg?height=1080&width=1920&text=Monochrome+Dreams+3",
      "/placeholder.svg?height=1080&width=1920&text=Monochrome+Dreams+4",
    ],
    relatedProducts: [],
  },
  {
    id: "4",
    title: "UNDERGROUND CULTURE",
    subtitle: "Collaboration",
    description:
      "Born from the streets, elevated to art. A unique collaboration that fuses raw street energy with high-end design, creating pieces that are both authentic and luxurious.",
    images: [
      "/placeholder.svg?height=1080&width=1920&text=Underground+Culture+1",
      "/placeholder.svg?height=1080&width=1920&text=Underground+Culture+2",
    ],
    relatedProducts: [],
  },
  {
    id: "5",
    title: "MIDNIGHT SESSIONS",
    subtitle: "Behind the Scenes",
    description:
      "The creative process unveiled. A rare glimpse into the late-night sessions and meticulous craftsmanship that go into every BLVCK collection, revealing the passion behind the brand.",
    images: [
      "/placeholder.svg?height=1080&width=1920&text=Midnight+Sessions+1",
      "/placeholder.svg?height=1080&width=1920&text=Midnight+Sessions+2",
    ],
    relatedProducts: [],
  },
  {
    id: "6",
    title: "FUTURE NOIR",
    subtitle: "Spring/Summer 2025",
    description:
      "Tomorrow's darkness, today's vision. This collection anticipates future trends, blending dystopian aesthetics with sleek, functional designs for the modern urban explorer.",
    images: [
      "/placeholder.svg?height=1080&width=1920&text=Future+Noir+1",
      "/placeholder.svg?height=1080&width=1920&text=Future+Noir+2",
      "/placeholder.svg?height=1080&width=1920&text=Future+Noir+3",
    ],
    relatedProducts: [],
  },
]

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const collection = lookbookCollections.find((col) => col.id === params.id)

  if (!collection) {
    return {
      title: "Lookbook Collection Not Found - Sacred Mayhem",
      description: "The requested lookbook collection could not be found.",
    }
  }

  return {
    title: `${collection.title} - Sacred Mayhem Lookbook`,
    description: collection.description,
    keywords: [`${collection.title}`, "Sacred Mayhem Lookbook", "fashion collection", "editorial", "campaign"],
    openGraph: {
      title: `${collection.title} - Sacred Mayhem Lookbook`,
      description: collection.description,
      url: `https://www.sacredmayhem.com/lookbook/${params.id}`,
      images: [
        {
          url: collection.images[0],
          width: 1920,
          height: 1080,
          alt: `${collection.title} campaign image`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${collection.title} - Sacred Mayhem Lookbook`,
      description: collection.description,
      images: [collection.images[0]],
    },
  }
}

export default function LookbookDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="bg-white text-black min-h-screen">
        <Navigation />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
            <Link href="/shop">
              <div className="flex items-center space-x-2 cursor-pointer hover:underline transition-transform duration-300 hover:-translate-x-1">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-bold tracking-wider">BACK TO SHOP</span>
              </div>
            </Link>
          </div>
        </div>
        <LookbookDetail collectionId={params.id} />
        {/* Footer */}
        <footer className="bg-white border-t border-black py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-2xl font-black tracking-wider mb-4">SACRED MAYHEM</h3>
                <p className="tracking-wide">Luxury streetwear for the rebellious soul.</p>
              </div>
              <div>
                <h4 className="font-bold tracking-wider mb-4">SHOP</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/new-arrivals" className="hover:underline">
                      New Arrivals
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop" className="hover:underline">
                      All Products
                    </Link>
                  </li>
                  <li>
                    <Link href="/sale" className="hover:underline">
                      Archives
                    </Link>
                  </li>
                  <li>
                    <Link href="/collections" className="hover:underline">
                      Collections
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold tracking-wider mb-4">SUPPORT</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/size-guide" className="hover:underline">
                      Size Guide
                    </Link>
                  </li>
                  <li>
                    <Link href="/returns" className="hover:underline">
                      Returns
                    </Link>
                  </li>
                  <li>
                    <Link href="/shipping" className="hover:underline">
                      Shipping
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:underline">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold tracking-wider mb-4">CONNECT</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:underline">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      TikTok
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Newsletter
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-black mt-8 pt-8 text-center">
              <p className="tracking-wider">&copy; 2024 SACRED MAYHEM. ALL RIGHTS RESERVED.</p>
            </div>
          </div>
        </footer>
    </div>
  )
}
