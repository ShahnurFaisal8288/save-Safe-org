// InsuranceFormPdf.jsx
import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../InsuranceFormPdf.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const InsuranceFormPdf = () => {
  const { id } = useParams();
  const [data,setData] = useState([]);
  const [error, setError] = useState(null);
  // const [insuranceTypeId, setInsuranceTypeId] = useState(null);
  
  const formRef = useRef(null);
  useEffect(() => {
      const fetchPostData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/health_insurance/${id}`
          );
          
          setData(response.data); // Set data
          console.log("responseData:",response.data)
         
        } catch (err) {
          setError("Failed to fetch data");
        }
      };
  
      fetchPostData();
    }, [id]);
  const downloadPDF = async () => {
    if (formRef.current) {
      try {
        // Create canvas from the form
        const canvas = await html2canvas(formRef.current, {
          scale: 2,
          logging: false,
          useCORS: true
        });

        // Calculate dimensions
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Create PDF
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('insurance-form.pdf');
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Failed to generate PDF. Please try again.');
      }
    }
  };
  
  // console.log(data)
  return (
    <div className="container mt-4">
      {/* Download Button */}
      <div className="text-end mb-3">
        <button 
          className="btn btn-primary download-btn"
          onClick={downloadPDF}
        >
          Download as PDF
        </button>
      </div>

      {/* Form Content */}
      <div className="insurance-form" ref={formRef}>
        {/* Header */}
        <div className="form-header row align-items-center mb-4">
          <div className="col-md-3">
            <div className="logo">
              <img src="brac-logo.png" alt="BRAC" className="img-fluid" />
            </div>
          </div>
          <div className="col-md-6 text-center">
            <h2 className="title-bengali mb-2">নির্বাণা স্বাস্থ্যবিমা</h2>
            <h3 className="subtitle-bengali">গ্রাহক নিবন্ধন ফর্ম</h3>
          </div>
          <div className="col-md-3 text-end">
            <div className="chartered-life">
              <span className="d-block fs-4 fw-bold">Chartered Life</span>
              <p className="mb-0">Secured Life</p>
            </div>
          </div>
        </div>

        {/* Policy Type Section */}
        <div className="policy-section row mb-4 p-3 bg-light rounded">
          <div className="col-md-3">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="newPolicy" checked={data.insurance_type_id === 1}/>
              <label className="form-check-label" htmlFor="newPolicy">নতুন পলিসি</label>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="renewPolicy" checked={data.insurance_type_id === 2}/>
              <label className="form-check-label" htmlFor="renewPolicy">নবায়ন পলিসি</label>
            </div>
          </div>
          <div className="col-md-3">
            <span className="label">সদস্য নং:</span>
            <span className="value">{data.orgmemno}</span>
          </div>
          <div className="col-md-3">
            <span className="label">বিমা পলিসি নং:</span>
            <span className="value">{data.insurance_policy_no}</span>
          </div>
        </div>

        {/* Main Information */}
        <div className="info-section">
          <div className="row mb-3 p-3 bg-info-subtle rounded">
            <div className="col-md-4">
              <span className="label">শাখার নাম:</span>
              <span className="value">Gulshan</span>
            </div>
            <div className="col-md-4">
              <span className="label">শাখার কোড:</span>
              <span className="value">0605</span>
            </div>
            <div className="col-md-4">
              <span className="label">প্রজেক্টের নাম:</span>
              <span className="value">{data?.project?.projectTitle}</span>
            </div>
          </div>

          <div className="row mb-3 p-3 bg-success-subtle rounded">
            <div className="col-md-6">
              <span className="label">বীমাগ্রহীতার নাম:</span>
              <span className="value">{data?.client?.name}</span>
            </div>
            <div className="col-md-6">
              <span className="label">মোবাইল নম্বর:</span>
              <span className="value">{data?.client?.contact_number}</span>
            </div>
            <div className="col-md-6">
              <span className="label">বীমার প্যাকেজ:</span>
              <span className="value">{data?.category?.policy_name}</span>
            </div>
            <div className="col-md-6">
              <span className="label">বীমার ক্যাটাগরি:</span>
              <span className="value">{data?.category?.title}</span>
            </div>
          </div>

          <div className="row mb-3 p-3 bg-warning-subtle rounded">
            <div className="col-md-6">
              <span className="label">নমিনির নাম:</span>
              <span className="value">{data.nominee_name}</span>
            </div>
            <div className="col-md-6">
              <span className="label">নমিনির সাথে সম্পর্ক:</span>
              <span className="value">{data?.nomineeRelation?.data_name}</span>
            </div>
            <div className="col-md-6">
              <span className="label">নমিনির মোবাইল নম্বর:</span>
              <span className="value">{data.nominee_phone_no}</span>
            </div>
            <div className="col-md-6">
              <span className="label">প্রিমিয়াম:</span>
              <span className="value">{data.premium_amnt}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="form-footer mt-4 pt-4 border-top">
          <p className="text-center mb-4">বীমা মেয়াদকাল: ৩৬৫ দিন</p>
          <div className="row">
            <div className="col-md-4">
              <div className="signature-section">
                <p>বীমাগ্রহীতার স্বাক্ষর:</p>
                <div className="signature-line"></div>
                <p className="mt-3">তারিখ:</p>
                <div className="signature-line"></div>
              </div>
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div className="signature-section">
                <p>ব্র্যাক কর্মীর নাম:</p>
                <div className="signature-line"></div>
                <p className="mt-3">পদবী:</p>
                <div className="signature-line"></div>
                <p className="mt-3">তারিখ:</p>
                <div className="signature-line"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceFormPdf;