'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'; // Changed from react-router-dom
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Send, MessageCircle, X } from 'lucide-react';
import { getProductById, Product } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';

const ProductDetail = ({ params }: { params: { id: string } }) => {
    // In Next.js App Router, params are passed as props to the page component.
    // However, if we are client-side only and navigating, we might want to ensure we receive it correctly.
    // The default export of page.tsx receives params.

    const id = params.id;
    const router = useRouter(); // Changed from useNavigate
    const [product, setProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                // Since this is mock data, we just fetch it.
                // In a real SSR app, we could fetch directly in the component if it was server-side.
                const data = await getProductById(id);
                setProduct(data);
            } catch (error) {
                console.error('Error finding masterpiece:', error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-12 h-px bg-amber-600 animate-pulse" />
        </div>
    );

    if (!product) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
            <h1 className="text-3xl font-serif mb-6">Masterpiece not found.</h1>
            <button onClick={() => router.push('/products')} className="px-6 py-3 border border-black uppercase tracking-widest text-xs font-bold hover:bg-black hover:text-white transition-colors">Return to Collection</button>
        </div>
    );

    return (
        <div className="bg-white min-h-screen pt-32 pb-24 px-6 md:px-12">
            <div className="container mx-auto">
                <button
                    onClick={() => router.push('/products')}
                    className="flex items-center space-x-2 text-gray-500 hover:text-black transition-colors mb-12 uppercase tracking-widest text-[10px] font-bold"
                >
                    <ChevronLeft size={16} />
                    <span>Back to Collection</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    {/* Image Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden">
                            {product.image_url && (
                                <Image
                                    src={product.image_url}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </div>
                        {/* Additional gallery images could go here */}
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col"
                    >
                        <span className="text-amber-600 uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block">Exclusive Piece</span>
                        <h1 className="text-4xl md:text-6xl font-serif text-black mb-6 leading-tight">{product.name}</h1>

                        {product.price && (
                            <p className="text-2xl text-black/80 font-light mb-10 tracking-wider">
                                {formatPrice(product.price)}
                            </p>
                        )}

                        <div className="w-12 h-px bg-amber-600 mb-10" />

                        <div className="prose prose-neutral mb-12">
                            <p className="text-gray-500 text-lg font-light leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        <div className="flex flex-col space-y-4">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full py-5 bg-black text-white uppercase tracking-widest text-xs font-bold hover:bg-amber-600 transition-colors duration-500 flex items-center justify-center space-x-3"
                            >
                                <Send size={16} />
                                <span>Contact Concierge</span>
                            </button>

                            <button
                                className="w-full py-5 border border-black text-black uppercase tracking-widest text-xs font-bold hover:bg-black hover:text-white transition-all duration-500 flex items-center justify-center space-x-3"
                            >
                                <MessageCircle size={16} />
                                <span>Message on WhatsApp</span>
                            </button>
                        </div>

                        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-neutral-100 pt-12">
                            <div>
                                <h4 className="text-[10px] uppercase tracking-widest text-black font-bold mb-2">Authenticity</h4>
                                <p className="text-gray-500 text-xs">Each piece includes a signed certificate of origin.</p>
                            </div>
                            <div>
                                <h4 className="text-[10px] uppercase tracking-widest text-black font-bold mb-2">Service</h4>
                                <p className="text-gray-500 text-xs">Personalized delivery available worldwide.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Concierge Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-white w-full max-w-lg p-10 md:p-16 z-10 shadow-2xl"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 text-gray-500 hover:text-black transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="text-center mb-10">
                                <span className="text-amber-600 uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">Concierge Desk</span>
                                <h2 className="text-3xl font-serif">Inquiry for {product.name}</h2>
                            </div>

                            <form className="space-y-6">
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-black font-bold mb-2 block">Your Name</label>
                                    <input type="text" className="w-full border-b border-neutral-200 py-3 focus:border-amber-600 outline-none transition-colors text-sm" placeholder="Alexander McQueen" />
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-black font-bold mb-2 block">Email Address</label>
                                    <input type="email" className="w-full border-b border-neutral-200 py-3 focus:border-amber-600 outline-none transition-colors text-sm" placeholder="alexander@luxury.com" />
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-black font-bold mb-2 block">Personal Message</label>
                                    <textarea rows={4} className="w-full border-b border-neutral-200 py-3 focus:border-amber-600 outline-none transition-colors text-sm resize-none" placeholder="I am interested in this piece..." />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-black text-white uppercase tracking-widest text-xs font-bold hover:bg-amber-600 transition-colors duration-500"
                                    onClick={(e) => { e.preventDefault(); alert('Inquiry sent (simulated)'); setIsModalOpen(false); }}
                                >
                                    Send Inquiry
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductDetail;
