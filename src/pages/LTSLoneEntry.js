import React from 'react'

const LTSLoneEntry = () => {
  return (
    <div>
      <div className="content-wrapper">
      <div className="container mt-5">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h2 className="title mb-0">LTS Lone Entry</h2>
          </div>
          <div className="card-body">
            <form>
              <div className="section">
                <div className="form-grid row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>LTS Account No</label>
                      <select className="form-control">
                        <option value="acc1">acc1</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Name</label>
                      <input type="text" className="form-control" placeholder="Name" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Type</label>
                      <select className="form-control">
                        <option value="plan1">plan1</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>T Date</label>
                      <input type="date" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Amount</label>
                      <input type="number" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Collector</label>
                      <input type="text" className="form-control" placeholder="Collector#" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Loan Number</label>
                      <input type="text" className="form-control" placeholder="Loan Number#" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Session ID</label>
                      <input type="text" className="form-control" placeholder="Session ID" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="button-group">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default LTSLoneEntry
