
'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';
// components
import DeleteDialog from '@/components/admin-shared/delete-dialog';
import ProductFormDialog from '@/components/admin-shared/product-form-dialog';
import Table from '@/components/admin-shared/table';
import Product from '@/components/admin-shared/product-row';
import { getAllFeaturedCollection, deleteFeaturedItem, createFeaturedItem, updateFeaturedItem } from '@/lib/products';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const TABLE_HEAD = [
    { id: 'name', label: 'Product' },
    { id: 'price', label: 'Price' },
    { id: 'stockQuantity', label: 'Quantity' },
    { id: 'inventoryType', label: 'Status' },
    { id: 'rating', label: 'Rating' },
    { id: 'createdAt', label: 'Date' },
    { id: '', label: 'Actions' }
];

export default function AdminFeaturedCollectionMain({ brands, categories, shops, isVendor, onAddClick }) {
    const searchParams = useSearchParams();

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [formMode, setFormMode] = useState('create');
    const [editingItem, setEditingItem] = useState(null);

    const queryClient = useQueryClient();

    const { data, isPending: isLoading } = useQuery({
        queryKey: ['admin-featured-collection', searchParams.toString(), isVendor],
        queryFn: async () => {
            const items = await getAllFeaturedCollection();
            return {
                data: items,
                total: items.length,
                totalPages: 1
            };
        }
    });

    const { mutate: deleteItemMutation, isPending: isDeleting } = useMutation({
        mutationFn: deleteFeaturedItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-featured-collection'] });
            queryClient.invalidateQueries({ queryKey: ['featured-collection'] });
            toast.success('Spotlight item deleted successfully');
            setDeleteDialogOpen(false);
        },
        onError: (error) => {
            toast.error('Failed to delete spotlight item: ' + error.message);
        }
    });

    const { mutate: createItemMutation, isPending: isCreating } = useMutation({
        mutationFn: createFeaturedItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-featured-collection'] });
            queryClient.invalidateQueries({ queryKey: ['featured-collection'] });
            toast.success('Spotlight item created successfully');
            setFormDialogOpen(false);
            setEditingItem(null);
        },
        onError: (error) => {
            toast.error('Failed to create spotlight item: ' + error.message);
        }
    });

    const { mutate: updateItemMutation, isPending: isUpdating } = useMutation({
        mutationFn: ({ id, data }) => updateFeaturedItem(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-featured-collection'] });
            queryClient.invalidateQueries({ queryKey: ['featured-collection'] });
            toast.success('Spotlight item updated successfully');
            setFormDialogOpen(false);
            setEditingItem(null);
        },
        onError: (error) => {
            toast.error('Failed to update spotlight item: ' + error.message);
        }
    });

    const handleDeleteClick = (id) => () => {
        setSelectedItemId(id);
        setDeleteDialogOpen(true);
    };

    const handleEditClick = (item) => () => {
        setEditingItem({
            name: item.name,
            description: item.description,
            price: item.price || 0,
            image_url: item.image_url,
            is_active: item.is_active,
            product_details: item.product_details || '',
            stockQuantity: item.stockQuantity || 0,
            rating: item.rating || 0,
            reviews_count: item.reviews_count || 0
        });
        setSelectedItemId(item.id);
        setFormMode('edit');
        setFormDialogOpen(true);
    };

    const handleAddClick = () => {
        setEditingItem(null);
        setFormMode('create');
        setFormDialogOpen(true);
        if (onAddClick) onAddClick();
    };

    const handleDeleteConfirm = () => {
        if (selectedItemId) {
            deleteItemMutation(selectedItemId);
        }
    };

    const handleFormSubmit = (formData) => {
        if (formMode === 'create') {
            createItemMutation(formData);
        } else {
            updateItemMutation({ id: selectedItemId, data: formData });
        }
    };

    const handleFormClose = () => {
        setFormDialogOpen(false);
        setEditingItem(null);
        setSelectedItemId(null);
    };

    const handleDeleteClose = () => {
        setDeleteDialogOpen(false);
        setSelectedItemId(null);
    };

    // Expose handleAddClick to parent
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            window.__adminFeaturedCollectionAddClick = handleAddClick;
        }
        return () => {
            if (typeof window !== 'undefined') {
                delete window.__adminFeaturedCollectionAddClick;
            }
        };
    }, []);

    return (
        <>
            <DeleteDialog
                open={deleteDialogOpen}
                onClose={handleDeleteClose}
                onDelete={handleDeleteConfirm}
                isLoading={isDeleting}
                title="Delete Spotlight Item"
                description='Are you really sure you want to remove this item from the spotlight collection? Just making sure before we go ahead with it.'
            />

            <ProductFormDialog
                open={formDialogOpen}
                onClose={handleFormClose}
                onSubmit={handleFormSubmit}
                isLoading={isCreating || isUpdating}
                initialData={editingItem}
                mode={formMode}
                title={formMode === 'create' ? 'Add Spotlight Item' : 'Edit Spotlight Item'}
                description={formMode === 'create' ? 'Fill in the details for the spotlight item.' : 'Update the item details.'}
            />

            <Table
                headData={TABLE_HEAD}
                data={data}
                isLoading={isLoading}
                row={Product}
                handleClickOpen={handleDeleteClick}
                handleEditClick={handleEditClick}
                isSearch
            />
        </>
    );
}

AdminFeaturedCollectionMain.propTypes = {
    brands: PropTypes.array,
    categories: PropTypes.array,
    isVendor: PropTypes.bool,
    onAddClick: PropTypes.func
};
