import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1).max(500),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

// export const createEventSchema = eventSchema.extend({
//   userId: z.string().uuid(),
// });

export const updatedEventSchema = eventSchema.partial().extend({
  id: z.string().uuid(),
});
