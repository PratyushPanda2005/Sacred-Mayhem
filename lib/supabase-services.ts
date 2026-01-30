
// import { supabase } from './supabase';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_BRANDS = [
    { id: '1', name: 'Nike', slug: 'nike', logo: null, created_at: '2023-01-01T00:00:00Z', status: 'active', description: 'Just do it' },
    { id: '2', name: 'Adidas', slug: 'adidas', logo: null, created_at: '2023-01-02T00:00:00Z', status: 'active', description: 'Impossible is nothing' },
    { id: '3', name: 'Puma', slug: 'puma', logo: null, created_at: '2023-01-03T00:00:00Z', status: 'inactive', description: 'Forever Faster' },
    { id: '4', name: 'Reebok', slug: 'reebok', logo: null, created_at: '2023-01-04T00:00:00Z', status: 'active', description: 'Be more human' },
    { id: '5', name: 'New Balance', slug: 'new-balance', logo: null, created_at: '2023-01-05T00:00:00Z', status: 'active', description: 'We got now' },
];

const MOCK_CATEGORIES = [
    { id: '1', name: 'Shoes', slug: 'shoes', image: null, created_at: '2023-01-01T00:00:00Z', status: 'active', description: 'Footwear for all' },
    { id: '2', name: 'Clothing', slug: 'clothing', image: null, created_at: '2023-01-02T00:00:00Z', status: 'active', description: 'Apparel' },
    { id: '3', name: 'Accessories', slug: 'accessories', image: null, created_at: '2023-01-03T00:00:00Z', status: 'active', description: 'Bags, hats, etc' },
];

export const MOCK_PRODUCTS = [
    {
        id: '1',
        name: 'Midnight Velvet Bomber',
        slug: 'midnight-velvet-bomber',
        description: 'A decadent reimaging of the classic bomber silhouette. Crafted from Italian silk velvet with hand-embroidered lining featuring our signature chaos motif. Gold hardware accoutrements finish this statement piece.',
        price: 1250,
        stockQuantity: 15,
        inventoryType: 'published',
        rating: 4.8,
        created_at: '2023-10-15T10:00:00Z',
        images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2836&auto=format&fit=crop'],
        image_url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2836&auto=format&fit=crop',
        cover: null,
        sku: 'MV-BMB-001',
        is_active: true
    },
    {
        id: '2',
        name: 'Sacred Thread Distressed Denim',
        slug: 'sacred-thread-denim',
        description: 'Japanese selvedge denim, hand-distressed in our Kyoto atelier. Each pair undergoes a 40-hour aging process. Features reinforced knees with silver thread stitching and custom hardware.',
        price: 895,
        stockQuantity: 42,
        inventoryType: 'published',
        rating: 4.9,
        created_at: '2023-11-02T14:30:00Z',
        images: ['https://images.unsplash.com/photo-1542272617-08f086320497?q=80&w=2940&auto=format&fit=crop'],
        image_url: 'https://images.unsplash.com/photo-1542272617-08f086320497?q=80&w=2940&auto=format&fit=crop',
        cover: null,
        sku: 'ST-DNM-022',
        is_active: true
    },
    {
        id: '3',
        name: 'Ethereal Silk Kimono',
        slug: 'ethereal-silk-kimono',
        description: 'Fluidity meets structure. This 100% mulberry silk kimono drapes effortlessly, featuring a ghostly digital print that reveals itself fully only in motion. Includes a detachable obi sash.',
        price: 1800,
        stockQuantity: 5,
        inventoryType: 'low-stock',
        rating: 5.0,
        created_at: '2023-12-01T09:15:00Z',
        images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=2787&auto=format&fit=crop'],
        image_url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=2787&auto=format&fit=crop',
        cover: null,
        sku: 'ES-KMN-777',
        is_active: true
    },
    {
        id: '4',
        name: 'Obsidian Leather Biker',
        slug: 'obsidian-leather-biker',
        description: 'Full-grain lambskin leather treated for a matte obsidian finish. Asymmetrical zipper closure, quilted shoulders, and articulated sleeves. A lifetime investment piece that molds to your body.',
        price: 2400,
        stockQuantity: 8,
        inventoryType: 'published',
        rating: 4.7,
        created_at: '2023-09-20T16:45:00Z',
        images: ['https://images.unsplash.com/photo-1551028919-ac66e6a39451?q=80&w=2787&auto=format&fit=crop'],
        image_url: 'https://images.unsplash.com/photo-1551028919-ac66e6a39451?q=80&w=2787&auto=format&fit=crop',
        cover: null,
        sku: 'OB-LBR-666',
        is_active: true
    },
    {
        id: '5',
        name: 'Chaos Theory Hoodie',
        slug: 'chaos-theory-hoodie',
        description: 'Heavyweight French terry cotton in an oversized silhouette. Features raw hems, dropped shoulders, and a puff-print graphic on the back representing entropic decay. Stone-washed for vintage hand-feel.',
        price: 350,
        stockQuantity: 100,
        inventoryType: 'published',
        rating: 4.6,
        created_at: '2024-01-10T11:20:00Z',
        images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2787&auto=format&fit=crop'],
        image_url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2787&auto=format&fit=crop',
        cover: null,
        sku: 'CT-HDD-005',
        is_active: true
    },
    {
        id: '6',
        name: 'Sovereign Signet T-Shirt',
        slug: 'sovereign-signet-tee',
        description: 'The essential elevated basic. 280gsm organic heavyweight cotton with a structured fit. features a tonal embroidered logo on the chest and a relaxed boxy cut.',
        price: 120,
        stockQuantity: 200,
        inventoryType: 'published',
        rating: 4.5,
        created_at: '2024-01-15T13:00:00Z',
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2960&auto=format&fit=crop'],
        image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2960&auto=format&fit=crop',
        cover: null,
        sku: 'SS-TEE-100',
        is_active: true
    },
    {
        id: '7',
        name: 'Archive Cargo Trousers',
        slug: 'archive-cargo-trousers',
        description: 'Utility meets luxury. Technical nylon blend fabric with multiple functional pockets, adjustable ankle toggles, and a relaxed taper. Water-repellent and built for the urban nomad.',
        price: 450,
        stockQuantity: 0,
        inventoryType: 'draft',
        rating: 0,
        created_at: '2024-01-20T10:00:00Z',
        images: ['https://images.unsplash.com/photo-1517445312882-efe4112b6e5f?q=80&w=2960&auto=format&fit=crop'],
        image_url: 'https://images.unsplash.com/photo-1517445312882-efe4112b6e5f?q=80&w=2960&auto=format&fit=crop',
        cover: null,
        sku: 'AR-CRG-909',
        is_active: false
    }
];

const MOCK_ORDERS = [
    { id: '1', user_name: 'John Doe', total: 120, items_count: 2, payment_method: 'Credit Card', status: 'completed', created_at: '2023-01-01T10:00:00Z' },
    { id: '2', user_name: 'Jane Smith', total: 85, items_count: 1, payment_method: 'PayPal', status: 'pending', created_at: '2023-01-02T11:00:00Z' },
    { id: '3', user_name: 'Bob Jones', total: 200, items_count: 3, payment_method: 'Credit Card', status: 'processing', created_at: '2023-01-03T14:30:00Z' },
];

const MOCK_DASHBOARD_DATA = {
    dailyEarning: 1560,
    dailyOrders: 12,
    totalUsers: 450,
    totalProducts: 85,
    salesReport: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], series: [{ name: 'Sales', data: [31, 40, 28, 51, 42, 109, 100] }] },
    incomeReport: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], series: [{ name: 'Income', data: [1000, 2000, 1500, 2500, 3000, 2800, 3500] }] },
    commissionReport: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], series: [{ name: 'Commission', data: [100, 200, 150, 250, 300, 280, 350] }] },
    ordersReport: { labels: ['Completed', 'Pending', 'Cancelled'], series: [70, 20, 10] },
    bestSellingProducts: [
        { id: '1', name: 'Nike Air Force 1', price: 100, sales: 120, image: null },
        { id: '2', name: 'Adidas Ultraboost', price: 180, sales: 95, image: null },
        { id: '3', name: 'Puma Suede', price: 70, sales: 80, image: null },
    ],
    totalVendors: 15,
    totalPendingOrders: 5,
};

// Brands

export const getBrandsByAdmin = async (page = 1, search = '') => {
    await delay(500);
    let filtered = [...MOCK_BRANDS];

    if (search) {
        filtered = filtered.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));
    }

    const start = (page - 1) * 10;
    const end = start + 10;
    const paginated = filtered.slice(start, end);

    return {
        data: paginated,
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / 10),
    };
};

export const deleteBrandByAdmin = async (id: string) => {
    await delay(500);
    // In a real mock, we would mutate MOCK_BRANDS, but for now we just return success
    // simulating a successful delete.
    const index = MOCK_BRANDS.findIndex(b => b.id === id);
    if (index !== -1) {
        // MOCK_BRANDS.splice(index, 1); // Uncomment if we want persistent mock state within session
    }
    return { success: true };
};

export const addBrandByAdmin = async (brandData: any) => {
    await delay(500);
    const newBrand = { ...brandData, id: Math.random().toString(36).substr(2, 9), created_at: new Date().toISOString() };
    // MOCK_BRANDS.unshift(newBrand);
    return newBrand;
};

export const editBrandByAdmin = async (id: string, brandData: any) => {
    await delay(500);
    return { ...brandData, id };
};

// Categories
export const getCategoriesByAdmin = async (page = 1, search = '') => {
    await delay(500);
    let filtered = [...MOCK_CATEGORIES];

    if (search) {
        filtered = filtered.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    }

    const start = (page - 1) * 10;
    const end = start + 10;
    const paginated = filtered.slice(start, end);

    return {
        data: paginated,
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / 10),
    };
};

export const deleteCategoryByAdmin = async (id: string) => {
    await delay(500);
    return { success: true };
};

// Products
export const getProductsByAdmin = async (paramString = '') => {
    await delay(500);
    const params = new URLSearchParams(paramString);
    const page = parseInt(params.get('page') || '1');
    const search = params.get('search') || '';

    let filtered = [...MOCK_PRODUCTS];

    if (search) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }

    const start = (page - 1) * 10;
    const end = start + 10;
    const paginated = filtered.slice(start, end);

    return {
        data: paginated,
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / 10),
    };
};

export const deleteProductByAdmin = async (id: string) => {
    await delay(500);
    return { success: true };
};

// Orders
export const getOrdersByAdmin = async (paramString = '') => {
    await delay(500);
    const params = new URLSearchParams(paramString);
    const page = parseInt(params.get('page') || '1');
    const search = params.get('search') || '';

    let filtered = [...MOCK_ORDERS];
    if (search) {
        filtered = filtered.filter(o => o.user_name.toLowerCase().includes(search.toLowerCase()));
    }

    const start = (page - 1) * 10;
    const end = start + 10;
    const paginated = filtered.slice(start, end);

    return {
        data: paginated,
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / 10),
    };
};

export const deleteOrderByAdmin = async (id: string) => {
    await delay(500);
    return { success: true };
};

// Dashboard
export const adminDashboardAnalytics = async () => {
    await delay(500);
    return {
        data: MOCK_DASHBOARD_DATA
    };
};
