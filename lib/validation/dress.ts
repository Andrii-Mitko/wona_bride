import { z } from "zod";

export const sizeTypeSchema = z.enum(["letter", "women", "kids"]);

export const dressSchema = z.object({
  name: z.string().min(2, "Назва сукні повинна містити мінімум 2 символи"),

  article: z.string().min(2, "Артикул повинен містити мінімум 2 символи"),

  price: z
    .number({
      message: "Вкажіть ціну",
    })
    .positive("Ціна повинна бути більше 0"),

  description: z.string().optional(),

  color: z.string().min(2, "Колір повинен містити мінімум 2 символи"),

  fabric: z.array(z.string()).min(1, "Оберіть хоча б один матеріал"),

  images: z.array(z.string()).min(1, "Додайте хоча б одне фото"),

  category: z.array(z.string()).min(1, "Оберіть хоча б одну категорію"),

  style: z.array(z.string()).min(1, "Оберіть хоча б один стиль"),

  sizeType: sizeTypeSchema,

  sizes: z.array(z.string()).min(1, "Оберіть хоча б один розмір"),

  isPopular: z.boolean(),

  availability: z.enum(["available", "order", "waiting"], {
    message: "Оберіть статус наявності",
  }),
});

export type DressFormData = z.infer<typeof dressSchema>;

export type SizeType = z.infer<typeof sizeTypeSchema>;
