import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import Featured from "@/components/featured/Featured";


export default function Home() {
  return (
    <main className="w-full flex flex-col gap-2 items-center">
      <Navbar />
      <Search />
      <Featured />
    </main>
  )
}
