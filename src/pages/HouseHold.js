import React from 'react'

const HouseHold = () => {
  return (
    <div>
      <div className="content-wrapper">
      <div className="container mt-5">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h2 className="title mb-0">House Hold Setup</h2>
          </div>
          <div className="card-body">
            <form>
              <div className="section">
                <div className="form-grid row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>HH Code</label>
                      <input type="text" className="form-control" placeholder="HH Code" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Area</label>
                      <div className="search-box">
                        <select className="form-control">
                          <option value="">Select Area</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>HH Address</label>
                      <input type="text" className="form-control" placeholder="HH Address" />
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

export default HouseHold
