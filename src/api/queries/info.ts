import axios from "axios";
import { apiWithAuth } from "../config";

export async function getAdminInfo() {
  try {
    const response = await apiWithAuth({
      method: "get",
      url: "/admin/auth/details",
    });

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "An error occurred");
    }

    throw error;
  }
}

export async function getStats() {
  try {
    const response = await apiWithAuth({
      method: "get",
      url: "/admin/auth/stats",
    });

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "An error occurred");
    }

    throw error;
  }
}
