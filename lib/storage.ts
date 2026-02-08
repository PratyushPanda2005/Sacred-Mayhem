import { supabase } from './supabase';

/**
 * Upload an image to a Supabase storage bucket.
 * @param file The file to upload
 * @param bucket The name of the storage bucket (default: 'collections')
 * @returns The public URL of the uploaded image
 */
export async function uploadImage(file: File, bucket: string = 'collections') {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            console.error('Error uploading image:', error);
            throw error;
        }

        const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(filePath);

        return publicUrl;
    } catch (error: any) {
        console.error('Storage error:', error.message);
        throw error;
    }
}

/**
 * Upload multiple images to a Supabase storage bucket.
 * @param files Array of files to upload
 * @param bucket The name of the storage bucket
 * @returns Array of public URLs
 */
export async function uploadMultipleImages(files: File[], bucket: string = 'collections') {
    const uploadPromises = Array.from(files).map(file => uploadImage(file, bucket));
    return Promise.all(uploadPromises);
}
