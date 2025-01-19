import React from "react";

const ClaimSettlement = () => {
  return (
    <>
      <style>
        {`
          body {
            font-family: Arial, sans-serif;
            background-color: #f8f9fa;
            margin: 0;
            padding: 0;
          }
          
          .container {
            width: 100%;
            margin: 20px auto;
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          
          .section {
            margin-bottom: 30px;
          }
          
          h2 {
            background-color: #f72b8b;
            color: white;
            padding: 10px;
            border-radius: 5px;
            font-size: 1.2rem;
          }
          
          .form-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-top: 10px;
          }
          
          .input-group {
            display: flex;
            flex-direction: column;
          }
          
          label {
            margin-bottom: 5px;
            font-weight: bold;
          }
          
          .input-field,
          input,
          select {
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
          }
          
          .search-field {
            display: flex;
          }
          
          .search-field input {
            flex: 1;
          }
          
          .search-btn {
            background-color: #f72b8b;
            color: white;
            border: none;
            padding: 8px;
            border-radius: 5px;
            cursor: pointer;
          }
          
          .full-width {
            grid-column: span 2;
          }
          
          .button-group {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
          }
          
          .reset-btn,
          .settle-btn {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            cursor: pointer;
          }
          
          .reset-btn {
            background-color: #f44336;
            color: white;
          }
          
          .settle-btn {
            background-color: #4caf50;
            color: white;
          }
          
          @media (max-width: 768px) {
            .form-grid {
              grid-template-columns: 1fr;
            }

            .input-group.full-width {
              grid-column: span 1;
            }

            .button-group {
              flex-direction: column;
              align-items: stretch;
            }

            .reset-btn,
            .settle-btn {
              width: 100%;
            }
          }
        `}
      </style>
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
    </>
  );
};

export default ClaimSettlement;
