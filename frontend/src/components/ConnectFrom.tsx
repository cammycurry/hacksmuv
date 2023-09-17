"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

interface FormData {
  name: string;
  username: string;
  linkedIn: string;
  github: string;
}

interface FormPayload {
  id: string;
  name: string;
  username: string;
  linkedIn: string;
  github: string;
}

const ConnectForm = () => {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    username: "",
    linkedIn: "",
    github: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session?.user?.id) return;
    console.log(formData);
  };

  return (
    <div className="">
      <div className="w-96 px-8 pb-6 pt-4 bg-gray-800 rounded-xl">
        <h1 className="text-white text-2xl mb-1 text-center">Connect Form</h1>
        <form onSubmit={handleSubmit}>
          {[
            { label: "Name", name: "name", type: "text" },
            { label: "Username", name: "username", type: "text" },
            { label: "LinkedIn", name: "linkedIn", type: "text" },
            { label: "Github", name: "github", type: "text" },
          ].map((field) => (
            <div key={field.name} className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                {field.label}:
              </label>
              <input
                onChange={handleInputChange}
                value={formData[field.name as keyof FormData]}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                name={field.name}
                type={field.type}
                placeholder={`Your ${field.label}`}
              />
            </div>
          ))}
          <div className="flex items-center justify-center pt-2">
            <button
              className="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-purple"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConnectForm;
