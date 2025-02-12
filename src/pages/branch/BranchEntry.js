import React, { useState } from "react";
import axiosInstance from "../../components/axiosInstance";
import Swal from "sweetalert2";

const BranchEntry = () => {
  const [branch, setBranch] = useState({
    branch_type: "",
    branch_code: "",
    branch_name: "",
    area_id: "",
    area_name: "",
    region_id: "",
    region_name: "",
    division_id: "",
    division_name: "",
    zone_id: "",
    zone_name: "",
    program_id: "",
    program_name: "",
    // program_id_extra: "",
    isactive_erp: "",
    // syncdatabackup: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setBranch({
      ...branch,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when starting the request
    setError(null); // Reset the error state
    try {
      const postBranch = async () => {
        const response = await axiosInstance.post("branch/store", branch);
        console.log(response.data);
        setLoading(false); // Set loading state to false when the request is successful
      };
      postBranch();
      Swal.fire({
        icon: "success",
        title: "Branch Data Successfully Added",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (error) {
      return setError(error); // Set the error state if the request fails
    }
  };

  return (
    <div className="content-wrapper">
      <div className="container mt-5">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h2 className="title mb-0">Branch Setup</h2>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit} autoComplete="off" noValidate>
              <div className="row">
                
                <div className="col-md-4">
                  <label className="form-label">Is Active ERP</label>
                  <select name="isactive_erp" onChange={handleChange} className="form-control">
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Branch Name</label>
                  <input
                    type="text"
                    name="branch_name"
                    value={branch.branch_name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Branch Code</label>
                  <input
                    type="text"
                    name="branch_code"
                    value={branch.branch_code}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Branch Type</label>
                  <input
                    type="text"
                    name="branch_type"
                    value={branch.branch_type}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Area ID</label>
                  <input
                    type="text"
                    name="area_id"
                    value={branch.area_id}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Area Name</label>
                  <input
                    type="text"
                    name="area_name"
                    value={branch.area_name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Region ID</label>
                  <input
                    type="text"
                    name="region_id"
                    value={branch.region_id}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Region Name</label>
                  <input
                    type="text"
                    name="region_name"
                    value={branch.region_name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Zone ID</label>
                  <input
                    type="text"
                    name="zone_id"
                    value={branch.zone_id}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Zone Name</label>
                  <input
                    type="text"
                    name="zone_name"
                    value={branch.zone_name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Program ID</label>
                  <input
                    type="text"
                    name="program_id"
                    value={branch.program_id}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Program Name</label>
                  <input
                    type="text"
                    name="program_name"
                    value={branch.program_name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Division ID</label>
                  <input
                    type="text"
                    name="division_id"
                    value={branch.division_id}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Division Name</label>
                  <input
                    type="text"
                    name="division_name"
                    value={branch.division_name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-12 mt-3 text-center">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchEntry;
