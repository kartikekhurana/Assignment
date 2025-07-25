import React, { useState } from "react";
import axios from "../../utils/axiosInstance.js";
import { useNavigate } from "react-router-dom";

const OnBoarding = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [timezone, setTimezone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/tenants",
        { name, email, timezone },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Tenant created successfully");
      setName("");
      setEmail("");
      setTimezone("");
      navigate("/dashboard");
    } catch (error) {
      console.error("failed to create tenant");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-6 text-center'>
          Tenant onboarding
        </h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block mb-1 font-semibold'>Name</label>
            <input
              type='text'
              className='w-full border border-gray-300 p-2 rounded'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className='block mb-1 font-semibold'>Email</label>
            <input
              type='email'
              className='w-full border border-gray-300 p-2 rounded'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className='block mb-1 font-semibold'>TimeZones</label>
            <input
              type='text'
              className='w-full border border-gray-300 p-2 rounded'
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              required
            />
          </div>
          {error && <p className='text-red-500'>{error}</p>}
          {success && <p className='text-green-500'>{success}</p>}
          <button
            type='submit'
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
            Created Tenant
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnBoarding;
