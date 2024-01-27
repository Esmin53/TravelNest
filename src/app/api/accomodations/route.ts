import { db } from "@/lib/db";

export const GET = async (req: Request) => {

        
        const {searchParams} = new URL(req.url)
        let page: number = 1;

       let queryParamsObject: any = {};
            searchParams.forEach((value, key) => {
                let tempValue: string | boolean = value;

                if(tempValue === 'true') {
                    tempValue= true
                } else if (tempValue === 'false') {
                    tempValue= false
                }

                if(key === 'q') {
                    queryParamsObject['OR'] = [
                        {
                            country: {startsWith: value, mode: 'insensitive'}
                        },
                        {
                            city: {startsWith: value, mode: 'insensitive'}
                        },
                        {
                            location: {startsWith: value, mode: 'insensitive'}
                        },
                        {
                            name: {startsWith: value, mode: 'insensitive'}
                        },
        
                    ] 
                } else if(key === 'bedrooms') {
                    queryParamsObject['bedrooms'] = {
                        lte: Number(value)
                    }
                } else if(key === 'bathrooms') {
                    queryParamsObject['bathrooms'] = {
                        lte: Number(value)
                    }
                } else if(key === 'rooms') {
                    queryParamsObject['rooms'] = {
                        lte: Number(value)
                    }
                } else if(key === 'page') {
                     value !== '0' ? page = Number(value) : page = 1;
                } else {
                    queryParamsObject[key] = tempValue;
                }
        });


        try {
        const accomodations = await db.property.findMany(
            {
                where: queryParamsObject,
                take: 20,
                skip: (page - 1) * 20
            }
        )

        const count = await db.property.count({
            where: queryParamsObject
        })

        const pagination = {
            totalPages: count/20,
            currentPage: page,
            totalResults: count
        }

        if(pagination.totalPages < 1) pagination.totalPages = 1
 
        return new Response(JSON.stringify({accomodations, pagination}), { status: 200} )
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error), { status: 500 })
    }
}