
'use client';

import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { IconButton } from '@mui/material'; // Keeping MUI for now as widely used in admins or switch to Lucide
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

export default function BrandRow({ row, handleClickOpen }: any) {
    const { id, name, description, status, created_at } = row;

    return (
        <TableRow>
            <TableCell className="font-medium">{name}</TableCell>
            <TableCell>{description || '-'}</TableCell>
            <TableCell>
                <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                >
                    {status}
                </span>
            </TableCell>
            <TableCell>{created_at ? format(new Date(created_at), 'dd MMM yyyy') : '-'}</TableCell>
            <TableCell>
                <div className="flex gap-2">
                    {/* Using Button with icon since generic IconButton might be missing */}
                    <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleClickOpen ? handleClickOpen(id) : undefined}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
}
