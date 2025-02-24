import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../../components/Sidebar";
import axiosInstance from "../../components/axiosInstance";

function Login() {
  // const [sidebarData, setSidebarData] = useState([]);
  const [sidebarData, setSidebarData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Helper function to safely store data in localStorage
  const safelyStoreData = (key, value) => {
    try {
      if (typeof value === 'object') {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        localStorage.setItem(key, value);
      }
    } catch (error) {
      console.error(`Error storing ${key}:`, error);
    }
  };

  // Helper function to handle domain-related data storage
  const handleDomainStorage = (response) => {
    try {
      // Store place (acting domain type)
      const place = response?.data?.user?.domain?.acting_domain?.[0] ?? null;
      safelyStoreData("place", place);

      // Store primary domain
      const primaryDomain = response?.data?.user?.domain?.primary_area ?? null;
      safelyStoreData("primary_domain", primaryDomain);

      // Store acting domain
      const actingDomain = response?.data?.user?.domain?.acting_domain;
      const domainData = Array.isArray(actingDomain) && 
                        actingDomain.length > 1 && 
                        Array.isArray(actingDomain[1]) 
                        ? actingDomain[1] 
                        : null;
      safelyStoreData("acting_domain", domainData);
    } catch (error) {
      console.error("Error in domain data storage:", error);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("auth/login", {
        email: data.emailOrPhone.includes("@") ? data.emailOrPhone : null,
        phone: !data.emailOrPhone.includes("@") ? data.emailOrPhone : null,
        password: data.password,
      });

      if (response.status === 200) {
        // Store basic user data
        safelyStoreData("token", response.data.token);
        safelyStoreData("branch_id", response.data.employee.branch.id);
        safelyStoreData("collector_number", response.data.employee.employee_number);
        safelyStoreData("id", response.data.employee.id);
        safelyStoreData("name", response.data.user.name);
        safelyStoreData("email", response.data.user.email);
        safelyStoreData("user_id", response.data.user.id);
        safelyStoreData("project_id", response.data.employee.branch.program_id);
        
        // Handle domain-related storage separately
        handleDomainStorage(response);
        
        // Store permissions and sidebar data
        safelyStoreData("permissions", response.data.employee.permissions);
        safelyStoreData("sidebar", response.data.sidebar);

        // Update sidebar state
        setSidebarData(response.data.sidebar);

        // Show success message
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome back, ${response.data.user.name}!`,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        // Navigate to domain page
        navigate("/domainPage");
      } else {
        throw new Error("Unsuccessful login");
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Please check your credentials and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth">
          <div className="row flex-grow">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left p-5">
                <div className="brand-logo">
                  <h2 css={{ color: "teal" }}>SafeSave</h2>
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <form className="pt-3" onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <input
                      type="text"
                      {...register("emailOrPhone", { required: true })}
                      className="form-control form-control-lg"
                      placeholder="Email or Phone"
                    />
                    {errors.emailOrPhone && (
                      <p style={{ color: "red" }}>Email or Phone is required</p>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      {...register("password", { required: true })}
                      className="form-control form-control-lg"
                      placeholder="Password"
                    />
                    {errors.password && (
                      <p style={{ color: "red" }}>Password is required</p>
                    )}
                  </div>
                  <div className="mt-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn d-grid btn-primary btn-lg font-weight-medium auth-form-btn"
                    >
                      {loading ? "Logging in..." : "Login"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



export default Login;