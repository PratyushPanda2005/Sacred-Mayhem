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
import { Loader2, Upload, X, Images, ArrowLeft as ArrowLeftIcon, ArrowRight as ArrowRightIcon } from 'lucide-react';
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
            const url = await uploadImage(e.target.files[0], 'product-images');
            setValue('image_url', url);
            toast.success('Main cover image uploaded');
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
            const urls = await uploadMultipleImages(Array.from(e.target.files), 'product-images');
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
            <DialogContent className="sm:max-w-[750px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {mode === 'create' ? 'Add New Lookbook Collection' : 'Edit Lookbook Collection'}
                    </DialogTitle>
                    <DialogDescription>
                        {mode === 'create'
                            ? 'Fill in the details to create a new lookbook collection.'
                            : 'Update the collection information below.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Lookbook Title *</Label>
                                <Input
                                    id="title"
                                    {...register('title', { required: 'Title is required' })}
                                    placeholder="e.g. CHAOS THEORY"
                                    className="border-2 border-gray-200 focus:border-black transition-colors"
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-500">{errors.title.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="season">Season/Year *</Label>
                                <Input
                                    id="season"
                                    {...register('season', { required: 'Season is required' })}
                                    placeholder="e.g. SPRING/SUMMER 2024"
                                    className="border-2 border-gray-200 focus:border-black transition-colors"
                                />
                                {errors.season && (
                                    <p className="text-sm text-red-500">{errors.season.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="piece_count">Total Pieces</Label>
                                <Input
                                    id="piece_count"
                                    type="number"
                                    {...register('piece_count', { valueAsNumber: true })}
                                    placeholder="0"
                                    className="border-2 border-gray-200 focus:border-black transition-colors"
                                />
                            </div>
                            <div className="flex items-center space-x-2 pt-8">
                                <Switch
                                    id="is_featured"
                                    checked={isFeatured}
                                    onCheckedChange={(checked) => setValue('is_featured', checked)}
                                />
                                <Label htmlFor="is_featured" className="cursor-pointer font-bold">
                                    Feature on Lookbook Page
                                </Label>
                            </div>
                        </div>

                        {/* Main Image Section */}
                        <div className="space-y-2">
                            <Label>Main Cover Image *</Label>
                            <div className="mt-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition-colors">
                                {imageUrl ? (
                                    <div className="relative w-full max-h-[300px] overflow-hidden rounded-md shadow-lg">
                                        <img
                                            src={imageUrl}
                                            alt="Cover Preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setValue('image_url', '')}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 shadow-md transition-all"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center w-full h-40 cursor-pointer">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            {isUploading ? (
                                                <Loader2 className="w-12 h-12 text-black animate-spin" />
                                            ) : (
                                                <>
                                                    <Upload className="w-12 h-12 text-gray-400 mb-2" />
                                                    <p className="text-sm text-gray-500">
                                                        <span className="font-semibold">Click to upload cover</span> or drag and drop
                                                    </p>
                                                    <p className="text-xs text-gray-400">High resolution recommended (JPG, PNG, WebP)</p>
                                                </>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleMainImageUpload}
                                            disabled={isUploading}
                                        />
                                    </label>
                                )}
                            </div>
                            <input type="hidden" {...register('image_url', { required: 'Cover image is required' })} />
                            {errors.image_url && (
                                <p className="text-sm text-red-500 mt-1">{errors.image_url.message}</p>
                            )}
                        </div>

                        {/* Gallery Section */}
                        <div className="space-y-4">
                            <Label className="flex items-center gap-2 font-bold">
                                <Images className="w-4 h-4" /> Gallery Images
                            </Label>

                            {/* Visual Gallery Preview with Reordering */}
                            {(watch('gallery') || '').split('\n').filter(url => url.trim() !== '').length > 0 && (
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-4 p-4 bg-gray-50 rounded-lg border-2 border-gray-100">
                                    {(watch('gallery') || '').split('\n').filter(url => url.trim() !== '').map((url, index, array) => (
                                        <div key={index} className="relative aspect-[3/4] border-2 border-white shadow-sm rounded-md overflow-hidden group bg-black">
                                            <img src={url} alt={`Gallery ${index}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />

                                            {/* Delete Button */}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const filtered = array.filter((_, i) => i !== index).join('\n');
                                                    setValue('gallery', filtered);
                                                }}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>

                                            {/* Reorder Controls */}
                                            <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    type="button"
                                                    disabled={index === 0}
                                                    onClick={() => {
                                                        const newArray = [...array];
                                                        [newArray[index - 1], newArray[index]] = [newArray[index], newArray[index - 1]];
                                                        setValue('gallery', newArray.join('\n'));
                                                    }}
                                                    className="bg-black/70 text-white p-1 rounded-md hover:bg-black disabled:opacity-30"
                                                >
                                                    <ArrowLeftIcon className="w-3 h-3" />
                                                </button>
                                                <span className="bg-black/70 text-white px-2 py-0.5 rounded-md text-[10px] font-bold self-center">
                                                    {index + 1}
                                                </span>
                                                <button
                                                    type="button"
                                                    disabled={index === array.length - 1}
                                                    onClick={() => {
                                                        const newArray = [...array];
                                                        [newArray[index + 1], newArray[index]] = [newArray[index], newArray[index + 1]];
                                                        setValue('gallery', newArray.join('\n'));
                                                    }}
                                                    className="bg-black/70 text-white p-1 rounded-md hover:bg-black disabled:opacity-30"
                                                >
                                                    <ArrowRightIcon className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-xs text-gray-500 uppercase tracking-wider">Upload Multiple Files</Label>
                                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors h-32 relative">
                                        <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                                            {isUploading ? (
                                                <Loader2 className="w-8 h-8 text-black animate-spin" />
                                            ) : (
                                                <>
                                                    <Upload className="w-8 h-8 text-gray-400 mb-1" />
                                                    <span className="text-xs font-bold text-gray-500">Add to Gallery</span>
                                                </>
                                            )}
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleGalleryUpload}
                                                disabled={isUploading}
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs text-gray-500 uppercase tracking-wider">Manual URL List</Label>
                                    <Textarea
                                        id="gallery"
                                        {...register('gallery')}
                                        placeholder="Paste image URLs here (one per line)"
                                        rows={4}
                                        className="border-2 border-gray-200 focus:border-black transition-colors text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Lookbook Description *</Label>
                            <Textarea
                                id="description"
                                {...register('description', { required: 'Description is required' })}
                                placeholder="Enter collection story or description"
                                rows={4}
                                className="border-2 border-gray-200 focus:border-black transition-colors"
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">{errors.description.message}</p>
                            )}
                        </div>
                    </div>

                    <DialogFooter className="gap-2 pt-4 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading || isUploading}
                            className="border-2 border-black font-bold h-12 px-8"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading || isUploading} className="bg-black text-white hover:bg-white hover:text-black border-2 border-black font-bold h-12 px-8 transition-all">
                            {(isLoading || isUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {mode === 'create' ? 'Create Collection' : 'Update Collection'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
