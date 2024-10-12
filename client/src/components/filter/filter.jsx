import React, { useState } from "react";
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Home, DollarSign, Bed } from 'lucide-react';

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();  
  const initialQuery = {
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property")||"",
    bedroom: searchParams.get("bedroom")||0,
    minPrice: searchParams.get("minPrice")||0,
    maxPrice: searchParams.get("maxPrice")||100000000
  };

  const [query, setQuery] = useState(initialQuery);

  const handleFilter = () => {
    setSearchParams(query);
  };

  const handleInputChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div>
      <h1 className="flex justify-start text-2xl font-semibold text-gray-800 mb-4">
        Search results for&nbsp;<span className="text-indigo-600">{searchParams.get("city")}</span>
      </h1>
      <Link to='/list' className="flex justify-end text-white bg-indigo-600 p-2 rounded-lg ml-auto max-w-fit mt-[-50px]">Remove All Filters</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label htmlFor="city" className="text-sm font-medium text-gray-700 mb-1">Location</label>
          <div className="relative">
            <input
              type="text"
              id="city"
              name="city"
              placeholder="City Location"
              onChange={handleInputChange}
              defaultValue={query.city}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="type" className="text-sm font-medium text-gray-700 mb-1">Type</label>
          <select 
            name="type" 
            id="type" 
            onChange={handleInputChange}
            defaultValue={query.type}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">Any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="property" className="text-sm font-medium text-gray-700 mb-1">Property</label>
          <div className="relative">
            <select 
              name="property" 
              id="property" 
              onChange={handleInputChange}
              defaultValue={query.property}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
            >
              <option value="">Any</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="land">Land</option>
            </select>
            <Home className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="minPrice" className="text-sm font-medium text-gray-700 mb-1">Min Price</label>
          <div className="relative">
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              placeholder="Any"
              min={0}
              onChange={handleInputChange}
              defaultValue={query.minPrice}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="maxPrice" className="text-sm font-medium text-gray-700 mb-1">Max Price</label>
          <div className="relative">
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              placeholder="Any"
              min={1000}
              onChange={handleInputChange}
              defaultValue={query.maxPrice}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="bedroom" className="text-sm font-medium text-gray-700 mb-1">Bedroom</label>
          <div className="relative">
            <input
              type="number"
              id="bedroom"
              name="bedroom"
              placeholder="Any"
              min={0}
              onChange={handleInputChange}
              defaultValue={query.bedroom}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
      <button 
        onClick={handleFilter}
        className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center"
      >
        <Search className="mr-2" />
        Search
      </button>
    </div>
  );
}

export default Filter;