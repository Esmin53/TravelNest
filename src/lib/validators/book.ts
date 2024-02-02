import { z } from "zod";

export const BookPropertyValidator = z.object({
    checkInDate: z.string(),
    checkOutDate: z.string(),
    nights: z.number(),
    price: z.number(),
    hostId: z.string(),
    propertyId: z.string(),
    location: z.string(),
    propertyName: z.string()
})

export type BookPropertyRequest = z.infer<typeof BookPropertyValidator>