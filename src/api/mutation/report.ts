import axios from "axios";
import { apiWithAuth } from "../config";
export async function attendToReport({
  reportId,
  remarks,
}: {
  reportId: string;
  remarks: string;
}) {
  try {
    const response = await apiWithAuth({
      method: "patch",
      url: "/api/reports/attend-to",
      data: {
        reportId,
        remarks,
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
