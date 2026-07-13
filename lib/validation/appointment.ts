import { z } from "zod";

export const appointmentSchema = z.object({
  dressName: z.string(),
  name: z.string().trim().min(2, "Ім'я повинно містити мінімум 2 символи"),

  phone: z
    .string()
    .trim()
    .regex(/^(\+380|380|0)\d{9}$/, "Введіть коректний номер телефону"),

  date: z.string().optional(),

  time: z.string().optional(),

  message: z.string().max(500).optional(),

  privacy: z.boolean().refine((value) => value, {
    message: "Потрібно погодитися з Політикою конфіденційності",
  }),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
