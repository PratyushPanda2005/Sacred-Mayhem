
'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';
// components
import DeleteDialog from '@/components/admin-shared/delete-dialog';
import Table from '@/components/admin-shared/table';
import OrderRow from '@/components/admin-shared/order-row';
import { getOrdersByAdmin, deleteOrderByAdmin } from '@/lib/supabase-services';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const TABLE_HEAD = [
  { id: 'name', label: 'User' },
  { id: 'total', label: 'Total' },
  { id: 'items', label: 'Items' },
  { id: 'payment', label: 'Paid Via' },
  { id: 'status', label: 'Status' },
  { id: 'createdAt', label: 'Date' },
  { id: '', label: 'Actions' }
];

export default function AdminOrdersMain({ isVendor, shops }) {
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

  const queryClient = useQueryClient();

  const { data, isPending: isLoading } = useQuery({
    queryKey: ['orders', searchParams.toString(), isVendor],
    queryFn: () => getOrdersByAdmin(searchParams.toString())
  });

  const { mutate: deleteOrder, isPending: isDeleting } = useMutation({
    mutationFn: deleteOrderByAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order deleted successfully');
      setOpen(false);
    },
    onError: (error) => {
      toast.error('Failed to delete order: ' + error.message);
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
      deleteOrder(id);
    }
  }

  return (
    <>
      <DeleteDialog
        open={open}
        onClose={handleClose}
        onDelete={handleDelete}
        isLoading={isDeleting}
        title="Delete Order"
        description='Are you sure you want to delete this order?'
      />

      <Table
        headData={TABLE_HEAD}
        data={data}
        isLoading={isLoading}
        row={OrderRow}
        handleClickOpen={handleClickOpen}
        isSearch
      />
    </>
  );
}

AdminOrdersMain.propTypes = {
  isVendor: PropTypes.bool,
  shops: PropTypes.array
};
