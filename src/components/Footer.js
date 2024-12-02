import React from "react";

function Footer() {
  return (
    <div>
      <footer className="footer fixed-bottom">
        <div className="d-sm-flex justify-content-center justify-content-sm-between">
          <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
            Copyright © 2023 Stellar. All rights reserved.{" "}
            <a href="#"> Terms of use</a>
            <a href="#">Privacy Policy</a>
          </span>
          <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
            Hand-crafted & made with <i className="icon-heart text-danger"></i>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
