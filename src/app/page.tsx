import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import FavouriteProperties from "@/components/featured/FavouriteProperties";
import Featured from "@/components/featured/Featured";
import LandscapeType from "@/components/featured/LandscapeType";
import { db } from "@/lib/db";


export default async function Home() {
  
  const favourite = await db.property.findMany({
    orderBy: {
      bookings: {
        _count: 'desc'
      }
    },
    include: {
      bookings: true
    },
    take: 20
  });
  
  return (
    <main className="w-full flex flex-col items-center">
      <Navbar />
      <Search />
      <Featured />
      <FavouriteProperties properties={favourite}/>
    </main>
  )
}
