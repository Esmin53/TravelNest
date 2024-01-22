import { db } from "@/lib/db";

export const GET = async (req: Request) => {

        
        const {searchParams} = new URL(req.url)

        const queryParamsObject: any = {};
            searchParams.forEach((value, key) => {
                let tempValue: string | boolean = value;

                if(tempValue === 'true') {
                    tempValue= true
                } else if (tempValue === 'false') {
                    tempValue= false
                }
            queryParamsObject[key] = tempValue;
        });
        try {
        const accomodations = await db.property.findMany(
            {
                where: queryParamsObject
            }
        )
 
        return new Response(JSON.stringify(accomodations), { status: 200} )
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error), { status: 500 })
    }
}