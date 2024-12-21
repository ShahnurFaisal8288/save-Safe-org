import React from "react";
import "../ClaimSettlement.css";

const ClaimSettlement = () => {
  return (
    <div className="container mt-5">
      {/* Project Section */}
      <div className="section">
        <h2>Project</h2>
        <select className="input-field">
          <option value="">Project *</option>
        </select>
      </div>

      {/* Member Information */}
      <div className="section">
        <h2>Member Information</h2>
        <div className="form-grid">
          <div className="input-group">
            <label>Member Number *</label>
            <div className="search-field">
              <input type="text" placeholder="Enter Member Number" />
              <button className="search-btn">🔍</button>
            </div>
          </div>
          <div className="input-group">
            <label>ERP Member Number</label>
            <input type="text" />
          </div>
          <div className="input-group">
            <label>Member Name</label>
            <input type="text" />
          </div>
          <div className="input-group">
            <label>Member Category</label>
            <input type="text" />
          </div>
          <div className="input-group">
            <label>Member Mobile Number</label>
            <input type="text" />
          </div>
          <div className="input-group">
            <label>Identification Number</label>
            <input type="text" />
          </div>
        </div>
      </div>

      {/* Settlement Information */}
      <div className="section">
        <h2>Settlement Information</h2>
        <div className="form-grid">
          <div className="input-group">
            <label>Policy No *</label>
            <select>
              <option value="">Select Policy</option>
            </select>
          </div>
          <div className="input-group">
            <label>Incident Date *</label>
            <input type="date" />
          </div>
          <div className="input-group">
            <label>Product</label>
            <input type="text" />
          </div>
          <div className="input-group">
            <label>Treatment Type</label>
            <input type="text" />
          </div>
          <div className="input-group">
            <label>Claim Amount</label>
            <input type="number" />
          </div>
          <div className="input-group">
            <label>Approved Amount</label>
            <input type="number" />
          </div>
          <div className="input-group">
            <label>Claim Settlement Payment Mode *</label>
            <select>
              <option value="">Select Payment Mode</option>
            </select>
          </div>
          <div className="input-group full-width">
            <label>Amount In Words</label>
            <input type="text" />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="button-group">
        <button className="reset-btn">Reset</button>
        <button className="settle-btn">Settle</button>
      </div>
    </div>
  );
};

export default ClaimSettlement;
