import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
const ClaimFormPdf = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  // const [insuranceTypeId, setInsuranceTypeId] = useState(null);

  const formRef = useRef(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/health_insurance/claim/${id}`
        );

        setData(response.data); // Set data
        console.log("claim data:", response.data);
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
          useCORS: true,
        });

        // Calculate dimensions
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Create PDF
        const pdf = new jsPDF("p", "mm", "a4");
        const imgData = canvas.toDataURL("image/png");

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("claimed.pdf");
      } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Failed to generate PDF. Please try again.");
      }
    }
  };

  // Parse the created_at date and add 12 months
  const createdAt = data?.healthInsurance?.created_at;
  const extendedDate = createdAt ? new Date(createdAt) : null;

  if (extendedDate) {
    extendedDate.setMonth(extendedDate.getMonth() + 12); // Add 12 months
  }

  // Format the extended date (optional: adjust the format to your needs)
  const formattedExtendedDate = extendedDate
    ? extendedDate.toISOString().split("T")[0] // Format as YYYY-MM-DD
    : "";

    // Calculate the nominee's age
    const birthdate = data?.healthInsurance?.nominee_birthdate;
    const age = birthdate
      ? Math.floor((new Date() - new Date(birthdate).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
      : '';

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="text-end mb-3">
        <button className="btn btn-primary download-btn" onClick={downloadPDF}>
          Download as PDF
        </button>
      </div>
      <div className="container mx-auto bg-white p-5 rounded-lg shadow-sm" ref={formRef}>
        {/* Header */}
    
          
        <div className="row mb-4">
        <div className="col-4 text-center">
            <img
              src="/images/Picture3.png"
              alt="BRAC Logo"
              className="img-fluid"
            />
          </div>
          <div className="col-4 text-center">
            <h1 className="h5 fw-bold">নির্ভাবনা স্বাস্থ্য বিমা
            </h1>
            <h2 className="h6">বিমাদাবি ফর্ম</h2>
          </div>
          <div className="col-4 text-center">
            <img
            height="100px"
            width="200px"
              src="/images/Picture1.png"
              alt="Chartered Life Logo"
              className="img-fluid"
            />
          </div>
        </div>
  
        {/* Policy Information */}
        <div>
          <div className="border-top pt-4">
            <div className="mb-8 w-full">
              <div className="row mb-3">
                <div className="col-md-12 mb-2">
                  <table className="w-full border-collapse border border-gray-300">
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-2 w-3/5">Policy ID:</td>
                        <td className="border border-gray-300 p-2 w-2/5">{data.insurance_policy_no}</td>
                        <td className="border border-gray-300 p-2 w-3/5">Incident Setup Date:</td>
                        <td className="border border-gray-300 p-2 w-2/5">{data.created_at}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Personal Information Section */}
        <h5 className="fw-bold bg-light p-2 border">বিমাগ্রহীতা সংক্রান্ত তথ্য</h5>
        <div className="row mb-3">
          <div className="col-md-4 mb-3">
            <label className="form-label">বিমাগ্রহীতার নাম</label>
            <input type="text" value={data?.healthInsurance?.client?.name || ""} className="form-control" />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">প্রজেক্টের নাম</label>
            <input type="text" value={data?.healthInsurance?.client?.name || ""} className="form-control" />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">ভিও কোড</label>
            <input type="text"  className="form-control" />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">সদস্য নং</label>
            <input type="text" value={data?.healthInsurance?.orgmemno || ""} className="form-control" />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">শাখার নাম</label>
            <input type="text" value={data?.healthInsurance?.branch?.branch_name} className="form-control" />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">এলাকার নাম</label>
            <input type="text"  className="form-control" />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">বিমাগ্রহীতার জন্মতারিখ</label>
            <input type="text" value={data?.healthInsurance?.nominee_card_id} className="form-control" />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">শাখার কোড</label>
            <input type="text" value={data?.healthInsurance?.branch?.branch_code} className="form-control" />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">অঞ্চলের নাম</label>
            <input type="text" className="form-control" />
          </div>
          
          <div className="col-md-4">
            <label className="form-label">বিমাগ্রহীতার জাতীয় পরিচয়পত্র নং</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">মোবাইল নম্বর</label>
            <input type="text" value={data?.healthInsurance?.contact_no} className="form-control" />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">ডিভিশনের নাম</label>
            <input type="text" className="form-control" />
          </div>
        </div>
  
        {/* Policy Information Section */}
        <h5 className="fw-bold bg-light p-2 border">বীমা পলিসি সংক্রান্ত তথ্য</h5>
        <div className="row mb-3">
          <div className="col-md-4 mb-3">
            <label className="form-label">বীমা পলিসির ধরন</label>
            <input type="text" value={data?.InsurancePolicy?.policy_name} className="form-control" />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">বীমা পলিসি নং</label>
            <input type="text" value={data?.insurance_policy_no} className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label">বীমা প্রিমিয়াম</label>
            <input type="text" value={data?.healthInsurance?.premium_amnt} className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label">বিমা প্যাকেজের ধরণ</label>
            <input type="text" value={data?.InsurancePolicy?.title} className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label">বিমা পলিসি গ্রহনের তারিখ</label>
            <input type="text" value={data?.healthInsurance?.created_at} className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label">বিমা মেয়াদ উত্তীর্ণ তারিখ</label>
            <input type="text" value={formattedExtendedDate} className="form-control" />
          </div>
        </div>
  
        {/* Claim Information Section */}
        <h5 className="fw-bold bg-light p-2 border">বিমাদাবি সংক্রান্ত তথ্য</h5>
        <div className="row mb-3">
          <div className="col-md-4 mb-3">
            <label className="form-label">বিমাদাবি নম্বর</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label">বিমাদাবি ধরন</label>
            <input type="text" value={data?.treatmentType?.type_name} className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label">হাসপাতালে ভর্তির সময়কাল (যদি প্রযোজ্য হয়)
            </label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label">ইন্সিডেন্ট তারিখ</label>
            <input type="text" value={data?.date_of_incident} className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label">সর্বোচ্চ বিমাদাবির পরিমাণ</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label">বর্তমান বিমাদাবির পরিমাণ</label>
            <input type="text" value={data?.claim_amount} className="form-control" />
          </div>
        </div>
  
        {/* Nominee Information Section */}
        <h5 className="fw-bold bg-light p-2 border">
          বীমা গ্রহীতার অবর্তমানে আর্থিক সুবিধা গ্রহণকারীর তথ্য (যদি প্রযোজ্য হয়)
        </h5>
        <div className="row mb-3">
          <div className="col-md-6 mb-3">
            <label className="form-label">নমিনির নাম</label>
            <input type="text" value={data?.healthInsurance?.nominee_name} className="form-control" />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">বিমাগ্রহীতার সাথে সম্পর্ক</label>
            <input type="text" value={data?.healthInsurance?.nomineeRelation?.data_name} className="form-control" />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">নমিনির বয়স</label>
            <input type="text" value={age || ''} className="form-control" />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">নমিনির মোবাইল নম্বর</label>
            <input type="text" value={data?.healthInsurance?.nominee_phone_no} className="form-control" />
          </div>
          <div className="col-md-12">
            <label className="form-label">নমিনির জাতীয় পরিচয়পত্র নং</label>
            <input type="text" value={data?.healthInsurance?.nominee_card_id} className="form-control" />
          </div>
        </div>
      </div>
    </div>
  );
  
  
  
};

export default ClaimFormPdf;
