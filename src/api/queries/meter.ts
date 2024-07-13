import axios from "axios";
import { apiWithAuth } from "../config";

export async function getAllMeters() {
  try {
    const response = await apiWithAuth({
      method: "get",
      url: "/api/meter/all",
    });

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "An error occurred");
    }

    throw error;
  }
}
