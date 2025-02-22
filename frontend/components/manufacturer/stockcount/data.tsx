export interface StockItem {
    productName: string;
    stock: string;
    available: number;
    sold: number;
    category: string;
    demanded: number;
    
  }
  
export interface CategoryItem {
  name: string;
  value: number;
}

export function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
/*
export async function fetchStockData(): Promise<StockItem[]> {
  const response = await fetch('/api/stock');
  if (!response.ok) {
    throw new Error('Failed to fetch stock data');
  }
  const data = await response.json();
  return data.stockData;
}

export async function fetchCategoryData(): Promise<CategoryItem[]> {
  const response = await fetch('/api/stock');
  if (!response.ok) {
    throw new Error('Failed to fetch category data');
  }
  const data = await response.json();
  return data.categoryData.map((item: CategoryItem) => ({
    ...item,
    fill: getRandomColor(),
  }));
}
  */
  export const stockData: StockItem[] = [
    { 
      productName: "iPhone 13",
      stock: "Electronics", 
      available: 150, 
      sold: 50, 
      category: "tech", 
      demanded: 200, 
      
    },
    { 
      productName: "Plastic Containers",
      stock: "Plastics", 
      available: 300, 
      sold: 120, 
      category: "materials", 
      demanded: 350, 
   
    },
    { 
      productName: "Coffee Maker",
      stock: "Household", 
      available: 200, 
      sold: 75, 
      category: "home", 
      demanded: 180, 
      
    },
    { 
      productName: "Car Battery",
      stock: "Automotive", 
      available: 100, 
      sold: 25, 
      category: "vehicles", 
      demanded: 150, 
     
    },
    { 
      productName: "Power Tools",
      stock: "Industrial", 
      available: 250, 
      sold: 90, 
      category: "manufacturing", 
      demanded: 280, 
     
    },
    { 
      productName: "Gaming Console",
      stock: "Electronics", 
      available: 75, 
      sold: 45, 
      category: "tech", 
      demanded: 200, 
      
    },
    { 
      productName: "Smart Watch",
      stock: "Electronics", 
      available: 80, 
      sold: 60, 
      category: "tech", 
      demanded: 150, 
    
    }
  ];
  
  export const categoryData = [
    { name: "Electronics", value: 150, fill: getRandomColor() },
    { name: "Plastics", value: 300, fill: getRandomColor() },
    { name: "Household", value: 200, fill: getRandomColor() },
    { name: "Automotive", value: 100, fill: getRandomColor() },
    { name: "Industrial", value: 250, fill: getRandomColor() }
  ];