import React from 'react'

const Member = () => {
  return (
    <div className="container mt-5">
      <h2 className="title">Member Add</h2>
      <form>
        <div className="section">
          <div className="form-grid">
            <div className="form-group">
              <label>Collector#</label>
              <input type="number" className="form-control" placeholder="Collector#" />
            </div>

            <div className="form-group">
              <label>Account#</label>
              <input type="text" className="form-control" placeholder="Account#" />
            </div>

            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" placeholder="Name" />
            </div>

            <div className="form-group">
              <label>Sex</label>
              <select className="form-control">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label>Birth Date</label>
              <input type="date" className="form-control" />
            </div>

            <div className="form-group">
              <label>Guardian</label>
              <input type="text" className="form-control" placeholder="Guardian" />
            </div>

            <div className="form-group">
              <label>Date In</label>
              <input type="date" className="form-control" />
            </div>

            <div className="form-group">
              <label>Date Out</label>
              <input type="date" className="form-control" />
            </div>

            <div className="form-group">
              <label>House Hold</label>
              <select className="form-control">
                <option value="6007">6007</option>
              </select>
            </div>

            <div className="form-group">
              <label>Current Address</label>
              <input type="text" className="form-control" placeholder="Current Address" />
            </div>

            <div className="form-group">
              <label>Permanent Address</label>
              <input type="text" className="form-control" placeholder="Permanent Address" />
            </div>

            <div className="form-group">
              <label>Contact#</label>
              <input type="text" className="form-control" placeholder="Contact#" />
            </div>

            <div className="form-group">
              <label>Occupation</label>
              <input type="text" className="form-control" placeholder="Occupation" />
            </div>

            <div className="form-group">
              <label>Relationship</label>
              <input type="text" className="form-control" placeholder="Relationship" />
            </div>

            <div className="form-group custom-checkbox">
              <input type="checkbox" id="payoff" />
              <label htmlFor="payoff">Payoff</label>
            </div>

            <div className="form-group">
              <label>Payoff Date</label>
              <input type="date" className="form-control" />
            </div>

            <div className="form-group custom-checkbox">
              <input type="checkbox" id="writeoff" />
              <label htmlFor="writeoff">Writeoff</label>
            </div>

            <div className="form-group">
              <label>Writeoff Date</label>
              <input type="date" className="form-control" />
            </div>

            <div className="form-group">
              <label>Cause of Writeoff</label>
              <select className="form-control">
                <option value="N/A">N/A</option>
              </select>
            </div>

            <div className="form-group custom-checkbox">
              <input type="checkbox" id="loan-eligible" />
              <label htmlFor="loan-eligible">Loan Eligible</label>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button type="submit" className="claim-button">
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

export default Member
