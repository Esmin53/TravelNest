import { Building, Dessert, GlassWater, Home, LucidePyramid, LucideSailboat, LucideSun, LucideTent, Mountain, Palmtree, Snowflake, TreePine } from "lucide-react"
import Link from "next/link";

const LandscapeType  = () => {

    return (
        <div className="w-full max-w-7xl flex flex-col gap-4 py-4">
        <h1 className="text-xl font-semibold">Find land that suits your style</h1>
        <div className="grid-rows-2 sm:grid-rows-1 grid grid-flow-col gap-1">
            <Link href='/accomodations?landscapeType=city&' className="flex flex-col gap cursor-pointer items-center">
                <div className="sm:w-14 w-12 sm:h-14 h-12 rounded-sm flex flex-col items-center justify-center">
                    <Building className="w-8 sm:w-10 h-8 sm:h-10" />
                </div>
                <p className="text-xs font-semibold">City</p>
            </Link>
            <Link href='accomodations?landscapeType=country&' className="flex flex-col gap cursor-pointer items-center">
                <div className="sm:w-14 w-12 sm:h-14 h-12 rounded-sm flex flex-col items-center justify-center">
                    <Home className="w-8 sm:w-10 h-8 sm:h-10" />
                </div>
                <p className="text-xs font-semibold">Country</p>
            </Link>
            <Link href='accomodations?landscapeType=mountains&' className="flex flex-col gap cursor-pointer items-center">
                <div className="sm:w-14 w-12 sm:h-14 h-12 rounded-sm flex flex-col items-center justify-center">
                    <Mountain className="w-8 sm:w-10 h-8 sm:h-10" />
                </div>
                <p className="text-xs font-semibold">Mountains</p>
            </Link>
            <Link href='accomodations?landscapeType=beach&' className="flex flex-col gap cursor-pointer items-center">
                <div className="sm:w-14 w-12 sm:h-14 h-12 rounded-sm flex flex-col items-center justify-center">
                    <LucideSun className="w-8 sm:w-10 h-8 sm:h-10" />
                </div>
                <p className="text-xs font-semibold">Beach</p>
            </Link>
            <Link href='accomodations?landscapeType=forrest&' className="flex flex-col gap cursor-pointer items-center">
                <div className="sm:w-14 w-12 sm:h-14 h-12 rounded-sm flex flex-col items-center justify-center">
                    <TreePine className="w-8 sm:w-10 h-8 sm:h-10" />
                </div>
                <p className="text-xs font-semibold">Forrest</p>
            </Link>
            <Link href='accomodations?landscapeType=desert&' className="flex flex-col gap cursor-pointer items-center">
                <div className="sm:w-14 w-12 sm:h-14 h-12 rounded-sm flex flex-col items-center justify-center">
                    <LucidePyramid className="w-8 sm:w-10 h-8 sm:h-10" />
                </div>
                <p className="text-xs font-semibold">Desert</p>
            </Link>
            <Link href='accomodations?landscapeType=snowy&' className="flex flex-col gap cursor-pointer items-center">
                <div className="sm:w-14 w-12 sm:h-14 h-12 rounded-sm flex flex-col items-center justify-center">
                    <Snowflake className="w-8 sm:w-10 h-8 sm:h-10" />
                </div>
                <p className="text-xs font-semibold">Snowy</p>
            </Link>
            <Link href='accomodations?landscapeType=camping&' className="flex flex-col gap cursor-pointer items-center">
                <div className="sm:w-14 w-12 sm:h-14 h-12 rounded-sm flex flex-col items-center justify-center">
                    <LucideTent className="w-8 sm:w-10 h-8 sm:h-10" />
                </div>
                <p className="text-xs font-semibold">Camping</p>
            </Link>
            <Link href='accomodations?landscapeType=tropical&' className="flex flex-col gap cursor-pointer items-center">
                <div className="sm:w-14 w-12 sm:h-14 h-12 rounded-sm flex flex-col items-center justify-center">
                    <Palmtree className="w-8 sm:w-10 h-8 sm:h-10" />
                </div>
                <p className="text-xs font-semibold">Tropical</p>
            </Link>
            <Link href='accomodations?landscapeType=island&' className="flex flex-col gap cursor-pointer items-center">
                <div className="sm:w-14 w-12 sm:h-14 h-12 rounded-sm flex flex-col items-center justify-center">
                    <LucideSailboat className="w-8 sm:w-10 h-8 sm:h-10" />
                </div>
                <p className="text-xs font-semibold">Island</p>
            </Link>
        </div>
    </div>
    )
}

export default LandscapeType;

