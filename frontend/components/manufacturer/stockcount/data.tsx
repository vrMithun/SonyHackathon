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
  fill: string;
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
  

  export function generateCategoryData(stockData: StockItem[]): CategoryItem[] {
    const categoryMap: { [key: string]: number } = {};
  
    stockData.forEach((item) => {
      if (categoryMap[item.category]) {
        categoryMap[item.category] += item.available;
      } else {
        categoryMap[item.category] = item.available;
      }
    });
  
    return Object.keys(categoryMap).map((category) => ({
      name: category,
      value: categoryMap[category],
      fill: getRandomColor(),
    }));
  }
  
  export const categoryData = generateCategoryData(stockData);