import { supabase, type Product } from './supabase';

/**
 * Fetch all active products for the public side of the site.
 */
export async function getProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching public products:', error);
        throw error;
    }
    return data as Product[];
}

/**
 * Fetch all products (including inactive) for the admin dashboard.
 */
export async function getAllProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching all products:', error);
        throw error;
    }
    return data as Product[];
}

/**
 * Fetch a single product by ID.
 */
export async function getProductById(id: string) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error(`Error fetching product ${id}:`, error);
        throw error;
    }
    return data as Product;
}

/**
 * Create a new product.
 */
export async function createProduct(product: Omit<Product, 'id' | 'created_at'>) {
    const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

    if (error) {
        console.error('Error creating product:', error);
        throw error;
    }
    return data as Product;
}

/**
 * Update an existing product.
 */
export async function updateProduct(id: string, product: Partial<Omit<Product, 'id' | 'created_at'>>) {
    const { data, error } = await supabase
        .from('products')
        .update(product)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error(`Error updating product ${id}:`, error);
        throw error;
    }
    return data as Product;
}

/**
 * Delete a product.
 */
export async function deleteProduct(id: string) {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) {
        console.error(`Error deleting product ${id}:`, error);
        throw error;
    }
}
