"use client";
import React from 'react';
import { MOCK_ORDERS } from '@/app/data/mockData';

export const DashboardTab = () => (
  <div className="space-y-6">
    <div className="bg-primary text-primary-foreground rounded-[--radius] p-6">
      <h2 className="text-2xl font-semibold">Welcome back, John!</h2>
      <p className="mt-2">You have 2 active orders</p>
    </div>
    
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-card text-card-foreground p-4 rounded-[--radius] shadow-sm">
        <h3 className="font-medium text-muted-foreground">Total Orders</h3>
        <p className="text-2xl font-bold mt-2">24</p>
      </div>
      <div className="bg-card text-card-foreground p-4 rounded-[--radius] shadow-sm">
        <h3 className="font-medium text-muted-foreground">Total Spent</h3>
        <p className="text-2xl font-bold mt-2">$4,299.00</p>
      </div>
      <div className="bg-card text-card-foreground p-4 rounded-[--radius] shadow-sm">
        <h3 className="font-medium text-muted-foreground">Active Cart Items</h3>
        <p className="text-2xl font-bold mt-2">3</p>
      </div>
    </div>

    <div className="bg-card text-card-foreground rounded-[--radius] shadow-sm p-6">
      <h3 className="text-lg font-medium mb-4">Recent Orders</h3>
      <div className="space-y-4">
        {MOCK_ORDERS.map(order => (
          <div key={order.id} className="flex items-center justify-between border-b pb-4">
            <div>
              <p className="font-medium">{order.id}</p>
              <p className="text-sm text-muted-foreground">{order.date}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">${order.total}</p>
              <p className="text-sm text-muted-foreground">{order.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);