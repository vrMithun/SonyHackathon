import { useEffect, useState } from "react";

export interface StockItem {
    productName: string;
    category: string;
    available: number;
    sold: number;
    demanded: number;
    status: string;
}

export const fetchStockData = async (): Promise<StockItem[]> => {
    try {
        const token = localStorage.getItem("accessToken"); // ✅ Ensure correct key

        if (!token) {
            console.error("No authentication token, redirecting to authentication page.");
            window.location.href = "/authentication"; // ✅ Redirect to correct page
            return [];
        }

        const response = await fetch("http://127.0.0.1:8000/api/stock/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (response.status === 401) {
            console.error("Token expired. Redirecting to authentication page...");
            localStorage.removeItem("accessToken");
            window.location.href = "/authentication"; // ✅ Redirect to authentication
            return [];
        }

        if (!response.ok) {
            throw new Error("Failed to fetch stock data");
        }

        const data = await response.json();
        return data.map((item: any) => ({
            productName: item.name,
            category: item.category,
            available: item.available_quantity,
            sold: item.total_shipped,
            demanded: item.total_required_quantity,
            status: item.status,
        }));
    } catch (error) {
        console.error("Error fetching stock data:", error);
        return [];
    }
};

export const useStockData = () => {
    const [stockData, setStockData] = useState<StockItem[]>([]);

    useEffect(() => {
        if (typeof window !== "undefined") { // ✅ Ensures it runs only in the browser
            const token = localStorage.getItem("accessToken");

            if (token) {
                fetchStockData().then(setStockData);
            } else {
                console.error("No authentication token, redirecting to authentication page.");
                window.location.href = "/authentication"; // ✅ Correct redirect path
            }
        }
    }, []);

    return stockData;
};
