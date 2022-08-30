import create from "zustand";
import { FormState } from "../types/form";

export const useFormState = create<FormState>((set) => ({
  update: (value) => set(() => ({ data: value })),
}));
