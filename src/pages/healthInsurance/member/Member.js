import React from "react";

const Member = () => {
  return (
    <div>
      <div className="content-wrapper">
        <div className="container mt-5">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="title mb-0">Member Add</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="section">
                  <div className="form-grid row">
                    <div className="form-group col-12 col-md-6">
                      <label>Collector#</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Collector#"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Account#</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Account#"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Sex</label>
                      <select className="form-control">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Birth Date</label>
                      <input type="date" className="form-control" />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Guardian</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Guardian"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Date In</label>
                      <input type="date" className="form-control" />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Date Out</label>
                      <input type="date" className="form-control" />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>House Hold</label>
                      <select className="form-control">
                        <option value="6007">6007</option>
                      </select>
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Current Address</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Current Address"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Permanent Address</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Permanent Address"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Contact#</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Contact#"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Occupation</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Occupation"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Relationship</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Relationship"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <input type="checkbox" id="payoff" />
                      <label htmlFor="payoff">Payoff</label>
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Payoff Date</label>
                      <input type="date" className="form-control" />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <input type="checkbox" id="writeoff" />
                      <label htmlFor="writeoff">Writeoff</label>
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Writeoff Date</label>
                      <input type="date" className="form-control" />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Cause of Writeoff</label>
                      <select className="form-control">
                        <option value="N/A">N/A</option>
                      </select>
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <input type="checkbox" id="loan-eligible" />
                      <label htmlFor="loan-eligible">Loan Eligible</label>
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

export default Member;
