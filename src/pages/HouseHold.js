import React from 'react'

const HouseHold = () => {
  return (
    <div>
      <div className="container mt-5">
      <h2 className="title">House Hold Setup</h2>
      <form>
        <div className="section">
          <div className="form-grid">
            
            <div className="form-group">
              <label>HH Code</label>
              <input type="text" />
            </div>

            <div className="form-group">
              <label>Area</label>
              <div className="search-box">
                <select className="form-control">
                  <option value="">
                    Select Area
                  </option>
                </select>
              </div>
            </div>


            <div className="form-group">
              <label>HH Address</label>
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
    </div>
  )
}

export default HouseHold
