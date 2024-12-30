import React from 'react'

const CollectorAdd = () => {
  return (
    <div>
      <div className="container mt-5">
      <h2 className="title">Collector/Staff Add</h2>
      <form>
        <div className="section">
          <div className="form-grid">
            <div className="form-group">
              <label>User Name</label>
              <input type="text" className="form-control" placeholder="User#" />
            </div>

            <div className="form-group">
              <label>Collector Number</label>
              <input type="text" className="form-control" placeholder="Collector#" />
            </div>

            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" placeholder="Name" />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input type="text" className="form-control" placeholder="Address" />
            </div>

            <div className="form-group">
              <label>Branch Name</label>
              <select className="form-control">
                <option value="branch1">Branch1</option>
              </select>
            </div>
            <div className="form-group">
              <label>Designation</label>
              <select className="form-control">
                <option value="Designation1">Designation1</option>
              </select>
            </div>

            <div className="form-group">
              <label>Role#</label>
              <input type="text" className="form-control" placeholder="Role#" />
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
              <label>Session</label>
              <select className="form-control">
                <option value="Session1">Session1</option>
              </select>
            </div>

            <div className="form-group">
              <label>Opening Date</label>
              <input type="date" className="form-control" />
            </div>

            <div className="form-group">
              <label>Opening Balance</label>
              <input type="number" className="form-control" />
            </div>

            <div className="form-group">
              <label>Closing Date</label>
              <input type="date" className="form-control" />
            </div>

            <div className="form-group">
              <label>Closing Balance</label>
              <input type="date" className="form-control" />
            </div>

            <div className="form-group">
              <label>Reported Balance</label>
              <input type="date" className="form-control" />
            </div>
           
            <div className="form-group">
              <label>Entry Method</label>
              <select className="form-control">
                <option value="1">1</option>
              </select>
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" />
            </div>

            <div className="form-group">
              <label>Old Password</label>
              <input type="password" className="form-control" />
            </div>

            <div className="form-group">
              <label>Loan Serial No</label>
              <select className="form-control">
                <option value="1">1</option>
              </select>
            </div>

            <div className="form-group">
              <label>Pin</label>
              <input type="number" className="form-control" />
            </div>

            <div className="form-group">
              <label>Basic</label>
              <input type="number" className="form-control" />
            </div>

            <div className="form-group">
              <label>Sex</label>
              <select className="form-control">
                <option value="1">Male</option>
              </select>
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

export default CollectorAdd
