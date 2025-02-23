import { useState, useEffect } from "react";

export interface StockItem {
  productName: string;
  category: string;
  available: number;
  sold: number;
  demanded: number;
}

export interface CategoryItem {
  name: string;
  product_count: number;
  fill: string; // Ensure fill property exists
}

const BASE_URL = "http://127.0.0.1:8000/api";

export const useStockData = () => {
  const [stockData, setStockData] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchStockData = async () => {
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/stock/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch stock data");

        const data = await response.json();
        console.log("Fetched stock data:", data);

        const formattedData = Array.isArray(data)
          ? data.map((item) => ({
              productName: item.productName || "Unknown",
              category: item.category || "Uncategorized",
              available: item.available || 0,
              sold: item.sold || 0,
              demanded: item.demanded || 0,
            }))
          : [];

        setStockData(formattedData);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setError("Failed to load stock data");
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [token]);

  return { stockData, loading, error };
};

export const useCategoryData = () => {
  const [categoryData, setCategoryData] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/categories/`);

        if (!response.ok) throw new Error("Failed to fetch category data");

        const data = await response.json();
        console.log("Fetched category data:", data);

        const formattedData: CategoryItem[] = data.map(
          (category: { name: string; product_count: number }, index: number) => ({
            name: category.name,
            product_count: category.product_count,
            fill: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28AFF"][index % 5], // Assign colors dynamically
          })
        );

        setCategoryData(formattedData);
      } catch (error) {
        console.error("Error fetching category data:", error);
        setError("Failed to load category data");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, []);

  return { categoryData, loading, error };
};
