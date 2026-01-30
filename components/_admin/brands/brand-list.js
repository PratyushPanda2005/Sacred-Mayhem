
'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
// api
import { getBrandsByAdmin, deleteBrandByAdmin } from '@/lib/supabase-services';
// usequery
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// components
import DeleteDialog from '@/components/admin-shared/delete-dialog';
import Table from '@/components/admin-shared/table';
import Brand from '@/components/admin-shared/brand-row';
import { toast } from 'sonner';

const TABLE_HEAD = [
  { id: 'name', label: 'Brands' },
  { id: 'description', label: 'Description' },
  { id: 'status', label: 'Status' },
  { id: 'createdAt', label: 'Date' },
  { id: '', label: 'Actions' }
];

export default function BrandList() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const searchParam = searchParams.get('search');
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

  const queryClient = useQueryClient();

  const { data, isPending: isLoading } = useQuery({
    queryKey: ['brands', searchParam, pageParam],
    queryFn: () => getBrandsByAdmin(+pageParam || 1, searchParam || '')
  });

  const { mutate: deleteBrand, isPending: isDeleting } = useMutation({
    mutationFn: deleteBrandByAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      toast.success('Brand deleted successfully');
      setOpen(false);
    },
    onError: (error) => {
      toast.error('Failed to delete brand: ' + error.message);
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
      deleteBrand(id);
    }
  }

  return (
    <>
      <DeleteDialog
        open={open}
        onClose={handleClose}
        onDelete={handleDelete}
        isLoading={isDeleting}
        title="Delete Brand"
        description='This brand is linked to products. Deleting it will also remove all related data. Are you sure you want to continue?'
      />

      <Table
        headData={TABLE_HEAD}
        data={data}
        isLoading={isLoading}
        row={Brand}
        handleClickOpen={handleClickOpen}
        isSearch // Add search logic later
        filters={[{ ...STATUS_FILTER }]} // Add filter logic later
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
