
import CategoryList from '@/components/_admin/categories/parent/category-list';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function CategoriesPage() {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Categories</h2>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Category
                </Button>
            </div>
            <CategoryList />
        </div>
    );
}
