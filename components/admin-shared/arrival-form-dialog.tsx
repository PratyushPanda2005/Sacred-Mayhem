'use client';

import React, { useEffect } from 'react';
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

    const handleFormSubmit = (data: ArrivalFormData) => {
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
                                <Label htmlFor="image_url">Image URL *</Label>
                                <Input
                                    id="image_url"
                                    {...register('image_url', { required: 'Image URL is required' })}
                                    placeholder="https://example.com/image.jpg"
                                />
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
                                    rows={6}
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
                                disabled={isLoading}
                                className="border-2 border-black font-bold"
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading} className="bg-black text-white hover:bg-white hover:text-black border-2 border-black font-bold">
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {mode === 'create' ? 'Create Arrival' : 'Update Detail'}
                            </Button>
                        </DialogFooter>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
