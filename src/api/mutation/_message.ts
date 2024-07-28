import axios from "axios";
import { apiWithAuth } from "../config";
export async function sendMessage({
  title,
  message,
  sendPushNotif,
}: {
  title: string;
  message: string;
  sendPushNotif: boolean;
}) {
  try {
    const response = await apiWithAuth({
      method: "post",
      url: "/api/notification/create",
      data: {
        title,
        message,
        pushNotif: sendPushNotif,
        type: "GENERAL",
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
