import axios from "axios";
import { apiNoAuth } from "../config";

export async function signInMutation({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const response = await apiNoAuth({
      method: "post",
      url: "/admin/auth/login",
      data: {
        email,
        password,
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
