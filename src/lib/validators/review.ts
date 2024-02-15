import { z } from "zod";

export const ReviewPropertyValidator = z.object({
    rating: z.number().min(1).max(5),
    review: z.string().min(3),
    id: z.string().optional()
})

export type ReviewPropertyRequest = z.infer<typeof ReviewPropertyValidator>