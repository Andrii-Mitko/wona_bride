import { z } from "zod";

export const sizeTypeSchema = z.enum(["letter", "women", "kids"]);

export type SizeType = z.infer<typeof sizeTypeSchema>;
