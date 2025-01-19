import React from 'react';
import { useParams } from 'react-router-dom';

const InsuranceDetails = () => {
  const { id, member_name, branch_id, enrolment_id, insurance_policy_id, insurance_type_id,
     category_id, premium_amnt, insurance_tenure, nominee_name, nomine_phone_no, nominee_relation_id, contact_no } = useParams();

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Insurance Details</h3>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>ID</th>
                <td>{id}</td>
              </tr>
              <tr>
                <th>Member Name</th>
                <td>{member_name}</td>
              </tr>
              <tr>
                <th>Contact No</th>
                <td>{contact_no}</td>
              </tr>
              <tr>
                <th>Branch ID</th>
                <td>{branch_id}</td>
              </tr>
              <tr>
                <th>Enrolment ID</th>
                <td>{enrolment_id}</td>
              </tr>
              <tr>
                <th>Insurance Policy ID</th>
                <td>{insurance_policy_id}</td>
              </tr>
              <tr>
                <th>Insurance Type ID</th>
                <td>{insurance_type_id}</td>
              </tr>
              <tr>
                <th>Category</th>
                <td>{category_id}</td>
              </tr>
              <tr>
                <th>Premium Amount</th>
                <td>{premium_amnt}</td>
              </tr>
              <tr>
                <th>Duration</th>
                <td>{insurance_tenure}</td>
              </tr>
              <tr>
                <th>Nominee Name</th>
                <td>{nominee_name}</td>
              </tr>
              <tr>
                <th>Nominee Phone No</th>
                <td>{nomine_phone_no}</td>
              </tr>
              <tr>
                <th>Nominee Relation</th>
                <td>{nominee_relation_id}</td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InsuranceDetails;
