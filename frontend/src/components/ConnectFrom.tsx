"use state";
import React, { useState } from "react";

const MyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
      <form className="w-96" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            onChange={handleChange}
            value={formData.name}
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
            name="name"
            type="text"
            placeholder="Your Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            onChange={handleChange}
            value={formData.email}
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
            name="email"
            type="email"
            placeholder="Your Email"
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-purple"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyForm;
