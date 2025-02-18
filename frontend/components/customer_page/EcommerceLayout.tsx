"use client";
import React, { useState } from 'react';
import { DashboardTab } from './DashboardTab';
import { ProductsTab } from './ProductsTab';
import { OrdersTab } from './OrdersTab';
import { ProfileTab } from './ProfileTab';

const EcommerceLayout = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', color: 'text-primary' },
    { id: 'products', label: 'Products', icon: '🛍️', color: 'text-primary' },
    { id: 'orders', label: 'Orders', icon: '📦', color: 'text-primary' },
    { id: 'profile', label: 'Profile', icon: '👤', color: 'text-primary' }
  ];

  const categories = ['All', 'Electronics', 'Household', 'Industrial'];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'products':
        return <ProductsTab searchQuery={searchQuery} selectedCategory={selectedCategory} />;
      case 'orders':
        return <OrdersTab />;
      case 'profile':
        return <ProfileTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-primary">Store Name</h1>
            <div className="flex items-center space-x-2 bg-muted/50 p-2 rounded-[--radius] w-96">
              <span className="text-muted-foreground"></span>
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent w-full outline-none text-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-6">
            {/* Cart Button with Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowCartDropdown(!showCartDropdown)}
                className="flex items-center space-x-2 hover:text-primary transition-colors"
              >
                <span className="text-2xl">🛒</span>
                <span className="text-sm">Cart</span>
              </button>
              
              {showCartDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-popover text-popover-foreground rounded-[--radius] shadow-lg p-4 z-50">
                  <h3 className="font-medium mb-2">Shopping Cart</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">No items in cart</p>
                    <button 
                      className="w-full bg-primary text-primary-foreground py-2 rounded-[--radius] hover:bg-primary/90 transition-colors"
                      onClick={() => setShowCartDropdown(false)}
                    >
                      View Cart
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Button with Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-2 hover:text-primary transition-colors"
              >
                <span className="text-2xl">👤</span>
                <span className="text-sm">Account</span>
              </button>
              
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-popover text-popover-foreground rounded-[--radius] shadow-lg p-2 z-50">
                  <button 
                    onClick={() => {
                      setActiveTab('profile');
                      setShowProfileDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 rounded-[--radius] hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    Profile Settings
                  </button>
                  <button 
                    className="w-full text-left px-4 py-2 rounded-[--radius] hover:bg-accent hover:text-accent-foreground transition-colors text-destructive"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-2">
            <nav className="space-y-2">
              {tabs.map((tab: { id: string; label: string; icon: string; color: string }) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-2 rounded-[--radius] flex items-center space-x-2 transition-colors ${
                    activeTab === tab.id
                      ? 'bg-accent text-accent-foreground font-medium'
                      : 'hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>

            {activeTab === 'products' && (
              <div className="mt-8">
                <h3 className="font-medium mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category: string) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-[--radius] transition-colors ${
                        selectedCategory === category
                          ? 'bg-accent text-accent-foreground'
                          : 'hover:bg-accent hover:text-accent-foreground'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content Area */}
          <div className="col-span-10">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};
export default EcommerceLayout;