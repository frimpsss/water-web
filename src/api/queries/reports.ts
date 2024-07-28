import axios from "axios";
import { apiWithAuth } from "../config";

export async function getAllReports() {
  try {
    const response = await apiWithAuth({
      method: "get",
      url: "/api/reports/all-reports",
    });

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "An error occurred");
    }

    throw error;
  }
}
