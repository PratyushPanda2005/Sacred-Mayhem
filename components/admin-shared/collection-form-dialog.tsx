'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { uploadImage, uploadMultipleImages } from '@/lib/storage';

interface CollectionFormData {
    title: string;
    season: string;
    piece_count: number;
    image_url: string;
    is_featured: boolean;
    description: string;
    gallery?: string; // We'll handle conversion to/from string in the form
}

interface CollectionFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    isLoading: boolean;
    initialData?: any | null;
    mode: 'create' | 'edit';
}

export default function CollectionFormDialog({
    open,
    onClose,
    onSubmit,
    isLoading,
    initialData,
    mode,
}: CollectionFormDialogProps) {
    const [isUploading, setIsUploading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<CollectionFormData>({
        defaultValues: {
            title: '',
            season: '',
            piece_count: 0,
            image_url: '',
            is_featured: false,
            description: '',
            gallery: '',
        },
    });

    const isFeatured = watch('is_featured');
    const imageUrl = watch('image_url');
    const gallery = watch('gallery');

    useEffect(() => {
        if (initialData) {
            // Convert gallery array to newline-separated string for editing
            const formattedData = {
                ...initialData,
                gallery: initialData.gallery ? initialData.gallery.join('\n') : '',
            };
            reset(formattedData);
        } else {
            reset({
                title: '',
                season: '',
                piece_count: 0,
                image_url: '',
                is_featured: false,
                description: '',
                gallery: '',
            });
        }
    }, [initialData, reset, open]);

    const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        try {
            setIsUploading(true);
            const url = await uploadImage(e.target.files[0]);
            setValue('image_url', url);
            toast.success('Main image uploaded');
        } catch (error: any) {
            toast.error('Upload failed: ' + error.message);
        } finally {
            setIsUploading(false);
        }
    };

    const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        try {
            setIsUploading(true);
            const urls = await uploadMultipleImages(Array.from(e.target.files));
            const currentGallery = watch('gallery') || '';
            const newGallery = currentGallery
                ? `${currentGallery}\n${urls.join('\n')}`
                : urls.join('\n');
            setValue('gallery', newGallery);
            toast.success(`${urls.length} images added to gallery`);
        } catch (error: any) {
            toast.error('Gallery upload failed: ' + error.message);
        } finally {
            setIsUploading(false);
        }
    };

    const handleFormSubmit = (data: CollectionFormData) => {
        // Convert newline-separated string back to array before submitting
        const galleryArray = data.gallery
            ? data.gallery.split('\n').map(url => url.trim()).filter(url => url !== '')
            : [];

        onSubmit({
            ...data,
            gallery: galleryArray
        });
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {mode === 'create' ? 'Add New Collection' : 'Edit Collection'}
                    </DialogTitle>
                    <DialogDescription>
                        {mode === 'create'
                            ? 'Fill in the details to create a new collection.'
                            : 'Update the collection information below.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Collection Title *</Label>
                                <Input
                                    id="title"
                                    {...register('title', { required: 'Title is required' })}
                                    placeholder="e.g. CHAOS THEORY"
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-500">{errors.title.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="season">Season *</Label>
                                <Input
                                    id="season"
                                    {...register('season', { required: 'Season is required' })}
                                    placeholder="e.g. SPRING/SUMMER 2024"
                                />
                                {errors.season && (
                                    <p className="text-sm text-red-500">{errors.season.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="piece_count">Piece Count</Label>
                                <Input
                                    id="piece_count"
                                    type="number"
                                    {...register('piece_count', { valueAsNumber: true })}
                                    placeholder="0"
                                />
                            </div>
                            <div className="flex items-center space-x-2 pt-8">
                                <Switch
                                    id="is_featured"
                                    checked={isFeatured}
                                    onCheckedChange={(checked) => setValue('is_featured', checked)}
                                />
                                <Label htmlFor="is_featured" className="cursor-pointer font-bold">
                                    Featured Collection
                                </Label>
                            </div>
                        </div>

                        <div className="space-y-4 p-4 border-2 border-dashed border-gray-200 rounded-lg">
                            <Label className="flex items-center gap-2">Main Cover Image {isUploading && <Loader2 className="w-4 h-4 animate-spin" />}</Label>
                            <div className="flex gap-4 items-start">
                                {imageUrl && (
                                    <img src={imageUrl} alt="Preview" className="w-24 h-24 object-cover rounded border" />
                                )}
                                <div className="flex-1 space-y-2">
                                    <Input
                                        id="image_url"
                                        {...register('image_url', { required: 'Image URL is required' })}
                                        placeholder="Image URL"
                                    />
                                    <div className="text-sm font-bold text-gray-500">OR</div>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleMainImageUpload}
                                        disabled={isUploading}
                                        className="cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 p-4 border-2 border-dashed border-gray-200 rounded-lg">
                            <Label className="flex items-center gap-2">Lookbook Gallery {isUploading && <Loader2 className="w-4 h-4 animate-spin" />}</Label>
                            <Textarea
                                id="gallery"
                                {...register('gallery')}
                                placeholder="Paste image URLs here (one per line)"
                                rows={6}
                            />
                            <div className="flex flex-col gap-2">
                                <div className="text-sm font-bold text-gray-500">OR UPLOAD MULTIPLE</div>
                                <Input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleGalleryUpload}
                                    disabled={isUploading}
                                    className="cursor-pointer"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                                id="description"
                                {...register('description', { required: 'Description is required' })}
                                placeholder="Enter collection description"
                                rows={4}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">{errors.description.message}</p>
                            )}
                        </div>
                    </div>

                    <DialogFooter className="gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading || isUploading}
                            className="border-2 border-black font-bold"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading || isUploading} className="bg-black text-white hover:bg-white hover:text-black border-2 border-black font-bold">
                            {(isLoading || isUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {mode === 'create' ? 'Create Collection' : 'Update Collection'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
