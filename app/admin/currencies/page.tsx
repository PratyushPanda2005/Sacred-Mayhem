
import { Button } from '@/components/ui/button';

export default function CurrenciesPage() {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Currencies</h2>
                <Button>Add Currency</Button>
            </div>
            <div>
                <p className="text-gray-500">Manage supported currencies here.</p>
            </div>
        </div>
    );
}
