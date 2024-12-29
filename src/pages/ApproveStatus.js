import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ApproveStatus = () => {
  const { id } = useParams(); // Get ID from the URL params
  const [data, setData] = useState(null); // Store fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

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
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <div className="container mt-5">
      <header className="header">
        <h1>Health Insurance Enrollment Buffer</h1>
      </header>

      <section className="card">
        <h2>Project</h2>
        <div className="form-group">
          <label>Project<span>*</span></label>
          <input type="text" value={data.project.projectTitle || "N/A"} disabled />
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
            <label>Member Number<span>*</span></label>
            <input type="text" value={data.orgmemno || "N/A"} disabled />
          </div>
          <div className="form-group">
            <label>ERP Member Number</label>
            <input type="text" value={data.erpMemberNumber || "N/A"} disabled />
          </div>
          <div className="form-group">
            <label>Member Name</label>
            <input type="text" value={data.client.name || "N/A"} disabled />
          </div>
          <div className="form-group">
            <label>Member Category</label>
            <input type="text" value={data.memberCategory || "N/A"} disabled />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Member Mobile Number</label>
            <input type="text" value={data.contact_no || "N/A"} disabled />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input type="text" value={data.client.date_of_birth ? calculateAge(data.client.date_of_birth) : "N/A"} disabled />
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
            <label>Product<span>*</span></label>
            <input type="text" value={data.category.policy_name || "N/A"} disabled />
          </div>
          <div className="form-group">
            <label>Category<span>*</span></label>
            <input type="text" value={data.category?.title || "N/A"} disabled />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Insurance Policy ID<span>*</span></label>
            <input type="text" value={data.insurance_policy_no || "N/A"} disabled />
          </div>
          <div className="form-group">
            <label>Total Premium Amount</label>
            <input type="text" value={data.premium_amnt || "N/A"} disabled />
          </div>
          <div className="form-group">
            <label>Sum Insured</label>
            <input type="text" value={data.category?.sum_insured || "N/A"} disabled />
          </div>
        </div>
      </section>

      <section className="card">
        <h2>Nominee Information</h2>
        <div className="form-row">
          <div className="form-group">
            <label>Name<span>*</span></label>
            <input type="text" value={data.nominee_name || "N/A"} disabled />
          </div>
          <div className="form-group">
            <label>Date of Birth<span>*</span></label>
            <input type="text" value={data.nominee_birthdate || "N/A"} disabled />
          </div>
          <div className="form-group">
            <label>Relationship<span>*</span></label>
            <input type="text" value={data.nomineeRelation.data_name || "N/A"} disabled />
          </div>
          <div className="form-group">
            <label>Nominee Mobile Number<span>*</span></label>
            <input type="text" value={data.nominee_phone_no || "N/A"} disabled />
          </div>
        </div>
      </section>

      <footer className="footer">
        <button className="btn reject" value="">Reject</button>
        <button className="btn approve">Approve</button>
      </footer>
    </div>
  );
};

export default ApproveStatus;
