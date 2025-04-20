'use client';

import React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Box, styled } from '@mui/material';

const data = [
  {
    name: 'Week 1',
    sales: 120,
    support: 80,
    kitchen: 70,
    delivery: 60,
    admin: 40,
    cleaning: 30,
  },
  {
    name: 'Week 2',
    sales: 110,
    support: 85,
    kitchen: 75,
    delivery: 65,
    admin: 45,
    cleaning: 35,
  },
  {
    name: 'Week 3',
    sales: 130,
    support: 90,
    kitchen: 80,
    delivery: 70,
    admin: 50,
    cleaning: 40,
  },
  {
    name: 'Week 4',
    sales: 125,
    support: 95,
    kitchen: 85,
    delivery: 75,
    admin: 55,
    cleaning: 45,
  },
];

const ChartContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
  borderRadius: '0.375rem',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)', // From global.css
  '&:hover': {
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', // From global.css
  },
}));

export function ManagerReportsChart() {
  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis
            dataKey="name"
            stroke="#64748b" // Muted color from global.css
            fontSize={12}
            tickLine={false}
            axisLine={false}
            fontFamily="'Inter', 'Segoe UI', 'Helvetica Neue', 'Arial', sans-serif"
          />
          <YAxis
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}h`}
            fontFamily="'Inter', 'Segoe UI', 'Helvetica Neue', 'Arial', sans-serif"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '0.375rem',
              fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
            }}
            labelStyle={{ color: '#03306b', fontWeight: 600 }}
          />
          <Legend />
          <Bar dataKey="sales" name="Sales" fill="#03306b" radius={[4, 4, 0, 0]} />
          <Bar dataKey="support" name="Support" fill="#1e40af" radius={[4, 4, 0, 0]} />
          <Bar dataKey="kitchen" name="Kitchen" fill="#c61111" radius={[4, 4, 0, 0]} />
          <Bar dataKey="delivery" name="Delivery" fill="#dc2626" radius={[4, 4, 0, 0]} />
          <Bar dataKey="admin" name="Admin" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
          <Bar dataKey="cleaning" name="Cleaning" fill="#991b1b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}