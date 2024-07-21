import axios from "axios";
import { apiWithAuth } from "../config";


export async function getCurrentTarffis() {
    try {
      const response = await apiWithAuth({
        method: "get",
        url: "/api/tariff/current",
      });
  
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "An error occurred");
      }
  
      throw error;
    }
  }
  