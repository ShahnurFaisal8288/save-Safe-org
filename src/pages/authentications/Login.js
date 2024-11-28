import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Login() {

    // Step 1
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Step 2
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post(
                "https://carwashingserver.vercel.app/api/auth/login",
                {
                    email: data.email,
                    password: data.password,
                }
            );
            console.log(response.data);

            if (response.status === 200 && response.data.success) {
                localStorage.setItem('token', response.data.data.token)
                localStorage.setItem("email", response.data.data.user.email);
                Swal.fire({
                    icon: "success",
                    title: "Login Successful",
                    text: `Welcome back, ${response.data.data.user.name.firstName}!`,
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
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
            navigate("/dashboard");
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
                                  <img src="https://demo.bootstrapdash.com/stellar-admin-new/themes/assets/images/logo-dark.svg"/>
                              </div>
                              <h4>Hello! let's get started</h4>
                              <h6 className="font-weight-light">Sign in to continue.</h6>
                              <form className="pt-3" onSubmit={handleSubmit(onSubmit)}>
                                  <div className="form-group">
                                      <input type="email" {...register("email", { required: true })} className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username" />
                                      {errors.email && <p style={{ color: "red" }}>Email is required</p>}

                                  </div>
                                  <div className="form-group">
                                      <input type="password" {...register("password", { required: true })} className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" />
                                      {errors.password && (
                                          <p style={{ color: "red" }}>Password is required</p>
                                      )}

                                  </div>
                                  <div className="mt-3">
                                      <button type="submit" disabled={loading} className="btn d-grid btn-primary btn-lg font-weight-medium auth-form-btn" href="../../index-2.html">{loading ? "Logging in..." : "Login"}</button>
                                      
                                  </div>
                                  {/* <div className="my-2 d-flex justify-content-between align-items-center">
                                      <div className="form-check">
                                          <label className="form-check-label text-muted">
                                              <input type="checkbox" className="form-check-input"/> Keep me signed in </label>
                                      </div>
                                      <a href="#" className="auth-link text-black">Forgot password?</a>
                                  </div>
                                  <div className="mb-2 d-grid gap-2">
                                      <button type="button" className="btn d-grid btn-facebook auth-form-btn d-flex justify-content-center align-items-center">
                                          <i className="icon-social-facebook me-2"></i>Connect using facebook </button>
                                  </div>
                                  <div className="text-center mt-4 font-weight-light"> Don't have an account? <a href="register.html" className="text-primary">Create</a>
                                  </div> */}
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
    
}

export default Login