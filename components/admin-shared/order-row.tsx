
'use client';

import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

export default function OrderRow({ row, handleClickOpen }: any) {
    const { id, user_name, total, items_count, payment_method, status, created_at } = row;

    return (
        <TableRow>
            <TableCell className="font-medium">{user_name || 'Guest'}</TableCell>
            <TableCell>{total}</TableCell>
            <TableCell>{items_count}</TableCell>
            <TableCell>{payment_method}</TableCell>
            <TableCell>
                <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${status === 'delivered' ? 'bg-green-100 text-green-800' :
                            status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                status === 'canceled' ? 'bg-red-100 text-red-800' : 'bg-gray-100'
                        }`}
                >
                    {status}
                </span>
            </TableCell>
            <TableCell>{created_at ? format(new Date(created_at), 'dd MMM yyyy') : '-'}</TableCell>
            <TableCell>
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleClickOpen ? handleClickOpen(id) : undefined}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
}
