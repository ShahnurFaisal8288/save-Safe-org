import React from "react";

const OfficeTransactions = () => {
  return (
    <div>
      <div className="content-wrapper">
        <div className="container mt-5">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="title mb-0">Office Transactions Setup</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="section">
                  <div className="form-grid row">
                    <div className="form-group col-12 col-md-4">
                      <label>T Date</label>
                      <input type="date" className="form-control" />
                    </div>


                    <div className="form-group col-12 col-md-4">
                      <label>Vouch No</label>
                      <input type="number" className="form-control" />
                    </div>

                    <div className="form-group col-12 col-md-4">
                      <label>Transaction</label>
                      <select className="form-control">
                        <option value="N/A">N/A</option>
                      </select>
                    </div>
                    <div className="form-group col-12 col-md-4">
                      <label>Coll</label>
                      <select className="form-control">
                        <option value="N/A">N/A</option>
                      </select>
                    </div>

                    <div className="form-group col-12 col-md-4">
                      <label>Amount</label>
                      <input type="number" className="form-control" />
                    </div>
                    <div className="form-group col-12 col-md-4">
                      <label>Description</label>
                      <textarea className="form-control">

                      </textarea>
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

export default OfficeTransactions;
