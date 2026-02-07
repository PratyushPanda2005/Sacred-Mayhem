
'use client';

import { useEffect } from 'react';
import AdminNewArrivalsMain from '@/components/_admin/new-arrivals/new-arrivals';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function NewArrivalsPage() {
    const handleAddArrival = () => {
        // Trigger the add dialog via the exposed function
        if (typeof window !== 'undefined' && (window as any).__adminNewArrivalsAddClick) {
            (window as any).__adminNewArrivalsAddClick();
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">New Arrivals</h2>
                <Button onClick={handleAddArrival}>
                    <Plus className="mr-2 h-4 w-4" /> Add New Arrival
                </Button>
            </div>
            <AdminNewArrivalsMain brands={[]} categories={[]} shops={[]} isVendor={false} />
        </div>
    );
}
