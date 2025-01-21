import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../components/axiosInstance';

const SettledStatus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);




  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(`health_insurance/claim/${id}`);
      setData(response.data);
      console.log(response.data);
    }
    fetchData();
  }, [id]);

  const handleAction = async (status_id) => {
    try {
      await axiosInstance.put(`claim/update/${id}`, {
        status_id: status_id,
      });
      navigate("/claimList");
    } catch (error) {
      console.error(error);
    }
  }

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
          <h1>Health Insurance Claim Details</h1>
        </header>

        <section className="card">
          {/* <h2>Member Information</h2> */}
          <div className="form-row">
            <div className="form-group col-4">
              <label>
                Enrolment No<span>*</span>
              </label>
              <input 
              type="text"
              value={data?.enrollment_id}
              disabled />
            </div>
            <div className="form-group  col-3">
              <label>Insurance Policy Name</label>
              <input
                type="text"
                value={data?.InsurancePolicy.policy_name}
                disabled
              />
            </div>
            <div className="form-group  col-4">
              <label>Insurance Policy NO.</label>
              <input
                type="text"
                value={data?.insurance_policy_no}
                disabled
              />
            </div>
            <div className="form-group col-3">
              <label>Treatment Type</label>
              <input type="text"
              value={data?.treatmentType.type_name} 
              disabled />
            </div>
            <div className="form-group col-3">
              <label>Date Of Incident</label>
              <input
                type="text"
                value={data?.date_of_incident}
                disabled
              />
            </div>
            <div className="form-group col-2">
              <label>Claim Amount</label>
              <input 
              type="text"
              value={data?.claim_amount}
              disabled />
            </div>
            <div className="form-group col-3">
              <label>Document Type</label>
              <input
                type="text"
                value={data?.document_type}
                disabled
              />
            </div>
          </div>
          
        </section>

        <section className="card">
          <h2>NID Information</h2>
          <div className="form-row">
            <div className="form-group">
              <label>
                ID Front<span>*</span>
              </label>
              <img src={`http://localhost:8000/uploads/${data?.id_front}`} width="200px" height="200px" alt="ID Front" />
            </div>
            <div className="form-group">
              <label>
                ID Back<span>*</span>
              </label>
              <img src={`http://localhost:8000/uploads/${data?.id_back}`} width="200px" height="200px" alt="ID Front" />
            </div>
          </div>
        </section>
       
        <footer className="footer">
        {data?.status_id !== 5 && (
      <button 
      style={{color: "white"}}
        className="btn approve" 
        onClick={() => handleAction(5)}
      >
        Claim
      </button>
    )}
    {data?.status_id === 5 && (
      <button 
      style={{color: "white"}} 
        className="btn approve" 
        onClick={() => handleAction(6)}
      >
        Settle
      </button>
    )}
        </footer>
      </div>
    </>
  )
}

export default SettledStatus
