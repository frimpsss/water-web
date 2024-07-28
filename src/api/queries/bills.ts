import axios from "axios";
import {apiWithAuth } from "../config";

export async function getAllBills() {
  try {
    const response = await apiWithAuth({
      method: "get",
      url: "/api/bills/all-bills",
    });

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "An error occurred");
    }

    throw error;
  }
}
