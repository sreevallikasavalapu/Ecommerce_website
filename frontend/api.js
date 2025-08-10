const API_URL = '/api/Product'; // 👈 relative path, not full URL
export const getAllProducts = async () => {
    const res = await fetch(API_URL);
    return res.json();
  };
  
// Search products with query parameters
export const searchProducts = async ({ search, category }) => {
  const queryParams = new URLSearchParams();
  if (search) queryParams.append("search", search);
  if (category) queryParams.append("category", category);
  
  const response = await fetch(`${API_URL}/search?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to search products");
  }
  return response.json();
};
