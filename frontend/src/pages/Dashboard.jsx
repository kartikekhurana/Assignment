import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const navigate = useNavigate();

  const [tenants, setTenants] = useState([]);

  let role = "";
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
    } catch (error) {
      console.error("Failed to decode token", error);
    }
  }

  const handleLogout = (e) => {
    e.preventDefault();
    console.log("Before:", localStorage.getItem("token"));
    localStorage.removeItem("token");
    console.log("After:", localStorage.getItem("token"));
    navigate("/");
  };
  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/tenants", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTenants(res.data.Tenants);
      } catch (error) {
        console.error("Failed to fetch tenants", error);
      }
    };
    fetchTenants();
  }, []);
  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-4xl mx-auto bg-white p-6 rounded shadow'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-bold'>Dashboard</h1>
          <button
            type='button'
            className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
            onClick={handleLogout}>
            Logout
          </button>
        </div>
        {tenants.map((tenant) => {
          const lastSyncTime = "2025-07-24 15:00";
          const lastErrorMessage = tenant.isPipelineOn ? "None" : "Connection timeout";
          const healthStatus = tenant.isPipelineOn ? "green" : "red";
          return (
            <div
              key={tenant.id}
              className='border border-gray-300 p-4 rounded mb-4 bg-gray-100'>
              <h2 className='font-semibold text-lg'>{tenant.name}</h2>
              <p>Email: {tenant.email}</p>
              <p>Timezone: {tenant.timezone}</p>
              <p
                className={
                  tenant.isPipelineOn ? "text-green-600" : "text-red-500"
                }>
                Pipeline Status: {tenant.isPipelineOn ? "Running" : "Stopped"}
              </p>
              <p>Last Sync Time: {lastSyncTime}</p>
              <p className={healthStatus === "green" ? "text-green-600" : "text-red-500"}>
                Last Error: {lastErrorMessage}
              </p>
              <p className='mt-1'>
                <span
                  className={`inline-block w-3 h-3 rounded-full mr-2 ${
                    healthStatus === "green" ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
                System Health: {healthStatus.toUpperCase()}
              </p>
            </div>
          );
        })}
      </div>
      <div>
        <button
          className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
          onClick={() => {
            if (role !== "ADMIN") {
              alert("Only Admin users can onboard new tenants.");
              return;
            }
            navigate("/OnBoarding");
          }}>
          Add New tenant
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
