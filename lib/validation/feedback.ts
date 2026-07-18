import { z } from "zod";

export const feedbackSchema = z.object({
  name: z
    .string()
    .min(2, "Ім'я повинно містити мінімум 2 символи")
    .max(50, "Ім'я занадто довге"),

  text: z
    .string()
    .min(10, "Відгук повинен містити мінімум 10 символів")
    .max(500, "Відгук занадто довгий"),

  rating: z.number().min(1, "Оберіть оцінку").max(5),
});

export type FeedbackFormData = z.infer<typeof feedbackSchema>;
