import React from 'react'

const ClosingEarnings = () => {
  return (
    <div>
      <div className="content-wrapper">
        <div className="container mt-5">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="title mb-0">Closing Earnings Posting</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="section">
                  <div className="form-grid row">
                  <div className="form-group col-12 col-md-6">
                      <label>Account Number</label>
                      <select className="form-control">
                        <option value="N/A">N/A</option>
                      </select>
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Collector</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Name</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Savings</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Earnings Outstanding</label>
                      <input type="text" className="form-control" />
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

export default ClosingEarnings
