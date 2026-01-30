
import { Button } from '@/components/ui/button';

export default function CouponCodesPage() {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Coupon Codes</h2>
                <Button>Add Coupon</Button>
            </div>
            <div>
                <p className="text-gray-500">Manage discount coupons here.</p>
            </div>
        </div>
    );
}
