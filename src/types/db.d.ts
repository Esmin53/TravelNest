import { Booking, Property, Review, User } from "@prisma/client";

export type ExtendedProperty = Property & {
    user: User,
    bookings: Booking[]
}

export type ExtendedReview = Review & {
    guest: User
}