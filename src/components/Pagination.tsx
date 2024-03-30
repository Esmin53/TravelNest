"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { ReactNode, useState } from "react"

interface PaginationProps {
    redirectUri: string
    totalPages: number
    currentPage: number
}

const Pagination = ({redirectUri, totalPages, currentPage}: PaginationProps) => {

    const router = useRouter()
    const [updatedRedirectUri, setUpdatedRedirectUri] = useState(redirectUri)

    const redirect = (pageNumber: number) => {
        if(pageNumber === 0 || pageNumber > totalPages) {
            return
        }

        setUpdatedRedirectUri(redirectUri);
    
        const pageRegex = /page=\d+/;

        setUpdatedRedirectUri(updatedRedirectUri.replace(pageRegex, `page=${pageNumber}`));


        router.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/accomodations?${updatedRedirectUri}page=${pageNumber}`);
    }

    let pages: ReactNode[] = [];
    for(let i = currentPage; i < currentPage + 7; i++) {
        if(i > totalPages) {
            break
        }

        pages.push(
            <div className={`sm:text-md text-sm w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 border-2 border-blue-400 flex justify-center items-center cursor-pointer
             ${i === currentPage && 'bg-blue-400 text-white'}`}
            onClick={() => redirect(i)} key={currentPage}>{i}</div>
            )
    }


    return (
        <div className="w-full flex justify-center gap-1 sm:gap-2 p-2 lg:p-4">
    
            <div className="sm:text-md text-sm w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 border-2 border-blue-400 flex justify-center items-center cursor-pointer"
            onClick={() => redirect(currentPage - 1)}><ChevronLeft /></div>
            {currentPage - 1 !== 0 &&  <div className={`sm:text-md text-sm w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 border-2 border-blue-400 flex justify-center items-center cursor-pointer`}
            onClick={() => redirect(currentPage-1)}>{currentPage-1}</div>}
            {pages}
            {pages.length === 0 &&  <div className={`sm:text-md text-sm w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 border-2 border-blue-400 flex justify-center items-center cursor-pointer bg-blue-400 text-white`}
            >{currentPage}</div> }
            <div className="sm:text-md text-sm w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 border-2 border-blue-400 flex justify-center items-center cursor-pointer"
            onClick={() => redirect(currentPage + 1)}><ChevronRight /></div>

            
        </div>
    )
}

export default Pagination