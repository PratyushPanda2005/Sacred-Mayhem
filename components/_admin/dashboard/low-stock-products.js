
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LowStockProducts({ isVendor }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Low Stock Products</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">No low stock products</p>
      </CardContent>
    </Card>
  );
}
