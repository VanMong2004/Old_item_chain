import apiClient from "./apiClient";

export async function getAllProducts() {
  const response = await apiClient.get("/products");
  return response.data;
}

export async function getProductById(id) {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
}

export async function createProduct(productData) {
  const response = await apiClient.post("/products", productData);
  return response.data;
}
