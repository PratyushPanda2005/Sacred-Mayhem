
'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';

// Icons
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { PiUsersThree } from 'react-icons/pi';
import { BiSolidShoppingBags } from 'react-icons/bi';
import { GrWorkshop } from 'react-icons/gr';
import { LuFileClock } from 'react-icons/lu';
import { FiFileText } from 'react-icons/fi';

// Components
import DashboardCard from '@/components/cards/dashboard-card';
import LowStockProducts from '@/components/_admin/dashboard/low-stock-products';
// We need to create/mock BestSelling as well if it's missing, let's assume I need to create it or imports will fail.
// I'll create a simple placeholder for BestSelling in the same folder first.
import BestSelling from './best-selling';

// Dynamic charts with updated paths
const OrderChart = dynamic(() => import('@/components/charts/order'), { ssr: false });
const SaleChart = dynamic(() => import('@/components/charts/sale'), { ssr: false });
const IncomeChart = dynamic(() => import('@/components/charts/income'), { ssr: false });

// API
import { adminDashboardAnalytics } from '@/lib/supabase-services';

// UI
import { Grid, Box } from '@mui/material'; // Keeping MUI specific grid if desired or replace with Tailwind grid
// Since the user asked for this specific code, I will try to keep it as close as possible but adapted to imports.
// However, Grid size prop is MUI v6 or very specific. Standard MUI Grid uses items/xs/md.
// I'll assume they have MUI installed (I saw it in package.json) and standard Grid usage.

export default function Dashboard({ isVendor }) {
  const { data: dashboard, isPending: isLoading } = useQuery({
    queryKey: [isVendor ? 'vendor-analytics' : 'dashboard-analytics'],
    // Mocking vendor function or using same for now
    queryFn: adminDashboardAnalytics,
    refetchInterval: 30000
  });

  const data = dashboard?.data || {};
  const daily_earning = data?.dailyEarning;
  const daily_orders = data?.dailyOrders;
  const daily_users = data?.totalUsers;
  const totalProducts = data?.totalProducts;
  const sales_report = data?.salesReport;
  const income_report = data?.incomeReport;
  const commission_report = data?.commissionReport;
  const orders_report = data?.ordersReport;
  const bestSellingProducts = data?.bestSellingProducts;
  const totalVendors = data?.totalVendors;
  const totalPendingOrders = data?.totalPendingOrders;

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={3}>
        <Grid item md={isVendor ? 3 : 4} sm={6} xs={12}>
          <DashboardCard
            // color="primary" 
            isAmount
            icon={<AiOutlineDollarCircle size={24} />}
            title="Daily Earning"
            value={daily_earning}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item md={isVendor ? 3 : 4} sm={6} xs={12}>
          <DashboardCard
            // color="secondary"
            title="Daily Orders"
            value={daily_orders}
            icon={<FiFileText size={24} />}
            isLoading={isLoading}
          />
        </Grid>
        {!isVendor && (
          <Grid item md={4} sm={6} xs={12}>
            <DashboardCard
              // color="warning"
              title="Total Users"
              value={daily_users}
              icon={<PiUsersThree size={30} />}
              isLoading={isLoading}
            />
          </Grid>
        )}

        <Grid item md={isVendor ? 3 : 4} sm={6} xs={12}>
          <DashboardCard
            // color="error"
            title="Total Products"
            value={totalProducts}
            icon={<BiSolidShoppingBags size={24} />}
            isLoading={isLoading}
          />
        </Grid>
        {!isVendor && (
          <Grid item xs={12} sm={isVendor ? 12 : 6} md={4}>
            <DashboardCard
              // color="success"
              title="Total Shop"
              value={totalVendors}
              icon={<GrWorkshop size={24} />}
              isLoading={isLoading}
            />
          </Grid>
        )}

        <Grid item xs={12} sm={6} md={isVendor ? 3 : 4}>
          <DashboardCard
            // color="#01838F"
            title="Pending Orders"
            value={totalPendingOrders}
            icon={<LuFileClock size={24} />}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item lg={7} md={7} xs={12}>
          <SaleChart data={sales_report} isLoading={isLoading} />
        </Grid>
        <Grid item lg={5} md={5} xs={12}>
          <OrderChart data={orders_report} isLoading={isLoading} />
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <BestSelling data={bestSellingProducts} loading={isLoading} isVendor={isVendor} />
        </Grid>
        <Grid item lg={8} md={8} xs={12}>
          <IncomeChart
            income={income_report}
            commission={commission_report}
            isVendor={isVendor}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <LowStockProducts isVendor={isVendor} />
        </Grid>
      </Grid>
    </Box>
  );
}
