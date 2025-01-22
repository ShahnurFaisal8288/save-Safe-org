import React from "react";

const LTSAccount = () => {
  return (
    <div>
      <div className="content-wrapper">
      <div className="container mt-5">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h2 className="title mb-0">LTS Account</h2>
          </div>
          <div className="card-body">
            <form>
              <div className="section">
                <div className="form-grid row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Account</label>
                      <select className="form-control">
                        <option value="acc1">acc1</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>LTS</label>
                      <input type="text" className="form-control" placeholder="LTS" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Description</label>
                      <textarea className="form-control" placeholder="Description"></textarea>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>LTS Plan</label>
                      <select className="form-control">
                        <option value="plan1">plan1</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Opening Date</label>
                      <input type="date" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Closing Date</label>
                      <input type="date" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Term Deposit</label>
                      <input type="text" className="form-control" placeholder="Term Deposit" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Nominee Name</label>
                      <select className="form-control">
                        <option value="fahim">fahim</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Designation</label>
                      <select className="form-control">
                        <option value="Designation1">Designation1</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Relation</label>
                      <input type="text" className="form-control" placeholder="Relation#" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Status</label>
                      <select className="form-control">
                        <option value="status1">status1</option>
                      </select>
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
  );
};

export default LTSAccount;
