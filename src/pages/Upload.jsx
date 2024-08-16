import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

function Upload() {
  const [product, setProduct] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    category: "",
    ratings: "",
    creationDate: new Date().toISOString().slice(0, 16), // ISO string without seconds
  });

  const categories = ["Laptop", "Smartphone", "Tablet", "Smartwatch", "Accessories", "Air Conditionar"];

  const handleChange = async(e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
   
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to an API
    try {
        const {data} = await axios.post('http://localhost:5000/upload', product);
        console.table(data);
        toast.success('Product uploaded successfully');
    } catch (error) {
        console.log(error.message);
    }
    
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Upload Tech Product</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Product Image URL</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            rows="4"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium">Price ($)</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Ratings (1-5)</label>
          <input
            type="number"
            name="ratings"
            value={product.ratings}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            min="1"
            max="5"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Product Creation Date and Time</label>
          <input
            type="datetime-local"
            name="creationDate"
            value={product.creationDate}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Upload Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default Upload;
