import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
// export const supabase = {} as any; // Mock export to prevent build errors if imported

export type Product = {
    id: string;
    name: string;
    description: string;
    price?: number;
    image_url: string;
    is_active: boolean;
    created_at: string;
    stockQuantity?: number;
    product_details?: string;
    rating?: number;
    reviews_count?: number;
};

export type Enquiry = {
    id: string;
    product_id: string;
    customer_name: string;
    email: string;
    message: string;
    created_at: string;
};

export type Collection = {
    id: number;
    title: string;
    season: string;
    piece_count: number;
    image_url: string;
    is_featured: boolean;
    description: string;
    gallery?: string[]; // Array of image URLs
    created_at: string;
};
