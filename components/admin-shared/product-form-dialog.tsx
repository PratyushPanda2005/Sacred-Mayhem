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

interface ProductFormData {
    name: string;
    description: string;
    price: number;
    image_url: string;
    is_active: boolean;
}

interface ProductFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: ProductFormData) => void;
    isLoading: boolean;
    initialData?: ProductFormData | null;
    mode: 'create' | 'edit';
}

export default function ProductFormDialog({
    open,
    onClose,
    onSubmit,
    isLoading,
    initialData,
    mode,
}: ProductFormDialogProps) {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ProductFormData>({
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            image_url: '',
            is_active: true,
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
            });
        }
    }, [initialData, reset, open]);

    const handleFormSubmit = (data: ProductFormData) => {
        onSubmit(data);
    };

    return (
        <Dialog open={open} onOpenChange={onClose} >
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>
                        {mode === 'create' ? 'Add New Product' : 'Edit Product'}
                    </DialogTitle>
                    <DialogDescription>
                        {mode === 'create'
                            ? 'Fill in the details to create a new product.'
                            : 'Update the product information below.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Product Name *</Label>
                        <Input
                            id="name"
                            {...register('name', { required: 'Product name is required' })}
                            placeholder="Enter product name"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                            id="description"
                            {...register('description', { required: 'Description is required' })}
                            placeholder="Enter product description"
                            rows={4}
                        />
                        {errors.description && (
                            <p className="text-sm text-red-500">{errors.description.message}</p>
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

                    <div className="flex items-center space-x-2">
                        <Switch
                            id="is_active"
                            checked={isActive}
                            onCheckedChange={(checked) => setValue('is_active', checked)}
                        />
                        <Label htmlFor="is_active" className="cursor-pointer">
                            Active (visible to customers)
                        </Label>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {mode === 'create' ? 'Create Product' : 'Update Product'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
