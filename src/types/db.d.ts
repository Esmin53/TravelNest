import { Booking, Property, User } from "@prisma/client";

export type ExtendedProperty = Property & {
    user: User,
    bookings: Booking[]
}