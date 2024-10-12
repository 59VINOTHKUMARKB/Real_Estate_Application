import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'

const types = ["buy", "rent"]

export default function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    city: "",
    minPrice: "",
    maxPrice: "",
  })

  console.log(query);
  

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }))
  }

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-t-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      
      <div className="relative flex justify-start gap-1 mb-6">
  {types.map((type) => (
    <button
      key={type}
      onClick={() => switchType(type)}
      className={`px-6 py-2 text-lg font-semibold rounded-full transition-colors duration-200 ${
        query.type === type
          ? "bg-indigo-600 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </button>
  ))}
  
</div>

        
        
        <form className="flex flex-wrap gap-4">
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
          className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out"
        />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
          onChange={handleChange}
          className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out"
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
          onChange={handleChange}
          className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out"
        />
        <Link 
          to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
          className="flex-none"
        >
          <button
            type="submit"
            className="w-full px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 ease-in-out transform hover:scale-105"
          >
            <Search className="inline-block w-5 h-5 mr-2" />
            Search
          </button>
        </Link>
      </form>
    </div>
  )
}