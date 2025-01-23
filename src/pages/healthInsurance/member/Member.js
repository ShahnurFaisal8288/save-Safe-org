import React, { useEffect, useState } from "react";
import axiosInstance from "../../../components/axiosInstance";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Member = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [loanEligible, setLoanEligible] = useState(false);
  const [writeOff, setWriteOff] = useState(false);
  const [payOff, setPayOff] = useState(false);

  const handleCheckboxChange = (e) => {
    setLoanEligible(e.target.checked);
  };
  const handleWriteOffChange = (e) => {
    setWriteOff(e.target.checked);
  };
  const handlePayOffChange = (e) => {
    setPayOff(e.target.checked);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      user_id: userId,
      house_hold_id: e.target.house_hold_id.value,
      savings_balance: e.target.savings_balance.value,
      min_savings_balance: e.target.min_savings_balance.value,
      min_savings_balance_date: e.target.min_savings_balance_date.value,
      service_charge_due: e.target.service_charge_due.value,
      bonus_outstanding: e.target.bonus_outstanding.value,
      earning_outstanding: e.target.earning_outstanding.value,
      last_checked_date: e.target.last_checked_date.value,
      loan_reference_number: e.target.loan_reference_number.value,
      collector_id: e.target.collector_id.value,
      account_number: e.target.account_number.value,
      name: e.target.name.value,
      sex: e.target.sex.value,
      date_of_birth: e.target.date_of_birth.value,
      guardian: e.target.guardian.value,
      date_in: e.target.date_in.value,
      date_out: e.target.date_out.value,
      // house_hold_id: e.target.house_hold_id.value,
      present_address: e.target.present_address.value,
      village_address: e.target.village_address.value,
      occupation: e.target.occupation.value,
      nominee: e.target.nominee.value,
      relationship: e.target.relationship.value,
      pay_off: payOff,
      pay_off_date: e.target.pay_off_date.value,
      write_off: writeOff,
      write_off_date: e.target.write_off_date.value,
      cause_write_off: e.target.cause_write_off.value,
      loan_eligible: loanEligible,
      contact_number: e.target.contact_number.value,
      project_code: e.target.project_code.value,
    };
    console.log("name:",formData.name)
    try {
      axiosInstance.post("client/store", formData, {
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
                      navigate("/member-list");
        
                    }
                  });
                }
      })
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while saving sidebar data.");
    }
  };
  useEffect(() => {
    const storedSetCollectorNumber = localStorage.getItem("user_id");

    setUserId(storedSetCollectorNumber);
    console.log(storedSetCollectorNumber)
  }, []);
  console.log("userId:",userId)
  return (
    <div>
      <div className="content-wrapper">
        <div className="container mt-5">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="title mb-0">Member Add</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="section">
                  <div className="form-grid row">
                    {/* <input
                      name="house_hold_id"
                      type="hidden"
                      value="1"
                      className="form-control"
                      placeholder="savings_balance"
                    /> */}
                    <input
                      name="user_id"
                      type="hidden"
                      value={userId}
                      className="form-control"
                      placeholder="savings_balance"
                    />
                    <input
                      name="savings_balance"
                      type="hidden"
                      value="1000.50"
                      className="form-control"
                      placeholder="savings_balance"
                    />
                    <input
                      name="min_savings_balance"
                      type="hidden"
                      value="500.00"
                      className="form-control"
                      placeholder="min_savings_balance"
                    />
                    <input
                      name="min_savings_balance_date"
                      type="hidden"
                      value="2023-06-01"
                      className="form-control"
                      placeholder="min_savings_balance_date"
                    />
                    <input
                      name="service_charge_due"
                      type="hidden"
                      value="50.00"
                      className="form-control"
                      placeholder="service_charge_due"
                    />
                    <input
                      name="bonus_outstanding"
                      type="hidden"
                      value="200.00"
                      className="form-control"
                      placeholder="bonus_outstanding"
                    />
                    <input
                      name="earning_outstanding"
                      type="hidden"
                      value="150.00"
                      className="form-control"
                      placeholder="earning_outstanding"
                    />
                    <input
                      name="last_checked_date"
                      type="hidden"
                      value="2023-07-01"
                      className="form-control"
                      placeholder="last_checked_date"
                    />
                    <input
                      name="loan_reference_number"
                      type="hidden"
                      value="LN123456"
                      className="form-control"
                      placeholder="loan_reference_number"
                    />
                    <input
                      name="project_code"
                      type="hidden"
                      value="001"
                      className="form-control"
                      placeholder="project_code"
                    />
                    <div className="form-group col-12 col-md-6">
                      <label>Collector#</label>
                      <input
                        name="collector_id"
                        type="number"
                        value="1"
                        className="form-control"
                        placeholder="Collector#"
                      />
                    </div>

                    <div className="form-group col-12 col-md-6">
                      <label>Account#</label>
                      <input
                        name="account_number"
                        value="1789"
                        type="text"
                        className="form-control"
                        placeholder="Account#"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Name</label>
                      <input
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Sex</label>
                      <select name="sex" className="form-control">
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                      </select>
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Birth Date</label>
                      <input
                        name="date_of_birth"
                        type="date"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Guardian</label>
                      <input
                        name="guardian"
                        type="text"
                        className="form-control"
                        placeholder="Guardian"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Date In</label>
                      <input
                        name="date_in"
                        type="date"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Date Out</label>
                      <input
                        name="date_out"
                        type="date"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>House Hold</label>
                      <select name="house_hold_id" className="form-control">
                        <option value="1">6007</option>
                      </select>
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Current Address</label>
                      <input
                        name="present_address"
                        type="text"
                        className="form-control"
                        placeholder="Current Address"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Permanent Address</label>
                      <input
                        name="village_address"
                        type="text"
                        className="form-control"
                        placeholder="Permanent Address"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Contact#</label>
                      <input
                      name="contact_number"
                        type="text"
                        className="form-control"
                        placeholder="Contact#"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Occupation</label>
                      <input
                        name="occupation"
                        type="text"
                        className="form-control"
                        placeholder="Occupation"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Nominee Name</label>
                      <input
                        name="nominee"
                        type="text"
                        className="form-control"
                        placeholder="Nominee"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Relationship</label>
                      <input
                        name="relationship"
                        type="text"
                        className="form-control"
                        placeholder="Relationship"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <input
                        name="pay_off"
                        type="checkbox"
                        id="payoff"
                        checked={payOff}
                        onChange={handlePayOffChange}
                      />
                      <label htmlFor="payoff">Payoff</label>
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Payoff Date</label>
                      <input
                        name="pay_off_date"
                        type="date"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <input
                        name="write_off"
                        type="checkbox"
                        id="writeoff"
                        checked={writeOff}
                        onChange={handleWriteOffChange}
                      />
                      <label htmlFor="writeoff">Writeoff</label>
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Writeoff Date</label>
                      <input
                        name="write_off_date"
                        type="date"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label>Cause of Writeoff</label>
                      <select name="cause_write_off" className="form-control">
                        <option value="">Cho0se</option>
                        <option value="Disappearance">Disappearance</option>
                      </select>
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <input
                      name="loan_eligible"
                        type="checkbox"
                        id="loan-eligible"
                        checked={loanEligible}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="loan-eligible">Loan Eligible</label>
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

export default Member;
