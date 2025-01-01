import React from "react";
import "../ReceiveCreditAdvice.css";

const ReceiveCreditAdvice = () => {
  return (
    <>
    <style>
      {`
      /* Container Styles */
.container {
    max-width: 1200px;
    padding: 20px;
    margin: auto;
  }
  
  /* Section Styles */
  .section {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .section-header {
    background-color: #ec4899;
    padding: 10px 15px;
    font-size: 18px;
  }
  
  .section-body {
    padding: 15px;
  }
  
  /* Form Styles */
  .form-label {
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
  }
  
  .form-control {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  /* Input Group */
  .input-group {
    display: flex;
  }
  
  .input-group .form-control {
    flex: 1;
    border-radius: 4px 0 0 4px;
  }
  
  .input-group .btn-search {
    background-color: #ec4899;
    border: none;
    color: white;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
  }
  
  .input-group .btn-search:hover {
    background-color: #d02770;
  }
  
  /* Save Button */
  .btn-save {
    padding: 10px 20px;
    background-color: #ec4899;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-save:hover {
    background-color: #d02770;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .section-body .row {
      display: block;
    }
  
    .section-body .col-md-3,
    .section-body .col-md-6,
    .section-body .col-12 {
      margin-bottom: 15px;
    }
  }
  
      `}
    </style>
    <div className="container mt-5">
      <h2 className="title">Receive Credit Advice</h2>

      {/* Project Section */}
      <div className="section">
        <div className="section-header">Project</div>
        <div className="form-group">
          <label>Project *</label>
          <select className="form-control">
            <option>Select Project</option>
          </select>
        </div>
      </div>

      {/* Member Information */}
      <div className="section">
        <div className="section-header">Member Information</div>
        <div className="form-grid">
          <div className="form-group">
            <label>Member Number *</label>
            <div className="search-box">
              <input type="text" placeholder="Enter Member Number" />
              <button className="search-button">🔍</button>
            </div>
          </div>
          <div className="form-group">
            <label>ERP Member Number</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Member Name</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Member Category</label>
            <input type="text" />
          </div>
        </div>
      </div>

      {/* Insurance Policy Information */}
      <div className="section">
        <div className="section-header">Insurance Policy Information</div>
        <div className="form-grid">
          <div className="form-group">
            <label>Select Policy *</label>
            <select className="form-control">
              <option>Select Policy</option>
            </select>
          </div>
          <div className="form-group">
            <label>Incident Date *</label>
            <input type="date" />
          </div>
        </div>
      </div>

      {/* Claim Information */}
      <div className="section">
        <div className="section-header">Claim Information</div>
        <div className="form-grid">
          <div className="form-group">
            <label>Claim Date *</label>
            <input type="date" />
          </div>
          <div className="form-group">
            <label>Received Date *</label>
            <input type="text" value="11-12-2024" readOnly />
          </div>
          <div className="form-group">
            <label>Advice Number *</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Received Amount *</label>
            <input type="text" />
          </div>
          <div className="form-group full-width">
            <label>Particular</label>
            <input type="text" />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="button-group">
        <button className="reset-button">Reset ❌</button>
        <button className="claim-button">Save 💾</button>
      </div>
    </div>
    </>
    
  );
};

export default ReceiveCreditAdvice;
