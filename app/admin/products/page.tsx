
'use client';

import { useEffect } from 'react';
import AdminProductsMain from '@/components/_admin/products/products';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function ProductsPage() {
    const handleAddProduct = () => {
        // Trigger the add dialog via the exposed function
        if (typeof window !== 'undefined' && (window as any).__adminProductsAddClick) {
            (window as any).__adminProductsAddClick();
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Products</h2>
                <Button onClick={handleAddProduct}>
                    <Plus className="mr-2 h-4 w-4" /> Add Product
                </Button>
            </div>
            <AdminProductsMain brands={[]} categories={[]} shops={[]} isVendor={false} />
        </div>
    );
}
