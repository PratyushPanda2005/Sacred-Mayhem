
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BestSelling({ data, loading, isVendor }) {
  if (loading) return <div>Loading...</div>;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Best Selling Products</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">No data available</p>
      </CardContent>
    </Card>
  );
}
