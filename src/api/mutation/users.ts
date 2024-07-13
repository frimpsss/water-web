import axios from "axios";
import { apiWithAuth } from "../config";
export async function verifyUser({
  id,
  accept,
}: {
  id: string;
  accept: boolean;
}) {
  try {
    const response = await apiWithAuth({
      method: "patch",
      url: "/admin/auth/verify-user",
      data: {
        id,
        status: accept,
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
