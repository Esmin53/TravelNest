import FooterComponent from "@/components/FooterComponent";
import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import FavouriteProperties from "@/components/featured/FavouriteProperties";
import Featured from "@/components/featured/Featured";
import LandscapeType from "@/components/featured/LandscapeType";
import TopRatedProperties from "@/components/featured/TopRatedProperties";
import { Property } from "@prisma/client";


export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/homepage`, {cache: 'no-store'})

  const {favouriteProperties,
    trendingDestinations,
    topRatedProperties}: {
    favouriteProperties: Pick<Property, 'id' | 'name' | 'location' | 'propertyType' | 'images' >[]
    trendingDestinations: string[]
    topRatedProperties: Pick<Property, 'id' | 'name' | 'location' | 'country' | 'images' | 'avgRating' | 'numReviews' >[]
  } = await response.json()
  
  return (
    <main className="w-full flex flex-col items-center justify-center">
      <Navbar />
      <Search />
      <Featured data={trendingDestinations}/>
      <LandscapeType />
      <FavouriteProperties properties={favouriteProperties}/>
      <TopRatedProperties data={topRatedProperties}/>
      <FooterComponent />
    </main>
  )
}
