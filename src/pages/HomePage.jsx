import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import DisplayCard from "../component/DisplayCard";
import axios from "axios";
import Pagination from "./Pagination";

const HomePage = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState("");
  const getData = async (page = 1) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/all`, {
        params: {
          search: searchText || "",
          sort: sortOption || "",
          page,
          limit: 10,
        },
      });
      setTotalPages(data.totalPages);
      return data.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryFn: async () => await getData(currentPage),
    queryKey: ["all", currentPage, sortOption],
  });

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  if (isLoading) {
    return (
      <div className="relative h-[65vh] flex items-center justify-center">
        <span className="loading loading-spinner text-primary loading-md absolute top-50 translate-y-5"></span>
      </div>
    );
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
    await refetch();
  };

  const handleReset = () => {
    setSearchText("");
    setCurrentPage(1); // Reset to first page on reset
    queryClient.invalidateQueries(["allproducts"]);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  return (
    <div className="container mx-auto my-12 p-4">
      <div className="flex flex-col md:flex-row mx-auto p-2 justify-center items-center space-y-2 md:space-y-0 md:space-x-2 w-full max-w-xs">
        <div className="w-full">
          <input
            className="max-w-xs px-4 py-2 text-gray-800 placeholder-gray-500 bg-white border border-gray-300 rounded-full shadow-sm outline-none focus:border-green-500 focus:ring focus:ring-green-400 focus:ring-opacity-40"
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            name="search"
            placeholder="Product Name or Category"
            aria-label="Product Name or Category"
          />
        </div>
        <div>
          <button
            onClick={handleSearch}
            className="w-full md:w-auto px-4 py-2 border-green-700 border-2 text-sm font-medium tracking-wider text-white bg-green-600 rounded-full transition-colors duration-300 transform hover:bg-green-500 focus:bg-green-500 focus:outline-none shadow-md"
          >
            Search
          </button>
        </div>
        <div className="w-[120px]">
          <select
            onChange={(e) => setSortOption(e.target.value)}
            value={sortOption}
            className="w-[120px] px-2 py-2 text-sm font-medium tracking-wider text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-400 focus:ring-opacity-40"
          >
            <option value="">Sort By</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="dateNewestFirst">Newest First</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <DisplayCard key={product._id} product={product}></DisplayCard>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HomePage;
