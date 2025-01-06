import React from "react";

const BusinessRules = () => {
  return (
    <div>
      <div className="content-wrapper">
        <div className="container mt-5">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="title mb-0">Business Rules</h2>
            </div>

            <div className="card-body">
              <form>
                {/* Saving Rules Section */}
                <div className="section mb-4">
                  <h3 className="text-lg font-semibold bg-green-700 text-white p-2">
                    Saving Rules
                  </h3>
                  <div className="form-grid row p-3">
                    <div className="form-group col-8 col-md-8 mb-3">
                      Following rules will be in effect from the date:
                      <input
                        type="date"
                        className="form-control w-48 ml-2 inline-block"
                        defaultValue="2024-05-01"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6 mb-3">
                      <label className="block mb-1">
                        Saving balance may never fall below 1/n th of Loan
                        balance:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={10}
                      />
                    </div>
                    <div className="form-group col-12 col-md-6 mb-3">
                      <label className="block mb-1">
                        Minimum Savings balance for saving interest calculation:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={0}
                      />
                    </div>
                    <div className="form-group col-12 col-md-6 mb-3">
                      <label className="block mb-1">
                        Savings Interest rate for a month (period for prior to
                        P6V3):
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={0.583333}
                        step="0.000001"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label className="block mb-1">
                        Interval to credit savings interest from provision:
                      </label>
                      <select className="form-control">
                        <option>Half yearly</option>
                        <option>Quarterly</option>
                        <option>Monthly</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Lending Rules Section */}
                <div className="section mb-4">
                  <h3 className="text-lg font-semibold bg-green-700 text-white p-2">
                    Lending Rules
                  </h3>
                  <div className="form-grid row p-3">
                    <div className="form-group col-12 col-md-6 mb-3">
                      <label className="block mb-1">
                        No. of months in a term:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={1}
                      />
                    </div>
                    <div className="form-group col-12 col-md-6 mb-3">
                      <label className="block mb-1">
                        Loan size for level 1:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={0}
                      />
                    </div>
                    <div className="form-group col-12 col-md-6 mb-3">
                      <label className="block mb-1">
                        Periodic interest for level 1:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={2.0}
                        step="0.01"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6 mb-3">
                      <label className="block mb-1">
                        Starting credit limit:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={50000}
                      />
                    </div>
                  </div>
                </div>

                {/* Loan Loss Reserve Section */}
                <div className="section mb-4">
                  <h3 className="text-lg font-semibold bg-green-700 text-white p-2">
                    Loan Loss Reserve
                  </h3>
                  <div className="form-grid row p-3">
                    <div className="form-group col-12 col-md-6 mb-3">
                      <label className="block mb-1">LLR Ver:</label>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={2}
                      />
                    </div>
                    <div className="form-group col-12 col-md-6 mb-3">
                      <label className="block mb-1">Minimum LLR:</label>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={2000}
                      />
                    </div>
                    <div className="col-12">
                      <table className="w-full border-collapse border">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border p-2">RISKCR</th>
                            <th className="border p-2">MPR</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border p-2">100.001</td>
                            <td className="border p-2">0.0005</td>
                          </tr>
                          <tr>
                            <td className="border p-2">80</td>
                            <td className="border p-2">0.001</td>
                          </tr>
                          <tr>
                            <td className="border p-2">70</td>
                            <td className="border p-2">0.0015</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Credit Point Increment Section */}
                <div className="section mb-4">
                  <h3 className="text-lg font-semibold bg-green-700 text-white p-2">
                    Credit Point Increment
                  </h3>
                  <div className="form-grid row p-3">
                    <div className="col-12">
                    <h4 className="mb-3">For Monthly repayment {">="} 10%</h4>
                      <div className="form-group mb-3">
                        <label className="block mb-1">
                          Loan size Less than Tk. 30,001
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          defaultValue={2000}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="block mb-1">
                          Loan size Tk. 30,001 and above and Less than 50,001
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          defaultValue={3000}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="block mb-1">
                          Loan size Tk.50,001 and above
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          defaultValue={4000}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Button */}
                <div className="button-group">
                  <button
                    type="button"
                    className="btn bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Close
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

export default BusinessRules;
