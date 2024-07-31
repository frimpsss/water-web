import axios from "axios";
import { apiWithAuth } from "../config";

export async function getAllTxns() {
  try {
    const response = await apiWithAuth({
      method: "get",
      url: "/api/payments/all-transactions",
    });

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "An error occurred");
    }

    throw error;
  }
}

export async function recentTxns() {
  try {
    const response = await apiWithAuth({
      method: "get",
      url: "/api/payments/recent-transactions",
    });

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "An error occurred");
    }

    throw error;
  }
}
