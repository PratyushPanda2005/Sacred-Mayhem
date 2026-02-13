import { supabase } from './supabase';

export interface UserRecord {
    id?: string;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    country?: string;
    created_at?: string;
}

/**
 * Save a new user from checkout.
 */
export async function saveCheckoutUser(user: Omit<UserRecord, 'id' | 'created_at'>) {
    console.log('Attempting to save user to Supabase:', user);

    const { data, error } = await supabase
        .from('users')
        .upsert(
            [
                {
                    ...user,
                    email: user.email.toLowerCase(),
                }
            ],
            { onConflict: 'email' }
        )
        .select()
        .single();

    if (error) {
        console.error('CRITICAL: Error saving user to Supabase "users" table:', error);
        console.error('Error Code:', error.code);
        console.error('Error Message:', error.message);
        console.error('Error Details:', error.details);
        console.error('Hint:', error.hint);

        // If it's a "column does not exist" error (code 42703 in Postgres)
        if (error.code === '42703') {
            console.error('Schema Mismatch: One or more columns sent do not exist in the "users" table.');
        }

        return { success: false, error };
    }

    console.log('User saved successfully:', data);
    return { success: true, data };
}

/**
 * Fetch all users for admin.
 */
export async function getAllUsers() {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching users:', error);
        return [];
    }
    return data;
}

/**
 * Delete a user.
 */
export async function deleteUser(id: string) {
    const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);

    if (error) {
        console.error(`Error deleting user ${id}:`, error);
        throw error;
    }
}
