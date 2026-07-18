import { z } from "zod";

export const sizeTypeSchema = z.enum(["letter", "women", "kids"]);

export const dressSchema = z.object({
  name: z.string().min(2),

  article: z.string().min(2),

  price: z.number().positive(),

  description: z.string().min(10),

  color: z.string().min(2),

  fabric: z.array(z.string()),

  images: z.array(z.string()),

  category: z.array(z.string()),

  style: z.array(z.string()),

  sizeType: sizeTypeSchema,

  sizes: z.array(z.string()),

  isPopular: z.boolean(),
  availability: z.enum(["available", "order", "waiting"]),
});

export type DressFormData = z.infer<typeof dressSchema>;

export type SizeType = z.infer<typeof sizeTypeSchema>;
