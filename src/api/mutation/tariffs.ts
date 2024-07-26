import axios from "axios";
import { apiWithAuth } from "../config";
export async function createNewTariff({
  name,
  description,
  rate,
  startDate,
  endDate,
}: {
  name: string;
  description: string;
  rate: string;
  startDate: string;
  endDate: string;
}) {
  try {
    const response = await apiWithAuth({
      method: "post",
      url: "/api/tariff/create",
      data: {
        name,
        description,
        rate,
        effectiveFrom: new Date(startDate).toISOString(),
        effectiveTo: new Date(endDate).toISOString(),
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
export async function toggleTariffStatus({ id }: { id: string }) {
  try {
    const response = await apiWithAuth({
      method: "patch",
      url: "/api/tariff/toggle",
      data: {
        tariffId: id,
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
export async function changeTariffRate({
  id,
  newRate,
  effectiveTo,
}: {
  id: string;
  newRate: number;
  effectiveTo: string;
}) {
  try {
    const response = await apiWithAuth({
      method: "patch",
      url: "/api/tariff/change-rate",
      data: {
        tariffId: id,
        newRate,
        effectiveTo,
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
