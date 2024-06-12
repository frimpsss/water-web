import { create } from "zustand";

interface IAdminDetails {
  details: {
    name: string;
    role: string;
    email: string;
  };
  setDetails: (d: IAdminDetails["details"]) => void;
}
export const useAdminInfo = create<IAdminDetails>()((set) => ({
  details: {
    name: "",
    role: "",
    email: "",
  },
  setDetails(d: IAdminDetails["details"]) {
    set((state) => {
      return { details: d };
    });
  },
}));
