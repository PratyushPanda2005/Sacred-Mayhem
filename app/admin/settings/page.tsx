
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Settings</h2>
                <Button>Save Changes</Button>
            </div>
            <div>
                <p className="text-gray-500">Configure global application settings.</p>
            </div>
        </div>
    );
}
