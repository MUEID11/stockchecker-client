import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import DisplayCard from "../component/DisplayCard";
import axios from "axios";
import Pagination from "./Pagination";

const HomePage = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState("");
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [filter, setFilter] = useState({
    category: "",
  });
  const [selectedPrice, setSelectedPrice] = useState(0);

  const queryClient = useQueryClient();

  const getData = async (page = 1) => {
    console.log(filter?.category);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/all`, {
        params: {
          search: searchText || "",
          sort: sortOption || "",
          page,
          limit: 10,
          category: filter?.category,
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
    queryKey: ["all", currentPage, sortOption, filter],
  });

  const prices = products.map((product) => product.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  useEffect(() => {
    if (minPrice && maxPrice) {
      setSelectedPrice(maxPrice);
    }
  }, [minPrice, maxPrice]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    const selectedBrand = data.find((item) => item.brand_name === brandName);
    if (selectedBrand) {
      setCategories(selectedBrand.categories);
    } else {
      setCategories([]);
    }
  }, [brandName, data]);

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

  const handlePriceChange = (e) => {
    setSelectedPrice(Number(e.target.value));
  };

  if (isLoading) {
    return (
      <div className="relative h-[65vh] flex items-center justify-center">
        <span className="loading loading-spinner text-primary loading-md absolute top-50 translate-y-5"></span>
      </div>
    );
  }

  const filteredProducts = products.filter(
    (product) => product.price <= selectedPrice
  );

  return (
    <div className="container mx-auto my-10 p-4">
      <div className="flex flex-col md:flex-row mx-auto p-2 justify-center items-center space-y-2 md:space-y-0 md:space-x-12 w-full">
        <div className="sm:flex items-center justify-center sm:space-x-2">
          <input
            className="max-w-xs px-3 py-2 text-gray-800 placeholder-gray-500 bg-white border border-gray-300 rounded-md shadow-sm outline-none focus:border-green-500 focus:ring focus:ring-green-400 focus:ring-opacity-40"
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            name="search"
            placeholder="Product Name"
            aria-label="Product Name"
          />
          <div>
            <button
              onClick={handleSearch}
              className="w-full mt-2 sm:mt-0 md:w-auto px-4 py-2 border-green-700 border-2 text-sm font-medium tracking-wider text-white bg-green-600 rounded-md transition-colors duration-300 transform hover:bg-green-500 focus:bg-green-500 focus:outline-none shadow-md"
            >
              Search
            </button>
          </div>
        </div>

        <div className="w-auto">
          <select
            onChange={(e) => setSortOption(e.target.value)}
            value={sortOption}
            className="min-w-xs px-2 py-2 tracking-wider text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-400 focus:ring-opacity-40"
          >
            <option value="">Sort By</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="dateNewestFirst">Newest First</option>
          </select>
        </div>
        <div>
          <select
            onChange={(e) => setBrandName(e.target.value)}
            value={brandName}
            className="min-w-xs p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Brand</option>
            {data.map((item) => (
              <option key={item.brand_name} value={item.brand_name}>
                {item.brand_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            className="min-w-xs p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
            value={filter.category}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-xs">
          <label
            htmlFor="price-range"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Max Price: {selectedPrice}
          </label>
          <input
            id="price-range"
            type="range"
            min={minPrice}
            max={maxPrice}
            value={selectedPrice}
            onChange={handlePriceChange}
            style={{ width: "100%" }} // Inline style to ensure full width
          />
          <div>
            <p className="mt-2 text-sm text-gray-500">
              Selected Max Price: {selectedPrice}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
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
