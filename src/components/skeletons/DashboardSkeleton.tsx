const DashboardSkeleton = () => {

    return (
        <div className="w-full flex flex-col rounded-md gap-2 md:gap-4 border-2 border-gray-300 shadow-sm p-2 xs:p-4 sm:p-6">
    <div className="w-full flex flex-col xs:flex-row justify-between xs:items-center gap-2 p-2 border-b border-gray-300">
        <h1 className="text-xl xs:text-3xl font-bold text-gray-300 bg-gray-300 animate-pulse flex items-center rounded-sm">Dashboard
            <span className="text-lg xs:text-2xl text-gray-300 font-normal px-2 bg-gray-300 animate-pulse"> - Hotel Hills </span>
        </h1>
        <div className="w-52 h-10 bg-gray-300 animate-pulse rounded-sm"></div>
    </div>
    <div className="w-full gap-2 md:gap-4 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 border-b border-gray-300 py-4">
        {/* Total Revenue Card */}
        <div className="w-full h-24 xs:h-32 border-gray-300 border-2 rounded-md shadow-sm py-2 p-6 bg-gray-300 animate-pulse"></div>
        <div className="w-full h-24 xs:h-32 border-gray-300 border-2 rounded-md shadow-sm py-2 p-6 bg-gray-300 animate-pulse"></div>
        <div className="w-full h-24 xs:h-32 border-gray-300 border-2 rounded-md shadow-sm py-2 p-6 bg-gray-300 animate-pulse"></div>
        <div className="w-full h-24 xs:h-32 border-gray-300 border-2 rounded-md shadow-sm py-2 p-6 bg-gray-300 animate-pulse"></div>
    
    </div>
    <div className="px-1  py-2 sm:p-8 border-2 border-gray-300 bg-gray-300 animate-pulse rounded-md w-full overflow-hidden shadow-sm">
            <h2 className="sm:text-lg font-semibold my-1 sm:my-2"></h2>
            <div className="h-36 xs:h-60 sm:72 md:h-80 flex w-full p-1 sm:p-2 gap-1 sm:gap-2">
            <div className="h-full w-12 flex flex-col justify-between">
 
            </div>
            <div className="grid grid-flow-col gap-1 md:gap-2 items-end w-full">
        


            </div>
        </div>
        </div>
    
</div>

    )
}

export default DashboardSkeleton