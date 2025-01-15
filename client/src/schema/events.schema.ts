import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(1).max(60),
  content: z.string().min(1).max(500),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  image: z.instanceof(File, { message: "Invalid file type" }).optional(),
});
