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

  useEffect(() => {
    // Log whenever sidebarData is updated
    console.log("Updated sidebarData:", sidebarData);
  }, [sidebarData]); // Dependency on sidebarData

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "auth/login",
        {
          email: data.emailOrPhone.includes("@") ? data.emailOrPhone : null,
          phone: !data.emailOrPhone.includes("@") ? data.emailOrPhone : null,
          password: data.password,
        }
      );
      console.log("login user", response);
      console.log("Sidebar user..........", response.data.sidebar);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "branch_id",
          response.data.employee.branch.id
        );
        localStorage.setItem(
          "collector_number",
          response.data.employee.employee_number
        );
        localStorage.setItem(
          "id",
          response.data.employee.id
        );
        localStorage.setItem(
          "name",
          response.data.user.name
        );
        localStorage.setItem(
          "email",
          response.data.user.email
        );
        localStorage.setItem(
          "user_id",
          response.data.user.id
        );
        localStorage.setItem(
          "permissions",
          JSON.stringify(response.data.employee.permissions)
        );
        localStorage.setItem("sidebar", JSON.stringify(response.data.sidebar));

        // Swal.fire({
        //   icon: "success",
        //   title: "Login Successful",
        //   text: `Welcome back, ${response.data.user.name}!`,
        //   showConfirmButton: false,
        //   timer: 2000,
        //   timerProgressBar: true,
        // });
        setSidebarData(response.data.sidebar); // Pass sidebar data correctly
        console.log("setSidebarData", sidebarData);
        navigate("/dashboard");
        // setSidebarData(response.data.sidebar.element_url);
      } else {
        throw new Error("Unsuccessful login");
      }
    } catch (error) {
      // Swal.fire({
      //   icon: "error",
      //   title: "Unauthorized",
      //   text: "Please Try Again!!!",
      //   showConfirmButton: false,
      //   timer: 2000,
      //   timerProgressBar: true,
      // });
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
                <h2 css={{ color: "teal"}}>SafeSave</h2>
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
      {/* <Sidebar data={sidebarData} /> */}
    </div>
  );
}

export default Login;
