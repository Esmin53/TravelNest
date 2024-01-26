"use client"

import { useEffect, useState } from "react"
import SearchBar from "./SearchBar"
import SearchOptions from "./SearchOptions"
import { useSearchParams } from "next/navigation"


const Search = () => {

    const [params, setParams] = useState<string >('')
    const [propertyType, setPropertyType] = useState('')
    const [landscapeType, setLandscapeType] = useState('')

    const updateSearchParams = (param: string) => {
      if(params.includes(`${param}&`)) {
        setParams(params.replace(`${param}&`, ''))
      } else {
        setParams(params + `${param}&`)
      }
    }

    return (
        <div className="w-full max-w-6xl space-y-2 flex flex-col justify-center">
          <SearchBar additionalOptions={params} propertyType={propertyType} landscapeType={landscapeType}/>
          <SearchOptions onChange={(value: string) => updateSearchParams(value)} 
          onPropertyChange={(value: string) => setPropertyType(value)}
          onLandscapeChange={(value: string) => setLandscapeType(value)}/>
        </div>
    )
}

export default Search;