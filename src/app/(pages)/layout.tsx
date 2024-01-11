import Navbar from "@/components/Navbar"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col w-full min-h-screen items-center">
        <Navbar />
        {children}
    </div>
  )
}
