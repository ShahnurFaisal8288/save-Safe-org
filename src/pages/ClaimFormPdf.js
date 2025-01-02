import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf';
import axios from 'axios';
const ClaimFormPdf = () => {
    const { id } = useParams();
  const [data,setData] = useState([]);
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
          console.log("SingleresponseData:",response.data)
         
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
    return (
        <div className="min-h-screen bg-gray-100 p-5">
          <div className="text-end mb-3">
        <button 
          className="btn btn-primary download-btn"
          onClick={downloadPDF}
        >
          Download as PDF
        </button>
      </div>
          <div className="container mx-auto bg-white p-5 rounded-lg shadow-sm" ref={formRef}>
            {/* <div className="flex justify-between items-center mb-5">
              <img src="/api/placeholder/120/40" alt="BRAC logo" className="h-10" />
              <div className="text-center">
                <div className="font-sans">System Generated</div>
                <div className="font-sans">নির্জীবনা স্বাস্থ্য বিমা</div>
                <div className="font-sans">বিমাদাবি ফর্ম</div>
              </div>
              <img src="/api/placeholder/120/40" alt="Chartered Life logo" className="h-10" />
            </div> */}
            <div className="d-flex justify-content-between align-items-center mb-4">
          {/* <img src="brac-logo.png" alt="Save Safe Logo" height="40" /> */}
          <div className="text-center">
            <h1 className="h4 mb-1">নির্ভাবনা স্বাস্থ্যবিমা</h1>
            <p className="small mb-0">গ্রাহক নিবন্ধন ফর্ম</p>
          </div>
          <div className="text-end">
            {/* <img src="/api/placeholder/120/40" alt="Chartered Life Logo" height="40" /> */}
            <div className="border border-dark d-inline-block px-2 small">গ্রাহক কপি </div>
          </div>
        </div>
    
            <div className="mb-8">
              <table className="w-full border-collapse border border-gray-300">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">Policy ID:</td>
                    <td className="border border-gray-300 p-2">{data.insurance_policy_no}</td>
                    <td className="border border-gray-300 p-2">Incident Setup Date:</td>
                    <td className="border border-gray-300 p-2">{data.created_at}</td>
                  </tr>
                </tbody>
              </table>
            </div>
    
            <div className="bg-gray-100 p-2 mb-4 rounded text-center font-bold">
              বিমাগ্রহীতা সংক্রান্ত তথ্য
            </div>
            <table className="w-full border-collapse border border-gray-300 mb-8">
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 w-1/5">বিমাগ্রহীতার নাম</td>
                  <td className="border border-gray-300 p-2 w-1/5">Hena Begum</td>
                  <td className="border border-gray-300 p-2 w-1/5">প্রজেক্টের নাম</td>
                  <td className="border border-gray-300 p-2 w-1/6">Microfinance (Dabi) [15]</td>
                  <td className="border border-gray-300 p-2 w-1/6">VO Code</td>
                  <td className="border border-gray-300 p-2 w-1/10"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">সদস্য নং</td>
                  <td className="border border-gray-300 p-2">{data?.healthInsurance?.orgmemno}</td>
                  <td className="border border-gray-300 p-2">শাখার নাম</td>
                  <td className="border border-gray-300 p-2">Tikkatoli</td>
                  <td className="border border-gray-300 p-2">ancholer nam</td>
                  <td className="border border-gray-300 p-2"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">বিমাগ্রহীতার জন্মতারিখ</td>
                  <td className="border border-gray-300 p-2">11-02-1978</td>
                  <td className="border border-gray-300 p-2">শাখার কোড</td>
                  <td className="border border-gray-300 p-2">Gulshan</td>
                  <td className="border border-gray-300 p-2">0605</td>
                  <td className="border border-gray-300 p-2">Dhaka</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">জাতীয় পরিচয়পত্র নং</td>
                  <td className="border border-gray-300 p-2">19782692619487865</td>
                  <td className="border border-gray-300 p-2">মোবাইল নম্বর</td>
                  <td className="border border-gray-300 p-2">Gulshan</td>
                  <td className="border border-gray-300 p-2">01722222222</td>
                  <td className="border border-gray-300 p-2">Dhaka</td>
                </tr>
              </tbody>
            </table>
    
            <div className="bg-gray-100 p-2 mb-4 rounded text-center font-bold">
              বিমা পলিসি সংক্রান্ত তথ্য
            </div>
            <table className="w-full border-collapse border border-gray-300 mb-8">
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 w-1/5">বিমা পলিসি</td>
                  <td className="border border-gray-300 p-2 w-3/10">{data?.insurancePolicy?.policy_name}</td>
                  <td className="border border-gray-300 p-2 w-1/5">বিমা পলিসি নং</td>
                  <td className="border border-gray-300 p-2 w-1/5">{data?.insurance_policy_no}</td>
                  <td className="border border-gray-300 p-2 w-1/6">বিমা Premium</td>
                  <td className="border border-gray-300 p-2 w-1/6">1200</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">বিমা প্যাকেজের ধরন</td>
                  <td className="border border-gray-300 p-2" colSpan={3}>Shurokha-CAT-2</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">বিমা পলিসি গ্রহণের তারিখ</td>
                  <td className="border border-gray-300 p-2">{data.created_at}</td>
                  <td className="border border-gray-300 p-2">বিমা মেয়াদ উত্তীর্ণের তারিখ</td>
                  <td className="border border-gray-300 p-2">25-09-2025</td>
                </tr>
              </tbody>
            </table>
    
            <div className="bg-gray-100 p-2 mb-4 rounded text-center font-bold">
              বিমাদাবি সংক্রান্ত তথ্য
            </div>
            <table className="w-full border-collapse border border-gray-300 mb-8">
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 w-1/6">বিমাদাবি সিরিয়াল নং</td>
                  <td className="border border-gray-300 p-2 w-1/6">1</td>
                  <td className="border border-gray-300 p-2 w-1/5">বিমাদাবির ধরন</td>
                  <td className="border border-gray-300 p-2 w-1/5">Accidental Death</td>
                  <td className="border border-gray-300 p-2 w-1/5">Hospital Admission</td>
                  <td className="border border-gray-300 p-2 w-1/10"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">ইনসিডেন্ট তারিখ</td>
                  <td className="border border-gray-300 p-2">26-09-2024</td>
                  <td className="border border-gray-300 p-2">সর্বোচ্চ বিমাদাবির পরিমাণ</td>
                  <td className="border border-gray-300 p-2">25000.00</td>
                </tr>
              </tbody>
            </table>
    
            <div className="bg-gray-100 p-2 mb-4 rounded text-center font-bold">
              বিমা গ্রহীতার অবর্তমানে আর্থিক সুবিধা গ্রহণকারীর তথ্য
            </div>
            <table className="w-full border-collapse border border-gray-300">
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 w-1/5">নমিনির নাম</td>
                  <td className="border border-gray-300 p-2 w-3/10">tanvir mahtab</td>
                  <td className="border border-gray-300 p-2 w-1/5">বিমাগ্রহীতার সাথে সম্পর্ক</td>
                  <td className="border border-gray-300 p-2 w-3/10">Mother</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">নমিনির বয়স</td>
                  <td className="border border-gray-300 p-2">19</td>
                  <td className="border border-gray-300 p-2">নমিনির মোবাইল নম্বর</td>
                  <td className="border border-gray-300 p-2">01799999999</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">নমিনির স্মার্ট কার্ড নং</td>
                  <td className="border border-gray-300 p-2" colSpan={3}>0175459338</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
}

export default ClaimFormPdf
