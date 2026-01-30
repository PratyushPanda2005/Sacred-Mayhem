'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Assuming the type matches what user uses
interface ProductCardProps {
    product: {
        id: string;
        name: string;
        price: number;
        image_url: string;
        slug: string;
    };
}

const ProductCard = ({ product }: ProductCardProps) => {
    const router = useRouter();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group cursor-pointer"
            onClick={() => router.push(`/products/${product.id}`)}
        >
            <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden mb-6">
                {product.image_url ? (
                    <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400">No Image</span>
                    </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
            </div>

            <div className="text-center">
                <h3 className="text-lg font-serif text-gray-900 mb-2 group-hover:text-amber-800 transition-colors duration-300">
                    {product.name}
                </h3>
                <p className="text-sm font-medium text-gray-500">
                    ${product.price.toLocaleString()}
                </p>
            </div>
        </motion.div>
    );
};

export default ProductCard;
