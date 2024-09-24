import { z } from "zod";
import { interestCategories } from "@/app/[locale]/register/page";

export const registrationSchema = z.object({
  email: z.string().email("Invalid email"),
  name: z.string().min(6, "Name is required to have 6 or more letters"),
  password: z.string().min(6, "Password must be at least 8 characters"),
  lastName: z.string().optional(),
  mainField: z.enum(interestCategories, {
    errorMap: () => ({ message: "Please select a valid category." }),
  }),
  country: z.string().min(1, "Country is required"),
});
