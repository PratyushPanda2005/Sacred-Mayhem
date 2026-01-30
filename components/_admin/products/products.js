
'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';
// components
import DeleteDialog from '@/components/admin-shared/delete-dialog';
import ProductFormDialog from '@/components/admin-shared/product-form-dialog';
import Table from '@/components/admin-shared/table';
import Product from '@/components/admin-shared/product-row';
import { getAllProducts, deleteProduct as deleteProductService, createProduct, updateProduct } from '@/lib/products';
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

export default function AdminProductsMain({ brands, categories, shops, isVendor, onAddClick }) {
  const searchParams = useSearchParams();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [formMode, setFormMode] = useState('create');
  const [editingProduct, setEditingProduct] = useState(null);

  const queryClient = useQueryClient();

  const { data, isPending: isLoading } = useQuery({
    queryKey: ['admin-products', searchParams.toString(), isVendor],
    queryFn: async () => {
      const products = await getAllProducts();
      return {
        data: products,
        total: products.length,
        totalPages: 1
      };
    }
  });

  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: deleteProductService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['shop-products'] });
      queryClient.invalidateQueries({ queryKey: ['home-products'] });
      toast.success('Product deleted successfully');
      setDeleteDialogOpen(false);
    },
    onError: (error) => {
      toast.error('Failed to delete product: ' + error.message);
    }
  });

  const { mutate: createProductMutation, isPending: isCreating } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['shop-products'] });
      queryClient.invalidateQueries({ queryKey: ['home-products'] });
      toast.success('Product created successfully');
      setFormDialogOpen(false);
      setEditingProduct(null);
    },
    onError: (error) => {
      toast.error('Failed to create product: ' + error.message);
    }
  });

  const { mutate: updateProductMutation, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['shop-products'] });
      queryClient.invalidateQueries({ queryKey: ['home-products'] });
      toast.success('Product updated successfully');
      setFormDialogOpen(false);
      setEditingProduct(null);
    },
    onError: (error) => {
      toast.error('Failed to update product: ' + error.message);
    }
  });

  const handleDeleteClick = (id) => () => {
    setSelectedProductId(id);
    setDeleteDialogOpen(true);
  };

  const handleEditClick = (product) => () => {
    setEditingProduct({
      name: product.name,
      description: product.description,
      price: product.price || 0,
      image_url: product.image_url,
      is_active: product.is_active
    });
    setSelectedProductId(product.id);
    setFormMode('edit');
    setFormDialogOpen(true);
  };

  const handleAddClick = () => {
    setEditingProduct(null);
    setFormMode('create');
    setFormDialogOpen(true);
    if (onAddClick) onAddClick();
  };

  const handleDeleteConfirm = () => {
    if (selectedProductId) {
      deleteProduct(selectedProductId);
    }
  };

  const handleFormSubmit = (formData) => {
    if (formMode === 'create') {
      createProductMutation(formData);
    } else {
      updateProductMutation({ id: selectedProductId, data: formData });
    }
  };

  const handleFormClose = () => {
    setFormDialogOpen(false);
    setEditingProduct(null);
    setSelectedProductId(null);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
    setSelectedProductId(null);
  };

  // Expose handleAddClick to parent
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__adminProductsAddClick = handleAddClick;
    }
    return () => {
      if (typeof window !== 'undefined') {
        delete window.__adminProductsAddClick;
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
        title="Delete Product"
        description='Are you really sure you want to remove this product? Just making sure before we go ahead with it.'
      />

      <ProductFormDialog
        open={formDialogOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        isLoading={isCreating || isUpdating}
        initialData={editingProduct}
        mode={formMode}
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

AdminProductsMain.propTypes = {
  brands: PropTypes.array,
  categories: PropTypes.array,
  isVendor: PropTypes.bool,
  onAddClick: PropTypes.func
};
