import { z } from "zod";

export const ListPropertyValidator = z.object({
    images: z.array(z.string()),
    country: z.string(),
    city: z.string(),
    location: z.string(),
    bedrooms: z.number(),
    bathrooms: z.number(),
    rooms: z.number(),
    price: z.number(),
    propertyType: z.enum(['hotel', 'motel', 'house', 'apartment', 'cabin', 'campsite', 'other', '']),
    landscapeType: z.enum(['city', 'country', 'mountains', 'beach', 'forrest', 'desert', 'snowy', 'camping', 'tropical', 'island', '']),
    name: z.string(),
    pets: z.boolean(),
    airConditioning: z.boolean(),
    kitchen: z.boolean(),
    freeWiFi: z.boolean(),
    washingMachine: z.boolean(),
    noSmoking: z.boolean(),
    heating: z.boolean()
})

export type ListPropertyRequest = z.infer<typeof ListPropertyValidator>