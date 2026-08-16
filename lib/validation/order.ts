import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().min(2, "Введіть ваше ім'я"),

  phone: z.string().min(10, "Введіть правильний номер телефону"),

  email: z.string().email("Введіть правильний Email"),

  comment: z.string().optional(),
});

export type OrderFormData = z.infer<typeof orderSchema>;

export const createOrderSchema = z.object({
  customer: z.object({
    name: z.string().min(2, "Введіть ваше ім'я"),
    phone: z.string().min(10, "Введіть правильний номер телефону"),
    email: z.string().email("Введіть правильний Email"),
    comment: z.string().optional(),
  }),

  items: z
    .array(
      z.object({
        dressId: z.string().min(1),
        name: z.string().min(1),
        size: z.string().min(1),
        price: z.number().positive(),
      }),
    )
    .min(1, "Кошик порожній"),

  total: z.number().positive(),
});

export type CreateOrderData = z.infer<typeof createOrderSchema>;
