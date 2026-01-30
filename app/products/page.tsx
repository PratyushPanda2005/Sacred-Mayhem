'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import { getProducts, Product } from '@/lib/products';
import { motion } from 'framer-motion';

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error('Failed to load pieces:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-white">
            <div className="container mx-auto">
                <header className="mb-20 text-center max-w-2xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-amber-600 uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block"
                    >
                        Curated Excellence
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl font-serif mb-8 text-gray-900"
                    >
                        The Collection
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-500 text-lg font-light leading-relaxed"
                    >
                        Discover our meticulously selected range of artisanal pieces, where every item tells a story of heritage and luxury.
                    </motion.p>
                </header>

                {loading ? (
                    <div className="flex justify-center py-32">
                        <div className="w-12 h-px bg-amber-600 animate-pulse" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && products.length === 0 && (
                    <div className="text-center py-32">
                        <p className="text-gray-400 italic">Our artisans are currently crafting new wonders.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
