import React from "react";
import "../ReceiveCreditAdvice.css";

const ReceiveCreditAdvice = () => {
  return (
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
  );
};

export default ReceiveCreditAdvice;
