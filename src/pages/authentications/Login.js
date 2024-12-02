import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: data.emailOrPhone.includes("@") ? data.emailOrPhone : null,
          phone: !data.emailOrPhone.includes("@") ? data.emailOrPhone : null,
          password: data.password,
        }
      );
      console.log("response user",response.data.user);

      if (response.status === 200 && response.data.success) {
        localStorage.setItem(
          "token",
          response.data.token,
          response.data.collector.collector_number
        );
        localStorage.setItem(
          "collector_number",
          response.data.collector.collector_number
        );
        
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome back, ${response.data.user.name}!`,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        navigate("/dashboard");
      } else {
        throw new Error("Unsuccessful login");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "Please Try Again!!!",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
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
                  <img
                    src="https://demo.bootstrapdash.com/stellar-admin-new/themes/assets/images/logo-dark.svg"
                    alt="logo"
                  />
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
