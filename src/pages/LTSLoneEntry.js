import React from 'react'

const LTSLoneEntry = () => {
  return (
    <div>
      <div className="container mt-5">
        <h2 className="title">LTS Lone Entry</h2>
        <form>
          <div className="section">
            <div className="form-grid">
              <div className="form-group">
                <label>LTS Account No</label>
                <select className="form-control">
                  <option value="acc1">acc1</option>
                </select>
              </div>

              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" placeholder="Name" />
              </div>

              <div className="form-group">
                <label>Type</label>
                <select className="form-control">
                  <option value="plan1">plan1</option>
                </select>
              </div>

              <div className="form-group">
                <label>T Date</label>
                <input type="date" className="form-control" />
              </div>

              <div className="form-group">
                <label>Amount</label>
                <input type="number" className="form-control" />
              </div>

              <div className="form-group">
                <label>Collector</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Collector#"
                />
              </div>

              <div className="form-group">
                <label>Loan Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Loan Number#"
                />
              </div>

              <div className="form-group">
                <label>Session ID</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Session ID"
                />
              </div>

              
            </div>
          </div>

          {/* Buttons */}
          <div className="">
            <button type="submit" className="claim-button">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LTSLoneEntry
