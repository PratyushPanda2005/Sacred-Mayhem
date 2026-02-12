
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
          <Link href="/lookbook">
            <div className="flex items-center space-x-2 cursor-pointer hover:underline transition-transform duration-300 hover:-translate-x-1">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-bold tracking-wider">BACK TO LOOKBOOK</span>
            </div>
          </Link>
        </div>
      </div>
      <LookbookDetail collectionId={params.id} />
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
  )
}
