import React from "react";

const LTSAccount = () => {
  return (
    <div>
      <div className="container mt-5">
        <h2 className="title">LTS Account</h2>
        <form>
          <div className="section">
            <div className="form-grid">
              <div className="form-group">
                <label>Account</label>
                <select className="form-control">
                  <option value="acc1">acc1</option>
                </select>
              </div>

              <div className="form-group">
                <label>LTS</label>
                <input type="text" className="form-control" placeholder="LTS" />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" placeholder="Description"></textarea>
              </div>

              <div className="form-group">
                <label>LTS Plan</label>
                <select className="form-control">
                  <option value="plan1">plan1</option>
                </select>
              </div>

              <div className="form-group">
                <label>Opening Date</label>
                <input type="date" className="form-control" />
              </div>

              <div className="form-group">
                <label>Closing Date</label>
                <input type="date" className="form-control" />
              </div>

              <div className="form-group">
                <label>Term Deposit</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Term Deposit"
                />
              </div>

              <div className="form-group">
                <label>Nominee Name</label>
                <select className="form-control">
                  <option value="fahim">fahim</option>
                </select>
              </div>
              <div className="form-group">
                <label>Designation</label>
                <select className="form-control">
                  <option value="Designation1">Designation1</option>
                </select>
              </div>

              <div className="form-group">
                <label>Relation</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Relation#"
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select className="form-control">
                  <option value="status1">status1</option>
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
  );
};

export default LTSAccount;
