
import AdminOrdersMain from '@/components/_admin/orders/orders';

export default function OrdersPage() {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Orders</h2>
            </div>
            <AdminOrdersMain isVendor={false} shops={[]} />
        </div>
    );
}
