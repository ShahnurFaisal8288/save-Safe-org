import React from 'react';

function Area() {
  return (
    <div className="container mt-5">
    <h2 className="title">Area Setup</h2>
    <form>
      <div className="section">
        <div className="form-grid">
          <div className="form-group">
            <label>Area Name</label>
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

export default Area;

