import React from 'react'

const LeaveEntry = () => {
  return (
    <div>
      <div className="content-wrapper">
        <div className="container mt-5">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="title mb-0">Leave Entry</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="section">
                  <div className="form-grid row">
                   <div className="form-group col-12 col-md-4">
                      <label>Pin</label>
                      <select className="form-control">
                        <option value="N/A">N/A</option>
                      </select>
                    </div>
                   <div className="form-group col-12 col-md-6">
                      <label>Leave Type</label>
                      <select className="form-control">
                        <option value="N/A">N/A</option>
                      </select>
                    </div>


                    <div className="form-group col-12 col-md-4">
                      <label>Date Start</label>
                      <input type="date" className="form-control" />
                    </div>
                    <div className="form-group col-12 col-md-4">
                      <label>Date Start</label>
                      <input type="date" className="form-control" />
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

export default LeaveEntry
