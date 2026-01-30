
'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
// api
import { getCategoriesByAdmin, deleteCategoryByAdmin } from '@/lib/supabase-services';
// usequery
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// components
import DeleteDialog from '@/components/admin-shared/delete-dialog';
import Table from '@/components/admin-shared/table';
import Category from '@/components/admin-shared/category-row';
import { toast } from 'sonner';

const TABLE_HEAD = [
  { id: 'name', label: 'Category' },
  { id: 'description', label: 'Description' },
  { id: 'status', label: 'Status' },
  { id: 'createdAt', label: 'Date' },
  { id: '', label: 'Actions' }
];

export default function CategoryList() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const searchParam = searchParams.get('search');
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

  const queryClient = useQueryClient();

  const { data, isPending: isLoading } = useQuery({
    queryKey: ['categories', searchParam, pageParam],
    queryFn: () => getCategoriesByAdmin(+pageParam || 1, searchParam || '')
  });

  const { mutate: deleteCategory, isPending: isDeleting } = useMutation({
    mutationFn: deleteCategoryByAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category deleted successfully');
      setOpen(false);
    },
    onError: (error) => {
      toast.error('Failed to delete category: ' + error.message);
    }
  });

  const handleClickOpen = (prop) => () => {
    setId(prop);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    if (id) {
      deleteCategory(id);
    }
  }

  return (
    <>
      <DeleteDialog
        open={open}
        onClose={handleClose}
        onDelete={handleDelete}
        isLoading={isDeleting}
        title="Delete Category"
        description='This category is linked to products, subcategories, and child categories. Deleting it will also remove all related data. Are you sure you want to continue?'
      />

      <Table
        headData={TABLE_HEAD}
        data={data}
        isLoading={isLoading}
        row={Category}
        handleClickOpen={handleClickOpen}
        isSearch
        filters={[{ ...STATUS_FILTER }]}
      />
    </>
  );
}

const STATUS_FILTER = {
  name: 'Status',
  param: 'status',
  data: [
    {
      name: 'Active',
      slug: 'active'
    },
    {
      name: 'Inactive',
      slug: 'inactive'
    }
  ]
};
