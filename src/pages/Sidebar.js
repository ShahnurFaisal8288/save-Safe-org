import React from "react";

function Sidebar() {
  return (
    <div className="container mt-5">
      <h2 className="title">Sidebar Setup</h2>
      <form>
        <div className="section">
          <div className="form-grid">
            <div className="form-group">
              <label>Parent Sidebar</label>
              <div className="search-box">
                <select className="form-control">
                  <option value="" disabled>
                    Select Parent Sidebar
                  </option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Sidebar Element Name</label>
              <input type="text" />
            </div>

            <div className="form-group">
              <label>Element Url</label>
              <input type="text" />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="">
          <button type="submit" className="claim-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Sidebar;
