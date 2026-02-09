
'use client';

import { useEffect } from 'react';
import AdminFeaturedCollectionMain from '@/components/_admin/featured-collection/featured-collection';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function FeaturedCollectionPage() {
    const handleAddFeatured = () => {
        // Trigger the add dialog via the exposed function
        if (typeof window !== 'undefined' && (window as any).__adminFeaturedCollectionAddClick) {
            (window as any).__adminFeaturedCollectionAddClick();
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Featured Collection</h2>
                <Button onClick={handleAddFeatured}>
                    <Plus className="mr-2 h-4 w-4" /> Add Featured Item
                </Button>
            </div>
            <AdminFeaturedCollectionMain brands={[]} categories={[]} shops={[]} isVendor={false} />
        </div>
    );
}
