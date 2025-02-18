"use client";
import React from 'react';
import { MOCK_ORDERS } from '../../app/data/mockData';

export const OrdersTab = () => (
  <div className="bg-card text-card-foreground rounded-[--radius] shadow-sm p-6">
    <h2 className="text-xl font-medium mb-6">Your Orders</h2>
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left pb-4">Order ID</th>
          <th className="text-left pb-4">Date</th>
          <th className="text-left pb-4">Items</th>
          <th className="text-left pb-4">Total</th>
          <th className="text-left pb-4">Status</th>
        </tr>
      </thead>
      <tbody>
        {MOCK_ORDERS.map(order => (
          <tr key={order.id} className="border-b">
            <td className="py-4">{order.id}</td>
            <td className="py-4">{order.date}</td>
            <td className="py-4">{order.items}</td>
            <td className="py-4">${order.total}</td>
            <td className="py-4">
              <span className={`px-2 py-1 rounded-full text-sm ${
                order.status === 'Delivered' 
                  ? 'bg-success/10 text-success' 
                  : 'bg-primary/10 text-primary'
              }`}>
                {order.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);