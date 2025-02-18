"use client";
import React from 'react';
import { MOCK_PRODUCTS } from '../../app/data/mockData';

interface ProductsTabProps {
  searchQuery: string;
  selectedCategory: string;
}

export const ProductsTab: React.FC<ProductsTabProps> = ({ searchQuery, selectedCategory }) => {
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
      product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="grid grid-cols-4 gap-4">
      {filteredProducts.map(product => (
        <div key={product.id} className="bg-card text-card-foreground p-4 rounded-[--radius] shadow-sm">
          <img 
            src={product.image}
            alt={product.name}
            className="w-full aspect-square object-cover rounded-[--radius] mb-4"
          />
          <h3 className="font-medium">{product.name}</h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-bold">${product.price}</span>
            <span className="text-sm text-primary">{product.stock} in stock</span>
          </div>
          <button className="w-full mt-4 bg-primary text-primary-foreground py-2 rounded-[--radius] hover:bg-primary/90 transition-colors">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};