const API_BASE_URL = "http://127.0.0.1:8000";

export async function fetchProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error("API error:", error);
    return [];
  }
}
