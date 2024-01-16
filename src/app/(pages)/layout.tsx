import Navbar from "@/components/Navbar"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center">
        <Navbar />
        <div className="flex-1 w-full flex flex-col max-w-6xl">
          {children}
        </div>
    </div>
  )
}
