

const ManageBookigsSkeleton = () => {
    
    return (
<div className="flex flex-col w-full gap-6">
  <div className="w-full pb-4 flex flex-col sm:flex-row justify-between xs:items-center border-b border-gray-300 gap-2">
    <h1 className="text-2xl xs:text-3xl font-bold text-gray-300 bg-gray-300 animate-pulse">Manage bookings</h1>
    <div className="flex flex-col xs:flex-row gap-4 xs:gap-2 items-end justify-center">
      <div className="flex flex-col gap-1">
      <div className="skeleton-text text-sm text-gray-300 bg-gray-300 animte-pulse w-fit">February 1st, 2024</div>
        <div className="skeleton w-[96vw] xs:w-44 lg:w-[280px] h-10 bg-gray-300 animate-pulse"></div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="skeleton-text text-sm text-gray-300 bg-gray-300 animte-pulse w-fit">February 1st, 2024</div>
        <div className="skeleton w-[96vw] xs:w-44 lg:w-[280px] h-10 bg-gray-300 animate-pulse"></div>
      </div>
      <button className="w-full xs:w-10 h-10 rounded-sm bg-gray-300 animate-pulse">
        
      </button>
    </div>
  </div>
  <div className="w-full flex flex-col gap-2 border-b border-gray-300 pb-4">
    <h1 className="text-xl font-bold text-gray-300 bg-gray-300 animate-pulse w-fit">Bookings in Process</h1>
    <p className="text-gray-300 bg-gray-300 animate-pulse w-fit">Here are the guests who are currently staying at your accommodation:</p>
    <div className="w-full gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div className="h-36 rounded-sm bg-gray-300 animate-pulse"></div>
        <div className="h-36 rounded-sm bg-gray-300 animate-pulse"></div>
        <div className="h-36 rounded-sm bg-gray-300 animate-pulse"></div>
    </div>
  </div>
  <div className="w-full flex flex-col gap-2 border-b border-gray-300 pb-4">
    <h1 className="text-xl font-bold text-gray-300 bg-gray-300 animate-pulse w-fit">Incoming bookings</h1>
    <p className="text-gray-300 bg-gray-300 animate-pulse w-fit">Here are the bookings that will stay at your place in the future:</p>
    <div className="w-full gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div className="h-36 rounded-sm bg-gray-300 animate-pulse"></div>
        <div className="h-36 rounded-sm bg-gray-300 animate-pulse"></div>
        <div className="h-36 rounded-sm bg-gray-300 animate-pulse"></div>
    </div>
  </div>
  <div className="w-full flex flex-col gap-2 border-b border-gray-300 pb-4">
    <h1 className="text-xl font-bold text-gray-300 bg-gray-300 animate-pulse w-fit">Completed Bookings</h1>
    <p className="text-gray-300 bg-gray-300 animate-pulse w-fit">Here are the guests who have stayed at your place in the past:</p>
    <div className="w-full gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div className="h-36 rounded-sm bg-gray-300 animate-pulse"></div>
        <div className="h-36 rounded-sm bg-gray-300 animate-pulse"></div>
        <div className="h-36 rounded-sm bg-gray-300 animate-pulse"></div>
    </div>
  </div>
</div>
    )
}

export default ManageBookigsSkeleton
