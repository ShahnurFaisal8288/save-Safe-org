import React from "react";

const ReceiveCreditAdvice = () => {
  return (
    <div className="container p-4">
      {/* Project Section */}
      <div className="section border rounded mb-4">
        <div className="section-header p-2 text-white" style={{ backgroundColor: "#ec4899" }}>
          <strong>Project</strong>
        </div>
        <div className="p-3">
          <label>Project *</label>
          <select className="form-control">
            <option>Select Project</option>
          </select>
        </div>
      </div>

      {/* Member Information */}
      <div className="section border rounded mb-4">
        <div className="section-header p-2 text-white" style={{ backgroundColor: "#ec4899" }}>
          <strong>Member Information</strong>
        </div>
        <div className="p-3 row">
          <div className="col-md-3">
            <label>Member Number *</label>
            <div className="input-group">
              <input type="text" className="form-control" />
              <button className="btn btn-outline-secondary">🔍</button>
            </div>
          </div>
          <div className="col-md-3">
            <label>ERP Member Number</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-3">
            <label>Member Name</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-3">
            <label>Member Category</label>
            <input type="text" className="form-control" />
          </div>
        </div>
      </div>

      {/* Insurance Policy Information */}
      <div className="section border rounded mb-4">
        <div className="section-header p-2 text-white" style={{ backgroundColor: "#ec4899" }}>
          <strong>Insurance Policy Information</strong>
        </div>
        <div className="p-3 row">
          <div className="col-md-6">
            <label>Select Policy *</label>
            <select className="form-control">
              <option>Select Policy</option>
            </select>
          </div>
          <div className="col-md-6">
            <label>Incident Date *</label>
            <input type="date" className="form-control" />
          </div>
        </div>
      </div>

      {/* Claim Information */}
      <div className="section border rounded mb-4">
        <div className="section-header p-2 text-white" style={{ backgroundColor: "#ec4899" }}>
          <strong>Claim Information</strong>
        </div>
        <div className="p-3 row">
          <div className="col-md-3">
            <label>Claim Date *</label>
            <input type="date" className="form-control" />
          </div>
          <div className="col-md-3">
            <label>Received Date *</label>
            <input type="text" className="form-control" value="11-12-2024" readOnly />
          </div>
          <div className="col-md-3">
            <label>Advice Number *</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-3">
            <label>Received Amount *</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-12 mt-2">
            <label>Particular</label>
            <input type="text" className="form-control" />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="text-left">
        <button className="btn text-white" style={{ backgroundColor: "#ec4899" }}>
          Save <span>💾</span>
        </button>
      </div>
    </div>
  );
};

export default ReceiveCreditAdvice;
