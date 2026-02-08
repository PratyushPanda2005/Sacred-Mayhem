'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
// components
import DeleteDialog from '@/components/admin-shared/delete-dialog';
import CollectionFormDialog from '@/components/admin-shared/collection-form-dialog';
import Table from '@/components/admin-shared/table';
import { getCollections, deleteCollection as deleteCollectionService, createCollection, updateCollection } from '@/lib/collections';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const TABLE_HEAD = [
    { id: 'title', label: 'Title' },
    { id: 'season', label: 'Season' },
    { id: 'piece_count', label: 'Pieces' },
    { id: 'is_featured', label: 'Featured' },
    { id: 'createdAt', label: 'Date' },
    { id: '', label: 'Actions' }
];

const CollectionRow = ({ row, handleClickOpen, handleEditClick }) => {
    return (
        <tr className="hover:bg-gray-50 border-b transition-colors">
            <td className="p-4">
                <div className="flex items-center gap-3">
                    <img src={row.image_url || '/placeholder.svg'} alt={row.title} className="w-10 h-10 object-cover rounded" />
                    <span className="font-medium text-gray-900">{row.title}</span>
                </div>
            </td>
            <td className="p-4 text-gray-600">{row.season}</td>
            <td className="p-4 text-gray-600">{row.piece_count}</td>
            <td className="p-4">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.is_featured ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {row.is_featured ? 'Yes' : 'No'}
                </span>
            </td>
            <td className="p-4 text-gray-500">{new Date(row.created_at).toLocaleDateString()}</td>
            <td className="p-4">
                <div className="flex gap-2">
                    <button onClick={handleEditClick(row)} className="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                    <button onClick={handleClickOpen(row.id)} className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                </div>
            </td>
        </tr>
    );
};

export default function AdminCollectionsMain() {
    const searchParams = useSearchParams();

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [selectedCollectionId, setSelectedCollectionId] = useState(null);
    const [formMode, setFormMode] = useState('create');
    const [editingCollection, setEditingCollection] = useState(null);

    const queryClient = useQueryClient();

    const { data, isPending: isLoading } = useQuery({
        queryKey: ['admin-collections'],
        queryFn: async () => {
            const collections = await getCollections();
            return {
                data: collections,
                total: collections.length,
                totalPages: 1
            };
        }
    });

    const { mutate: deleteCollection, isPending: isDeleting } = useMutation({
        mutationFn: deleteCollectionService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-collections'] });
            toast.success('Collection deleted successfully');
            setDeleteDialogOpen(false);
        },
        onError: (error) => {
            toast.error('Failed to delete collection: ' + error.message);
        }
    });

    const { mutate: createCollectionMutation, isPending: isCreating } = useMutation({
        mutationFn: createCollection,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-collections'] });
            toast.success('Collection created successfully');
            setFormDialogOpen(false);
            setEditingCollection(null);
        },
        onError: (error) => {
            toast.error('Failed to create collection: ' + error.message);
        }
    });

    const { mutate: updateCollectionMutation, isPending: isUpdating } = useMutation({
        mutationFn: ({ id, data }) => updateCollection(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-collections'] });
            toast.success('Collection updated successfully');
            setFormDialogOpen(false);
            setEditingCollection(null);
        },
        onError: (error) => {
            toast.error('Failed to update collection: ' + error.message);
        }
    });

    const handleDeleteClick = (id) => () => {
        setSelectedCollectionId(id);
        setDeleteDialogOpen(true);
    };

    const handleEditClick = (collection) => () => {
        setEditingCollection(collection);
        setSelectedCollectionId(collection.id);
        setFormMode('edit');
        setFormDialogOpen(true);
    };

    const handleAddClick = () => {
        setEditingCollection(null);
        setFormMode('create');
        setFormDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (selectedCollectionId) {
            deleteCollection(selectedCollectionId);
        }
    };

    const handleFormSubmit = (formData) => {
        if (formMode === 'create') {
            createCollectionMutation(formData);
        } else {
            updateCollectionMutation({ id: selectedCollectionId, data: formData });
        }
    };

    const handleFormClose = () => {
        setFormDialogOpen(false);
        setEditingCollection(null);
        setSelectedCollectionId(null);
    };

    const handleDeleteClose = () => {
        setDeleteDialogOpen(false);
        setSelectedCollectionId(null);
    };

    // Expose handleAddClick to parent
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            window.__adminCollectionsAddClick = handleAddClick;
        }
        return () => {
            if (typeof window !== 'undefined') {
                delete window.__adminCollectionsAddClick;
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
                title="Delete Collection"
                description='Are you really sure you want to remove this collection?'
            />

            <CollectionFormDialog
                open={formDialogOpen}
                onClose={handleFormClose}
                onSubmit={handleFormSubmit}
                isLoading={isCreating || isUpdating}
                initialData={editingCollection}
                mode={formMode}
            />

            <Table
                headData={TABLE_HEAD}
                data={data}
                isLoading={isLoading}
                row={CollectionRow}
                handleClickOpen={handleDeleteClick}
                handleEditClick={handleEditClick}
                isSearch
            />
        </>
    );
}
