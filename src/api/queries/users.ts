import axios from "axios";
import { apiWithAuth } from "../config";

export async function getAllUser() {
  try {
    const response = await apiWithAuth({
      method: "get",
      url: "/admin/auth/all-users",
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "An error occurred");
    }
    throw error;
  }
}


