"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedEventSchema = exports.eventSchema = void 0;
const zod_1 = require("zod");
exports.eventSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(255),
    content: zod_1.z.string().min(1).max(500),
    date: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
});
// export const createEventSchema = eventSchema.extend({
//   userId: z.string().uuid(),
// });
exports.updatedEventSchema = exports.eventSchema.partial().extend({
    id: zod_1.z.string().uuid(),
});
