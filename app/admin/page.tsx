
import Dashboard from '@/components/_admin/dashboard';

export default function AdminDashboardPage() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
            <Dashboard isVendor={false} />
        </div>
    );
}
