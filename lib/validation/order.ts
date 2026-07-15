import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().min(2, "Введіть ваше ім'я"),

  phone: z.string().min(10, "Введіть правильний номер телефону"),

  email: z.string().email("Введіть правильний Email"),

  comment: z.string().optional(),
});

export type OrderFormData = z.infer<typeof orderSchema>;
