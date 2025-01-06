import React from 'react'

const Session = () => {
  return (
    <div>
      <div className="content-wrapper">
        <div className="container mt-5">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="title mb-0">Session Management</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="section">
                  <div className="form-grid row">
                    <div className="form-group col-12 col-md-6">
                      <label>Session</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Opening Date</label>
                      <input type="date" className="form-control" />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Opening Balance</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Closing Date</label>
                      <input type="date" className="form-control" />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Closing Balance</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Collector Cash Count</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Application Password in HandHeld Device for this Collector</label>
                      <input type="password" className="form-control" />
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

export default Session
