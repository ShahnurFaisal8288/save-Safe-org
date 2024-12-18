import React from "react";


const MicroHealthInsurance = () => {
  return (
    <div className="container">
      <h2 className="title">Micro Health Insurance Claim Benefit Setup</h2>

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

      {/* Member Information Section */}
      <div className="section">
        <div className="section-header">Member Information</div>
        <div className="form-grid">
          <div className="form-group">
            <label>Member Number *</label>
            <div className="search-box">
              <input type="text" placeholder="Member Number" />
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
          <div className="form-group">
            <label>Member Mobile Number</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input type="number" />
          </div>
          <div className="form-group full-width">
            <label>Identification Number</label>
            <input type="text" />
          </div>
        </div>
      </div>

      {/* Incident Information Section */}
      <div className="section">
        <div className="section-header">Incident Information</div>
        <div className="form-grid">
          <div className="form-group">
            <label>Product *</label>
            <select>
              <option>Select Product</option>
            </select>
          </div>
          <div className="form-group">
            <label>Select Policy No *</label>
            <select>
              <option>Select Policy Number</option>
            </select>
          </div>
          <div className="form-group">
            <label>Treatment Type *</label>
            <select>
              <option>Select Treatment Type</option>
            </select>
          </div>
          <div className="form-group">
            <label>Date of Incident *</label>
            <div className="date-box">
              <input type="date" />
              <button className="calendar-button">📅</button>
            </div>
          </div>
          <div className="form-group">
            <label>Claim Amount *</label>
            <input type="number" />
          </div>
          <div className="form-group">
            <label>Remaining Sum Insured</label>
            <input type="number" />
          </div>
        </div>
      </div>

      {/* Document Upload Section */}
      {/* Document Upload Section */}
<div className="section">
  <div className="section-header">Document Upload</div>
  <div className="form-group">
    <label>Member's National ID *</label>
    <div className="upload-grid">
      <div className="upload-box">
        <label className="upload-label" htmlFor="frontSide">
          <div className="file-placeholder">Front Side</div>
        </label>
        <input
          type="file"
          id="frontSide"
          className="file-input"
          accept=".jpg,.jpeg,.png,.pdf"
        />
      </div>
      <div className="upload-box">
        <label className="upload-label" htmlFor="backSide">
          <div className="file-placeholder">Back Side</div>
        </label>
        <input
          type="file"
          id="backSide"
          className="file-input"
          accept=".jpg,.jpeg,.png,.pdf"
        />
      </div>
    </div>
    <small className="error-text">This field is required.</small>
  </div>

  <div className="form-group">
    <label>Document Type *</label>
    <select>
      <option>Select a Document Type</option>
    </select>
  </div>

  <p className="note">
    <strong>N.B:</strong> If multiple document upload needed, please attach all
    the documents in a single PDF. Then select{" "}
    <strong>"Other documents"</strong> and upload the PDF.
  </p>
</div>


      {/* Buttons */}
      <div className="button-group">
        <button className="reset-button">Reset ❌</button>
        <button className="claim-button">Claim 🗂</button>
      </div>
    </div>
  );
};

export default MicroHealthInsurance;
