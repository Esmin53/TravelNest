import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db";
import { ReviewPropertyValidator } from "@/lib/validators/review";
import { differenceInDays } from "date-fns";
import { getServerSession } from "next-auth"


export const POST = async (req: Request) => {
    try {
        const session = await getServerSession(authOptions);

        if(!session || !session.user) {
            return new Response(JSON.stringify('Unauthorized'), { status: 401 });
        };

        const url = new URL(req.url)
        const { pathname } = url

        const propertyId = pathname.split('/')[3];

        const body = await req.json()

        const {rating, review} = ReviewPropertyValidator.parse(body)

        const isReview = await db.review.findFirst({
            where: {
                guestId: session.user.id,
                propertyId
            }
        })

        if(isReview) {
            return new Response(JSON.stringify('Bad request!'), {status: 400})
        }

        const booking = await db.booking.aggregate({
            where: {
                propertyId,
                guestId: session.user.id
            },
            _sum: {
                nights: true
            }
        })

        let days = '';

        if(booking._sum.nights === null) {
            return new Response(JSON.stringify('Not Found!'), {status: 404})
        } else if(booking._sum.nights < 7) {
            days = 'Stayed for few days'
        } else if(booking._sum.nights < 7 && booking._sum.nights < 30) {
            days = 'Stayed for over a week'
        } else if( booking._sum.nights > 30) {
            days = `Stayed for over ${Math.floor(booking._sum.nights)} months`
        }


        const newReview = await db.review.create({
            data: {
                rating,
                review,
                guestId: session.user.id,
                propertyId,
                stayedFor: days
            }
        })

        return new Response(JSON.stringify(newReview), { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error), { status: 500 })
    }
}

export const PUT = async (req: Request) => {
    try {
        const session = await getServerSession(authOptions);

        if(!session || !session.user) {
            return new Response(JSON.stringify('Unauthorized'), { status: 401 });
        };

        const url = new URL(req.url)
        const { pathname } = url

        const propertyId = pathname.split('/')[3];

        const body = await req.json()

        const {rating, review, id} = ReviewPropertyValidator.parse(body)

        const booking = await db.booking.aggregate({
            where: {
                propertyId,
                guestId: session.user.id
            },
            _sum: {
                nights: true
            }
        })

        let days = '';

        if(booking._sum.nights === null) {
            return new Response(JSON.stringify('Not Found!'), {status: 404})
        } else if(booking._sum.nights < 7) {
            days = 'Stayed for few days'
        } else if(booking._sum.nights < 7 && booking._sum.nights < 30) {
            days = 'Stayed for over a week'
        } else if( booking._sum.nights > 30) {
            days = `Stayed for over ${Math.floor(booking._sum.nights)} months`
        }


        const updatedReview = await db.review.update({
            where: {
                id
            },
            data: {
                rating,
                review,
                guestId: session.user.id,
                propertyId,
                stayedFor: days
            }
        })

        return new Response(JSON.stringify(updatedReview), { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error), { status: 500 })
    }
}

export const GET = async (req: Request) => {
    try {
        const url = new URL(req.url)
        const { pathname } = url

        const propertyId = pathname.split('/')[3];

        
        const reviews = await db.review.findMany({
            where: {
                propertyId
            },
            include: {
                guest: true
            }
        })

        return new Response(JSON.stringify(reviews), { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error), { status: 500 })
    }
}