import React from 'react'

const LoanEntry = () => {
  return (
    <div className="container mt-5">
    <h2 className="title">Micro Health Insurance Claim Benefit Setup</h2>
    <form>
      <div className="form-group">
        {/* <label>Mapped Health Insurance ID</label> */}
        <input
          type="hidden"
          name="health_insurance_id"
          // value={selectedProduct.insurance_product_id}
          value="3"
          readOnly
        />
      </div>
      <div className="form-group">
        {/* <label>Enrollment ID</label> */}
        <input
          type="hidden"
          name="enrollment_id"
          value="123e4567-e89b-12d3-a456-426614174000"
          readOnly
        />
      </div>
      <div className="form-group">
        {/* <label>Insurance Policy id</label> */}
        <input
          type="hidden"
          name="insurance_policy_id"
         
          readOnly
        />
      </div>

      {/* Project Section */}
      <div className="section">
        {/* <div className="section-header">Project</div> */}
        <div className="form-group">
          <label>Project *</label>
          <select>
            <option>Choose</option>
           
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
              <input
                type="text"
                list="memberNumbers"
               
                placeholder="Member Number"
              />
              <datalist id="memberNumbers">
                
              </datalist>
            </div>
          </div>

          <div className="form-group">
            <label>Member Name</label>
            <input
              type="text"
              
            />
          </div>

          <div className="form-group">
            <label>Member Mobile Number</label>
            <input
              type="text"
             
            />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input
              type="text"
              
              
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="">
        <button type="submit" className="claim-button">
          Save 🗂
        </button>
      </div>
    </form>
  </div>
  )
}

export default LoanEntry
