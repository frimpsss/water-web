import axios from "axios";
import { apiWithAuth } from "../config";
export async function assignMeter({
  id,
  gpsAddress,
  meterType,
}: {
  id: string;
  gpsAddress: string;
  meterType: string;
}) {
  try {
    const response = await apiWithAuth({
      method: "post",
      url: "/api/meter/create",
      data: {
        owner: id,
        gpsAddress,
        meterType,
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
