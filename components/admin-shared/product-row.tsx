
'use client';

import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

export default function ProductRow({ row, handleClickOpen, handleEditClick }: any) {
    const { id, name, price, stockQuantity, inventoryType, rating, created_at } = row;

    return (
        <TableRow>
            <TableCell className="font-medium">{name}</TableCell>
            <TableCell>${price || 0}</TableCell>
            <TableCell>{stockQuantity || '-'}</TableCell>
            <TableCell>
                <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${row.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                >
                    {row.is_active ? 'Active' : 'Inactive'}
                </span>
            </TableCell>
            <TableCell>{rating || '-'}</TableCell>
            <TableCell>{created_at ? format(new Date(created_at), 'dd MMM yyyy') : '-'}</TableCell>
            <TableCell>
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleEditClick ? handleEditClick(row) : undefined}
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleClickOpen ? handleClickOpen(id) : undefined}
                    >
                        <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
}
