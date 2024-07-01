import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/admin/AdminLayout";
import axiosApiClient from "../axios";

const AdminProtectedRoutes = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    checkIfAuthorized();
  }, []);

  const checkIfAuthorized = async () => {
    try {
      const response = await axiosApiClient.get(`/checkAuthorized`);
      if (response.status === 200) {
        setIsAuthorized(true);
      }
    } catch (error) {
      setIsAuthorized(false);
    } finally {
      setLoading(false);
    }
  };
    

  if (loading) {
    return (
      <div className="font-mono font-bold text-xl">
        <p className="text-center mt-20 text-coral-red">Loading...</p>
      </div>
    );
  }

  return <div>{isAuthorized ? <AdminLayout /> : <Navigate to="/" />}</div>;
};

export default AdminProtectedRoutes;
