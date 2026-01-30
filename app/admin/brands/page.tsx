
import BrandList from '@/components/_admin/brands/brand-list';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function BrandsPage() {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Brands</h2>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Brand
                </Button>
            </div>
            <BrandList />
        </div>
    );
}
