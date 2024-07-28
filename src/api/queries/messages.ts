// /api/notification/all-notification?type=ALL
import axios from "axios";
import { apiWithAuth } from "../config";

export async function getAllMessages() {
  try {
    const response = await apiWithAuth({
      method: "get",
      url: "/api/notification/all-notification?type=ALL",
    });

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "An error occurred");
    }

    throw error;
  }
}
