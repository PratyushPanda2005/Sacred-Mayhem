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
import { uploadImage, uploadMultipleImages } from '@/lib/storage';
import { toast } from 'sonner';
import { Loader2, Upload, X, Images, ArrowLeft as ArrowLeftIcon, ArrowRight as ArrowRightIcon } from 'lucide-react';

interface ArrivalFormData {
    name: string;
    description: string;
    price: number;
    image_url: string;
    is_active: boolean;
    is_sold_out: boolean;
    product_details?: string;
    stockQuantity?: number;
    rating?: number;
    reviews_count?: number;
    gallery?: string;
}

interface ArrivalFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: ArrivalFormData) => void;
    isLoading: boolean;
    initialData?: ArrivalFormData | null;
    mode: 'create' | 'edit';
    title?: string;
    description?: string;
}

export default function ArrivalFormDialog({
    open,
    onClose,
    onSubmit,
    isLoading,
    initialData,
    mode,
    title,
    description,
}: ArrivalFormDialogProps) {
    const [isUploading, setIsUploading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ArrivalFormData>({
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            image_url: '',
            is_active: true,
            is_sold_out: false,
            product_details: '',
            stockQuantity: 0,
            rating: 0,
            reviews_count: 0,
            gallery: '',
        },
    });

    const isActive = watch('is_active');
    const isSoldOut = watch('is_sold_out');
    const imageUrl = watch('image_url');

    useEffect(() => {
        if (initialData) {
            reset({
                ...initialData,
                gallery: initialData.gallery ? (initialData.gallery as any).join('\n') : '',
            });
        } else {
            reset({
                name: '',
                description: '',
                price: 0,
                image_url: '',
                is_active: true,
                is_sold_out: false,
                product_details: '',
                stockQuantity: 0,
                rating: 0,
                reviews_count: 0,
                gallery: '',
            });
        }
    }, [initialData, reset, open]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            const url = await uploadImage(file, 'product-images');
            setValue('image_url', url);
            toast.success('Image uploaded successfully');
        } catch (error: any) {
            console.error('Upload failed:', error);
            toast.error('Failed to upload image: ' + error.message);
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

    const handleFormSubmit = (data: ArrivalFormData) => {
        if (!data.image_url) {
            toast.error('Please upload at least a main image');
            return;
        }

        // Convert newline-separated string back to array before submitting
        const galleryArray = data.gallery
            ? data.gallery.split('\n').map(url => url.trim()).filter(url => url !== '')
            : [];

        onSubmit({
            ...data,
            gallery: galleryArray as any
        });
    };

    return (
        <Dialog open={open} onOpenChange={onClose} >
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {title || (mode === 'create' ? 'Add New Arrival' : 'Edit Arrival')}
                    </DialogTitle>
                    <DialogDescription>
                        {description || (mode === 'create'
                            ? 'Fill in the details for the new drop.'
                            : 'Update the arrival details below.')}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column: Basic Info */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Arrival Name *</Label>
                                <Input
                                    id="name"
                                    {...register('name', { required: 'Arrival name is required' })}
                                    placeholder="Enter arrival name"
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500">{errors.name.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="price">Price (USD) *</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    {...register('price', {
                                        required: 'Price is required',
                                        min: { value: 0, message: 'Price must be positive' },
                                        valueAsNumber: true,
                                    })}
                                    placeholder="0.00"
                                />
                                {errors.price && (
                                    <p className="text-sm text-red-500">{errors.price.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    {...register('description', { required: 'Description is required' })}
                                    placeholder="Enter arrival description"
                                    rows={6}
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-500">{errors.description.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Media & Specs */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Product Image *</Label>
                                <div className="mt-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                                    {imageUrl ? (
                                        <div className="relative w-full aspect-square max-h-[200px]">
                                            <img
                                                src={imageUrl}
                                                alt="Product Preview"
                                                className="w-full h-full object-contain rounded-md"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setValue('image_url', '')}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-md"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center w-full h-32 cursor-pointer">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                {isUploading ? (
                                                    <Loader2 className="w-10 h-10 text-gray-400 animate-spin" />
                                                ) : (
                                                    <>
                                                        <Upload className="w-10 h-10 text-gray-400 mb-2" />
                                                        <p className="text-sm text-gray-500">
                                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                                        </p>
                                                        <p className="text-xs text-gray-400">PNG, JPG or WebP</p>
                                                    </>
                                                )}
                                            </div>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                disabled={isUploading}
                                            />
                                        </label>
                                    )}
                                </div>
                                <input type="hidden" {...register('image_url', { required: 'Image is required' })} />
                                {errors.image_url && (
                                    <p className="text-sm text-red-500">{errors.image_url.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="product_details">Specs (one per line)</Label>
                                <Textarea
                                    id="product_details"
                                    {...register('product_details')}
                                    placeholder="Premium Cotton&#10;Oversized Fit&#10;Made in Italy"
                                    rows={4}
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-4 pb-4">
                                <div className="space-y-2">
                                    <Label htmlFor="stockQuantity">Stock</Label>
                                    <Input
                                        id="stockQuantity"
                                        type="number"
                                        {...register('stockQuantity', { valueAsNumber: true })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="rating">Rating</Label>
                                    <Input
                                        id="rating"
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="5"
                                        {...register('rating', { valueAsNumber: true })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="reviews_count">Reviews</Label>
                                    <Input
                                        id="reviews_count"
                                        type="number"
                                        {...register('reviews_count', { valueAsNumber: true })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t">
                                <Label className="flex items-center gap-2 text-sm font-bold">
                                    <Images className="w-4 h-4" /> Gallery Images
                                </Label>

                                {/* Visual Gallery Preview */}
                                {(watch('gallery') || '').split('\n').filter(url => url.trim() !== '').length > 0 && (
                                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-4">
                                        {(watch('gallery') || '').split('\n').filter(url => url.trim() !== '').map((url, index, array) => (
                                            <div key={index} className="relative aspect-square border-2 border-gray-100 rounded-md overflow-hidden group">
                                                <img src={url} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const filtered = array.filter((_, i) => i !== index).join('\n');
                                                        setValue('gallery', filtered);
                                                    }}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
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
                                                        <ArrowLeftIcon className="w-2.5 h-2.5" />
                                                    </button>
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
                                                        <ArrowRightIcon className="w-2.5 h-2.5" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-xs text-gray-500 uppercase tracking-wider font-bold">Bulk Upload</Label>
                                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors h-24 relative">
                                            <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                                                {isUploading ? (
                                                    <Loader2 className="w-6 h-6 text-black animate-spin" />
                                                ) : (
                                                    <>
                                                        <Upload className="w-6 h-6 text-gray-400 mb-1" />
                                                        <span className="text-[10px] font-bold text-gray-500 text-center">Add Multiple Images</span>
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
                                        <Label className="text-xs text-gray-500 uppercase tracking-wider font-bold">URL List</Label>
                                        <Textarea
                                            id="gallery"
                                            {...register('gallery')}
                                            placeholder="URLs (one per line)"
                                            rows={3}
                                            className="text-xs border-2 border-gray-200 focus:border-black"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="is_active"
                                    checked={isActive}
                                    onCheckedChange={(checked) => setValue('is_active', checked)}
                                />
                                <Label htmlFor="is_active" className="cursor-pointer font-bold">
                                    Active / Visible
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="is_sold_out"
                                    checked={isSoldOut}
                                    onCheckedChange={(checked) => setValue('is_sold_out', checked)}
                                />
                                <Label htmlFor="is_sold_out" className="cursor-pointer font-bold text-red-500">
                                    Mark as Sold Out
                                </Label>
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
                                {mode === 'create' ? 'Create Arrival' : 'Update Detail'}
                            </Button>
                        </DialogFooter>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
