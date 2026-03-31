import apiClient from "./apiClient";

export async function createDepositTransaction(payload) {
  const response = await apiClient.post("/transactions/deposit", payload);
  return response.data;
}

export async function createCompleteTransaction(payload) {
  const response = await apiClient.post("/transactions/complete", payload);
  return response.data;
}

export async function getAllTransactions() {
  const response = await apiClient.get("/transactions");
  return response.data;
}
