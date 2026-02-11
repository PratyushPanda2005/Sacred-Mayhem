'use client';

import AdminCollectionsMain from '@/components/_admin/collections/collections';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function CollectionsPage() {
    const handleAddCollection = () => {
        if (typeof window !== 'undefined' && (window as any).__adminCollectionsAddClick) {
            (window as any).__adminCollectionsAddClick();
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Lookbook</h2>
                <Button onClick={handleAddCollection}>
                    <Plus className="mr-2 h-4 w-4" /> Add Collection
                </Button>
            </div>
            <AdminCollectionsMain />
        </div>
    );
}
