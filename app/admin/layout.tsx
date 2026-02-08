'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Skip auth check for login page
        if (pathname === '/admin/login') {
            setIsLoading(false);
            return;
        }

        // Check authentication
        const authenticated = localStorage.getItem('admin_authenticated');

        if (authenticated === 'true') {
            setIsAuthenticated(true);
            setIsLoading(false);
        } else {
            // Redirect to login
            router.push('/admin/login');
        }
    }, [pathname, router]);

    const handleLogout = () => {
        localStorage.removeItem('admin_authenticated');
        localStorage.removeItem('admin_email');
        toast.success('Logged out successfully');
        router.push('/admin/login');
    };

    // Show login page without sidebar
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    // Show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    // Show nothing if not authenticated (will redirect)
    if (!isAuthenticated) {
        return null;
    }

    // Show admin panel with sidebar
    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            <aside className="w-full md:w-64 bg-gray-100 p-4 border-r">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-xl font-bold">Admin Panel</h1>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleLogout}
                        title="Logout"
                    >
                        <LogOut className="h-4 w-4" />
                    </Button>
                </div>
                <nav className="space-y-2">
                    <Link href="/admin" className="block p-2 hover:bg-gray-200 rounded">
                        Dashboard
                    </Link>
                    <Link href="/admin/brands" className="block p-2 hover:bg-gray-200 rounded">
                        Brands
                    </Link>
                    <Link href="/admin/categories" className="block p-2 hover:bg-gray-200 rounded">
                        Categories
                    </Link>
                    <Link href="/admin/products" className="block p-2 hover:bg-gray-200 rounded">
                        Products
                    </Link>
                    <Link href="/admin/new-arrivals" className="block p-2 hover:bg-gray-200 rounded">
                        New Arrivals
                    </Link>
                    <Link href="/admin/collections" className="block p-2 hover:bg-gray-200 rounded">
                        Collections
                    </Link>
                    <Link href="/admin/orders" className="block p-2 hover:bg-gray-200 rounded">
                        Orders
                    </Link>
                    <Link href="/admin/users" className="block p-2 hover:bg-gray-200 rounded">
                        Users
                    </Link>
                    <Link href="/admin/shops" className="block p-2 hover:bg-gray-200 rounded">
                        Shops
                    </Link>
                    <Link href="/admin/payouts" className="block p-2 hover:bg-gray-200 rounded">
                        Payouts
                    </Link>
                    <div className="pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase">
                        Catalog Management
                    </div>
                    <Link href="/admin/attributes" className="block p-2 hover:bg-gray-200 rounded">
                        Attributes
                    </Link>
                    <Link href="/admin/coupon-codes" className="block p-2 hover:bg-gray-200 rounded">
                        Coupon Codes
                    </Link>
                    <Link href="/admin/currencies" className="block p-2 hover:bg-gray-200 rounded">
                        Currencies
                    </Link>
                    <div className="pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase">
                        Configuration
                    </div>
                    <Link href="/admin/newsletter" className="block p-2 hover:bg-gray-200 rounded">
                        Newsletter
                    </Link>
                    <Link href="/admin/settings" className="block p-2 hover:bg-gray-200 rounded">
                        Settings
                    </Link>
                </nav>
            </aside>
            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    );
}
