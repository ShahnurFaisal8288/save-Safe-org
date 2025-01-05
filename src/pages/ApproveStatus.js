import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ApproveStatus = () => {
  const { id } = useParams(); // Get ID from the URL params
  const [data, setData] = useState(null); // Store fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [remarksError, setRemarksError] = useState("");
  const [showRemarks, setShowRemarks] = useState(false);
  const [remarks, setRemarks] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/health_insurance/${id}`
        );
        setData(response.data); // Set data
        setLoading(false); // Stop loading
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false); // Stop loading
      }
    };

    fetchPostData();
  }, [id]);

  // Show loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Show error message if there's an error
  if (error) {
    return <p>{error}</p>;
  }

  const calculateAge = (dob) => {
    if (!dob) return "N/A"; // If no date of birth is provided
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the current month/day is before the birth month/day
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };
  const handleAction = async (status) => {
    if (status === 3 && !remarks) {
      // Validate remarks if status is "Reject"
      setRemarksError("Remarks are required for rejection.");
      // alert("Remarks are required for rejection.");
      // Swal.fire({
      //   icon: "error",
      //   title: "Remarks",
      //   text: `Remarks are required for rejection!`,
      //   showConfirmButton: false,
      //   timer: 2000,
      //   timerProgressBar: true,
      //   showConfirmButton: true,
      //   confirmButtonText: "OK",
      // });
      return;
    } else {
      setRemarksError(""); // Reset error message
    }
    try {
      await axios.put(
        `http://localhost:8000/api/health_insurance/update/${id}`,
        { status, remarks: status === 3 ? remarks : undefined }
      );
      if (status === 3 && !remarks) {
        // alert("Remarks are required for rejection.");
        // Swal.fire({
        //   icon: "error",
        //   title: "Remarks",
        //   text: `Remarks are required for rejection!`,
        //   showConfirmButton: false,
        //   timer: 2000,
        //   timerProgressBar: true,
        //   showConfirmButton: true,
        //   confirmButtonText: "OK",
        // });
        return;
      }
      navigate("/insurance-list");
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleRemarksChange = (event) => {
    setRemarks(event.target.value);
    if (event.target.value) {
      setRemarksError(""); // Reset error message when user types in remarks
    }
  };

  return (
    <>
      <style>
        {`
      .container {
  background-color: #f8f9fa;
  padding: 2.5rem;
  border-radius: 10px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
}

.header h1 {
  background-color: #f72b8b;
  color: white;
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  padding: 1rem;
  margin-bottom: 2.5rem;
  border-radius: 8px;
}

.card {
  background-color: #ffffff;
  padding: 2rem;
  margin-bottom: 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.card h2 {
  background-color: #f72b8b;
  color: white;
  font-size: 22px;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  font-weight: bold;
  font-size: 14px;
  color: #495057;
  margin-bottom: 0.5rem;
  display: block;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  font-size: 14px;
  color: #495057;
  border: 1px solid #ced4da;
  border-radius: 5px;
  background-color: #f8f9fa;
  transition: border-color 0.3s ease-in-out;
}

.form-group input:focus {
  border-color: #80bdff;
  outline: none;
}

.form-group input:disabled {
  background-color: #e9ecef;
  color: #6c757d;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.btn.reject {
  background-color: #dc3545;
}

.btn.reject:hover {
  background-color: #c82333;
}

.btn.approve {
  background-color: #28a745;
}

.btn.approve:hover {
  background-color: #218838;
}


      `}
      </style>

      <div className="container mt-5">
        <header className="header">
          <h1>Health Insurance Enrollment Buffer</h1>
        </header>

        <section className="card">
          <h2>Project</h2>
          <div className="form-group">
            <label>
              Project<span>*</span>
            </label>
            <input
              type="text"
              value={data.project.projectTitle || "N/A"}
              disabled
            />
          </div>
        </section>

        {/* <section className="card">
        <h2>VO Information</h2>
        <div className="form-group">
          <label>VO Code</label>
          <input type="text" value={data.voCode || "N/A"} disabled />
        </div>
        <div className="form-group">
          <label>VO Name</label>
          <input type="text" value={data.voName || "N/A"} disabled />
        </div>
      </section> */}

        <section className="card">
          <h2>Member Information</h2>
          <div className="form-row">
            <div className="form-group">
              <label>
                Member Number<span>*</span>
              </label>
              <input type="text" value={data.orgmemno || "N/A"} disabled />
            </div>
            <div className="form-group">
              <label>ERP Member Number</label>
              <input
                type="text"
                value={data.erpMemberNumber || "N/A"}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Member Name</label>
              <input type="text" value={data.client.name || "N/A"} disabled />
            </div>
            <div className="form-group">
              <label>Member Category</label>
              <input
                type="text"
                value={data.memberCategory || "N/A"}
                disabled
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Member Mobile Number</label>
              <input type="text" value={data.contact_no || "N/A"} disabled />
            </div>
            <div className="form-group">
              <label>Age</label>
              <input
                type="text"
                value={
                  data.client.date_of_birth
                    ? calculateAge(data.client.date_of_birth)
                    : "N/A"
                }
                disabled
              />
            </div>
            <div className="form-group">
              <label>National ID</label>
              <input type="text" value={data.nationalId || "N/A"} disabled />
            </div>
          </div>
        </section>

        <section className="card">
          <h2>Insurance Information</h2>
          <div className="form-row">
            <div className="form-group">
              <label>
                Product<span>*</span>
              </label>
              <input
                type="text"
                value={data?.category?.policy_name || "N/A"}
                disabled
              />
            </div>
            <div className="form-group">
              <label>
                Category<span>*</span>
              </label>
              <input
                type="text"
                value={data.category?.title || "N/A"}
                disabled
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>
                Insurance Policy ID<span>*</span>
              </label>
              <input
                type="text"
                value={data.insurance_policy_no || "N/A"}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Total Premium Amount</label>
              <input type="text" value={data.premium_amnt || "N/A"} disabled />
            </div>
            <div className="form-group">
              <label>Sum Insured</label>
              <input
                type="text"
                value={data.category?.sum_insured || "N/A"}
                disabled
              />
            </div>
          </div>
        </section>

        <section className="card">
          <h2>Nominee Information</h2>
          <div className="form-row">
            <div className="form-group">
              <label>
                Name<span>*</span>
              </label>
              <input type="text" value={data.nominee_name || "N/A"} disabled />
            </div>
            <div className="form-group">
              <label>
                Date of Birth<span>*</span>
              </label>
              <input
                type="text"
                value={data.nominee_birthdate || "N/A"}
                disabled
              />
            </div>
            <div className="form-group">
              <label>
                Relationship<span>*</span>
              </label>
              <input
                type="text"
                value={data.nomineeRelation.data_name || "N/A"}
                disabled
              />
            </div>
            <div className="form-group">
              <label>
                Nominee Mobile Number<span>*</span>
              </label>
              <input
                type="text"
                value={data.nominee_phone_no || "N/A"}
                disabled
              />
            </div>
          </div>
        </section>
        {/* {showRemarks && ( */}
          <section className="card">
            <h2>Remarks Information</h2>
            <div className="form-row col-6">
              <div className="form-group">
                <label>Remarks</label>
                <textarea
                  type="text"
                  value={remarks}
                  onChange={(e) => {
                    setRemarks(e.target.value);
                    handleRemarksChange(e);
                  }}
                  style={{
                    width: "200%", // Ensures the textarea spans the full width
                    height: "100px", // Adjust height as needed
                    resize: "vertical", // Allow vertical resizing by the user
                    padding: "10px", // Add padding for better readability
                    border: "1px solid #ced4da", // Consistent styling
                    borderRadius: "4px", // Rounded corners for better aesthetics
                  }}
                />
                {remarksError && (
                  <div className="remarks-error" style={{ color: "red" }}>
                    {remarksError} {/* Display error message */}
                  </div>
                )}
              </div>
            </div>
          </section>
        {/* )} */}

        <footer className="footer">
          {data.status !== 2 && (
            <>
              <button
                className="btn reject"
                onClick={() => {
                  // setShowRemarks(true);
                  handleAction(3);
                }}
              >
                Reject
              </button>
              <button className="btn approve" onClick={() => handleAction(2)}>
                Approve
              </button>
            </>
          )}
        </footer>
      </div>
    </>
  );
};

export default ApproveStatus;
