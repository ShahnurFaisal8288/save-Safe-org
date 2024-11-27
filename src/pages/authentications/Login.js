import React from 'react'

function Login() {
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
                              <form className="pt-3">
                                  <div className="form-group">
                                      <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username"/>
                                  </div>
                                  <div className="form-group">
                                      <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password"/>
                                  </div>
                                  <div className="mt-3">
                                      <a className="btn d-grid btn-primary btn-lg font-weight-medium auth-form-btn" href="../../index-2.html">SIGN IN</a>
                                  </div>
                                  <div className="my-2 d-flex justify-content-between align-items-center">
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
                                  </div>
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