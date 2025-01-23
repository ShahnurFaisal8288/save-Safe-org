import React, { useEffect, useState } from "react";
import axiosInstance from "../../components/axiosInstance";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const LeaveEntry = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState([]);

  useEffect(() => {
    const fetchPin = async () => {
      try {
        const response = await axiosInstance.get("collectors");
        setPin(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPin();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      pin: parseInt(e.target.pin.value, 10),
      leave_type: e.target.leave_type.value,
      date_start: e.target.date_start.value,
      date_end: e.target.date_end.value,
    }

    try {
      axiosInstance.post("leave/create", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Data Submission Successful",
            text: `Data has been stored successfully!`,
            showConfirmButton: true,
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/leave-entry-list");

            }
          });
        }
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while saving sidebar data.");
    }
  }

  

  return (
    <div>
      <div className="content-wrapper">
        <div className="container mt-5">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="title mb-0">Leave Entry</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="section">
                  <div className="form-grid row">
                    <div className="form-group col-12 col-md-4">
                      <label>Pin</label>
                      <select name="pin" className="form-control">
                        <option value="N/A">N/A</option>
                        {pin.map((item, index) => (
                          <option key={index} value={item.pin}>
                            {parseInt(item.pin, 10)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Leave Type</label>
                      <select name="leave_type" className="form-control">
                        <option value="">Choose</option>
                        <option value="Paid">Paid</option>
                        <option value="Unpaid">Unpaid</option>
                        <option value="Absent">Absent</option>
                        <option value="Pregnancy">Pregnancy</option>
                      </select>
                    </div>

                    <div className="form-group col-12 col-md-4">
                      <label>Date Start</label>
                      <input name="date_start" type="date" className="form-control" />
                    </div>
                    <div className="form-group col-12 col-md-4">
                      <label>Date Start</label>
                      <input name="date_end" type="date" className="form-control" />
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

export default LeaveEntry;
