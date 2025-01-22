import React from "react";

function Area() {
  return (
    <div>
      <div className="content-wrapper">
        <div className="container mt-5">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="title mb-0">Area Setup</h2>
            </div>

            <div className="card-body">
              <form>
                {/* Top Section - Data Entry */}
                <div className="grid grid-cols-6 gap-4 mb-8">
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Area Name
                    </label>
                    <input
                      type="text"
                      className="form-control w-full border rounded px-3 py-2"
                      defaultValue="02584"
                    />
                  </div>
                </div>
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
}

export default Area;
