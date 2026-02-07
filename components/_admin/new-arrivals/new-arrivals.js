
'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';
// components
import DeleteDialog from '@/components/admin-shared/delete-dialog';
import ArrivalFormDialog from '@/components/admin-shared/arrival-form-dialog';
import Table from '@/components/admin-shared/table';
import Product from '@/components/admin-shared/product-row';
import { getAllNewArrivals, deleteNewArrival as deleteNewArrivalService, createNewArrival, updateNewArrival } from '@/lib/products';
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

export default function AdminNewArrivalsMain({ brands, categories, shops, isVendor, onAddClick }) {
    const searchParams = useSearchParams();

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [selectedArrivalId, setSelectedArrivalId] = useState(null);
    const [formMode, setFormMode] = useState('create');
    const [editingArrival, setEditingArrival] = useState(null);

    const queryClient = useQueryClient();

    const { data, isPending: isLoading } = useQuery({
        queryKey: ['admin-new-arrivals', searchParams.toString(), isVendor],
        queryFn: async () => {
            const arrivals = await getAllNewArrivals();
            return {
                data: arrivals,
                total: arrivals.length,
                totalPages: 1
            };
        }
    });

    const { mutate: deleteArrival, isPending: isDeleting } = useMutation({
        mutationFn: deleteNewArrivalService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-new-arrivals'] });
            queryClient.invalidateQueries({ queryKey: ['new-arrivals'] });
            toast.success('New arrival deleted successfully');
            setDeleteDialogOpen(false);
        },
        onError: (error) => {
            toast.error('Failed to delete new arrival: ' + error.message);
        }
    });

    const { mutate: createArrivalMutation, isPending: isCreating } = useMutation({
        mutationFn: createNewArrival,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-new-arrivals'] });
            queryClient.invalidateQueries({ queryKey: ['new-arrivals'] });
            toast.success('New arrival created successfully');
            setFormDialogOpen(false);
            setEditingArrival(null);
        },
        onError: (error) => {
            toast.error('Failed to create new arrival: ' + error.message);
        }
    });

    const { mutate: updateArrivalMutation, isPending: isUpdating } = useMutation({
        mutationFn: ({ id, data }) => updateNewArrival(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-new-arrivals'] });
            queryClient.invalidateQueries({ queryKey: ['new-arrivals'] });
            toast.success('New arrival updated successfully');
            setFormDialogOpen(false);
            setEditingArrival(null);
        },
        onError: (error) => {
            toast.error('Failed to update new arrival: ' + error.message);
        }
    });

    const handleDeleteClick = (id) => () => {
        setSelectedArrivalId(id);
        setDeleteDialogOpen(true);
    };

    const handleEditClick = (arrival) => () => {
        setEditingArrival({
            name: arrival.name,
            description: arrival.description,
            price: arrival.price || 0,
            image_url: arrival.image_url,
            is_active: arrival.is_active,
            product_details: arrival.product_details || '',
            stockQuantity: arrival.stockQuantity || 0,
            rating: arrival.rating || 0,
            reviews_count: arrival.reviews_count || 0
        });
        setSelectedArrivalId(arrival.id);
        setFormMode('edit');
        setFormDialogOpen(true);
    };

    const handleAddClick = () => {
        setEditingArrival(null);
        setFormMode('create');
        setFormDialogOpen(true);
        if (onAddClick) onAddClick();
    };

    const handleDeleteConfirm = () => {
        if (selectedArrivalId) {
            deleteArrival(selectedArrivalId);
        }
    };

    const handleFormSubmit = (formData) => {
        if (formMode === 'create') {
            createArrivalMutation(formData);
        } else {
            updateArrivalMutation({ id: selectedArrivalId, data: formData });
        }
    };

    const handleFormClose = () => {
        setFormDialogOpen(false);
        setEditingArrival(null);
        setSelectedArrivalId(null);
    };

    const handleDeleteClose = () => {
        setDeleteDialogOpen(false);
        setSelectedArrivalId(null);
    };

    // Expose handleAddClick to parent
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            window.__adminNewArrivalsAddClick = handleAddClick;
        }
        return () => {
            if (typeof window !== 'undefined') {
                delete window.__adminNewArrivalsAddClick;
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
                title="Delete New Arrival"
                description='Are you really sure you want to remove this new arrival? Just making sure before we go ahead with it.'
            />

            <ArrivalFormDialog
                open={formDialogOpen}
                onClose={handleFormClose}
                onSubmit={handleFormSubmit}
                isLoading={isCreating || isUpdating}
                initialData={editingArrival}
                mode={formMode}
                title={formMode === 'create' ? 'Add New Arrival' : 'Edit New Arrival'}
                description={formMode === 'create' ? 'Fill in the details for the new drop.' : 'Update the arrival details.'}
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

AdminNewArrivalsMain.propTypes = {
    brands: PropTypes.array,
    categories: PropTypes.array,
    isVendor: PropTypes.bool,
    onAddClick: PropTypes.func
};
