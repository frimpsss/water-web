import axios from "axios";
import { apiWithAuth } from "../config";
export async function generateBills({ month }: { month: string }) {
  try {
    const response = await apiWithAuth({
      method: "post",
      url: "/api/bills/generate",
      data: {
        billingMonth: month,
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "An error occurred");
    }
    throw error;
  }
}
