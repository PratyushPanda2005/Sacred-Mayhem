
import { Button } from '@/components/ui/button';

export default function AttributesPage() {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Attributes</h2>
                <Button>Add Attribute</Button>
            </div>
            <div>
                <p className="text-gray-500">Manage product attributes here.</p>
            </div>
        </div>
    );
}
