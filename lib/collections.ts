import { supabase, type Collection } from './supabase';

/**
 * Fetch all collections.
 */
export async function getCollections() {
    const { data, error } = await supabase
        .from('collection_table')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching collections:', error);
        throw error;
    }
    return data as Collection[];
}

/**
 * Fetch a single collection by ID.
 */
export async function getCollectionById(id: string) {
    const { data, error } = await supabase
        .from('collection_table')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error(`Error fetching collection ${id}:`, error);
        throw error;
    }
    return data as Collection;
}

/**
 * Create a new collection.
 */
export async function createCollection(collection: Omit<Collection, 'id' | 'created_at'>) {
    const { data, error } = await supabase
        .from('collection_table')
        .insert([collection])
        .select()
        .single();

    if (error) {
        console.error('Error creating collection:', error);
        throw error;
    }
    return data as Collection;
}

/**
 * Update an existing collection.
 */
export async function updateCollection(id: number, collection: Partial<Omit<Collection, 'id' | 'created_at'>>) {
    const { data, error } = await supabase
        .from('collection_table')
        .update(collection)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error(`Error updating collection ${id}:`, error);
        throw error;
    }
    return data as Collection;
}

/**
 * Delete a collection.
 */
export async function deleteCollection(id: number) {
    const { error } = await supabase
        .from('collection_table')
        .delete()
        .eq('id', id);

    if (error) {
        console.error(`Error deleting collection ${id}:`, error);
        throw error;
    }
}
