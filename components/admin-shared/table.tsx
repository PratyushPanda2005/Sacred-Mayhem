
'use client';

import React from 'react';
import {
    Table as TableRoot,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface HeadCell {
    id: string;
    label: string;
}

interface TableProps {
    headData: HeadCell[];
    data: any;
    isLoading: boolean;
    row: React.ComponentType<any>;
    handleClickOpen?: (id: string) => () => void;
    handleEditClick?: (row: any) => () => void;
    isSearch?: boolean;
    filters?: any;
}

export default function Table({
    headData,
    data,
    isLoading,
    row: RowComponent,
    handleClickOpen,
    handleEditClick,
}: TableProps) {
    return (
        <Card className="w-full">
            <div className="rounded-md border">
                <TableRoot>
                    <TableHeader>
                        <TableRow>
                            {headData.map((head) => (
                                <TableHead key={head.id}>{head.label}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell colSpan={headData.length}>
                                        <Skeleton className="h-12 w-full" />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : data?.data?.length > 0 ? (
                            data.data.map((item: any) => (
                                <RowComponent
                                    key={item.id}
                                    row={item}
                                    handleClickOpen={handleClickOpen}
                                    handleEditClick={handleEditClick}
                                />
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={headData.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </TableRoot>
            </div>
        </Card>
    );
}
