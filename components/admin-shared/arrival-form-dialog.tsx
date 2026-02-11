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
import { Loader2, Upload, X } from 'lucide-react';
import { uploadImage } from '@/lib/storage';
import { toast } from 'sonner';

interface ArrivalFormData {
    name: string;
    description: string;
    price: number;
    image_url: string;
    is_active: boolean;
    product_details?: string;
    stockQuantity?: number;
    rating?: number;
    reviews_count?: number;
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
            product_details: '',
            stockQuantity: 0,
            rating: 0,
            reviews_count: 0,
        },
    });

    const isActive = watch('is_active');
    const imageUrl = watch('image_url');

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        } else {
            reset({
                name: '',
                description: '',
                price: 0,
                image_url: '',
                is_active: true,
                product_details: '',
                stockQuantity: 0,
                rating: 0,
                reviews_count: 0,
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

    const handleFormSubmit = (data: ArrivalFormData) => {
        if (!data.image_url) {
            toast.error('Please upload an image');
            return;
        }
        onSubmit(data);
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

                            <div className="grid grid-cols-3 gap-4">
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
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
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
