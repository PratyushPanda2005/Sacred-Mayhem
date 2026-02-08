
import Navigation from "@/components/navigation"
import { LookbookDetail } from "@/components/lookbook-detail"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { getCollectionById } from "@/lib/collections"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const collection = await getCollectionById(params.id).catch(() => null)

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
          url: collection.image_url,
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
      images: [collection.image_url],
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
