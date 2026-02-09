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

/**
 * Fetch all active new arrivals for the public side of the site.
 */
export async function getNewArrivals() {
    const { data, error } = await supabase
        .from('new_arrivals')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching public new arrivals:', error);
        throw error;
    }
    return data as Product[];
}

/**
 * Fetch all new arrivals for the admin dashboard.
 */
export async function getAllNewArrivals() {
    const { data, error } = await supabase
        .from('new_arrivals')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching all new arrivals:', error);
        throw error;
    }
    return data as Product[];
}

/**
 * Create a new arrival.
 */
export async function createNewArrival(arrival: Omit<Product, 'id' | 'created_at'>) {
    const { data, error } = await supabase
        .from('new_arrivals')
        .insert([arrival])
        .select()
        .single();

    if (error) {
        console.error('Error creating new arrival:', error);
        throw error;
    }
    return data as Product;
}

/**
 * Update an existing new arrival.
 */
export async function updateNewArrival(id: string, arrival: Partial<Omit<Product, 'id' | 'created_at'>>) {
    const { data, error } = await supabase
        .from('new_arrivals')
        .update(arrival)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error(`Error updating new arrival ${id}:`, error);
        throw error;
    }
    return data as Product;
}

/**
 * Delete a new arrival.
 */
export async function deleteNewArrival(id: string) {
    const { error } = await supabase
        .from('new_arrivals')
        .delete()
        .eq('id', id);

    if (error) {
        console.error(`Error deleting new arrival ${id}:`, error);
        throw error;
    }
}

/**
 * Fetch a single product by ID from either products or new_arrivals table.
 */
export async function getAnyProductById(id: string) {
    // Try products table first
    const { data: product, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (!productError && product) {
        return product as Product;
    }

    // If not found, try new_arrivals table
    const { data: arrival, error: arrivalError } = await supabase
        .from('new_arrivals')
        .select('*')
        .eq('id', id)
        .single();

    if (!arrivalError && arrival) {
        return arrival as Product;
    }

    console.error(`Product with ID ${id} not found in any table.`);
    throw new Error('Product not found');
}

/**
 * Fetch all active featured collection items for the public side of the site.
 */
export async function getFeaturedCollection() {
    const { data, error } = await supabase
        .from('featured_collection')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching public featured collection:', error);
        throw error;
    }
    return data as Product[];
}

/**
 * Fetch all featured collection items for the admin dashboard.
 */
export async function getAllFeaturedCollection() {
    const { data, error } = await supabase
        .from('featured_collection')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching all featured collection:', error);
        throw error;
    }
    return data as Product[];
}

/**
 * Create a new featured collection item.
 */
export async function createFeaturedItem(item: Omit<Product, 'id' | 'created_at'>) {
    const { data, error } = await supabase
        .from('featured_collection')
        .insert([item])
        .select()
        .single();

    if (error) {
        console.error('Error creating featured item:', error);
        throw error;
    }
    return data as Product;
}

/**
 * Update an existing featured collection item.
 */
export async function updateFeaturedItem(id: string, item: Partial<Omit<Product, 'id' | 'created_at'>>) {
    const { data, error } = await supabase
        .from('featured_collection')
        .update(item)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error(`Error updating featured item ${id}:`, error);
        throw error;
    }
    return data as Product;
}

/**
 * Delete a featured collection item.
 */
export async function deleteFeaturedItem(id: string) {
    const { error } = await supabase
        .from('featured_collection')
        .delete()
        .eq('id', id);

    if (error) {
        console.error(`Error deleting featured item ${id}:`, error);
        throw error;
    }
}
