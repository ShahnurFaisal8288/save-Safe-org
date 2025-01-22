import React from 'react'

const LoanEntry = () => {
  return (
    <div className="content-wrapper">
      <div className="container mt-5">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h2 className="title mb-0">Micro Health Insurance Claim Benefit Setup</h2>
          </div>
          <div className="card-body">
            <form>
              <div className="section">
                <div className="form-grid row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="hidden"
                        name="health_insurance_id"
                        value="3"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="hidden"
                        name="enrollment_id"
                        value="123e4567-e89b-12d3-a456-426614174000"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="hidden"
                        name="insurance_policy_id"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Project *</label>
                      <select className="form-control">
                        <option>Choose</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="section">
                <div className="section-header">Member Information</div>
                <div className="form-grid row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Member Number *</label>
                      <div className="search-box">
                        <input
                          type="text"
                          list="memberNumbers"
                          className="form-control"
                          placeholder="Member Number"
                        />
                        <datalist id="memberNumbers"></datalist>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Member Name</label>
                      <input
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Member Mobile Number</label>
                      <input
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Age</label>
                      <input
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="button-group">
                <button type="submit" className="btn btn-primary">
                  Save 🗂
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => window.location.href = '/loanentries'}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoanEntry
