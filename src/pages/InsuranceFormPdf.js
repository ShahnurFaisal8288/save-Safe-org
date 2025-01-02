// // InsuranceFormPdf.jsx
// import React, { useEffect, useRef, useState } from 'react';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import '../InsuranceFormPdf.css';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';

// const InsuranceFormPdf = () => {
//   const { id } = useParams();
//   const [data,setData] = useState([]);
//   const [error, setError] = useState(null);
//   // const [insuranceTypeId, setInsuranceTypeId] = useState(null);
  
//   const formRef = useRef(null);
//   useEffect(() => {
//       const fetchPostData = async () => {
//         try {
//           const response = await axios.get(
//             `http://localhost:8000/api/health_insurance/${id}`
//           );
          
//           setData(response.data); // Set data
//           console.log("responseData:",response.data)
         
//         } catch (err) {
//           setError("Failed to fetch data");
//         }
//       };
  
//       fetchPostData();
//     }, [id]);
//   const downloadPDF = async () => {
//     if (formRef.current) {
//       try {
//         // Create canvas from the form
//         const canvas = await html2canvas(formRef.current, {
//           scale: 2,
//           logging: false,
//           useCORS: true
//         });

//         // Calculate dimensions
//         const imgWidth = 210; // A4 width in mm
//         const imgHeight = (canvas.height * imgWidth) / canvas.width;

//         // Create PDF
//         const pdf = new jsPDF('p', 'mm', 'a4');
//         const imgData = canvas.toDataURL('image/png');
        
//         pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
//         pdf.save('insurance-form.pdf');
//       } catch (error) {
//         console.error('Error generating PDF:', error);
//         alert('Failed to generate PDF. Please try again.');
//       }
//     }
//   };
  
//   // console.log(data)
//   return (
//     <>
//     <div className="container mt-5 mb-5">
//       {/* Download Button */}
//       <div className="text-end mb-3">
//         <button 
//           className="btn btn-primary download-btn"
//           onClick={downloadPDF}
//         >
//           Download as PDF
//         </button>
//       </div>

//       {/* Form Content */}
//       <div ref={formRef}>
//       <div className="insurance-form mt-5" >
//         {/* Header */}
//         <div className="mx-auto" style={{ maxWidth: '1000px' }}>
//         {/* Header Section */}
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           {/* <img src="brac-logo.png" alt="Save Safe Logo" height="40" /> */}
//           <div className="text-center">
//             <h1 className="h4 mb-1">নির্ভাবনা স্বাস্থ্যবিমা</h1>
//             <p className="small mb-0">গ্রাহক নিবন্ধন ফর্ম</p>
//           </div>
//           <div className="text-end">
//             {/* <img src="/api/placeholder/120/40" alt="Chartered Life Logo" height="40" /> */}
//             <div className="border border-dark d-inline-block px-2 small">গ্রাহক কপি </div>
//           </div>
//         </div>

//         {/* Form Type and Number Section */}
//         <div className="border mb-4">
//           <div className="row g-0">
//             <div className="col border-end">
//               <div className="p-2 d-flex align-items-center gap-3">
//                 <span>নতুন পলিসি</span>
//                 <input type="checkbox" className="form-check-input" checked={data.insurance_type_id === 1} />
//                 <span>নবায়ন পলিসি</span>
//                 <input type="checkbox" className="form-check-input" checked={data.insurance_type_id === 2} />
//               </div>
//             </div>
//             <div className="col">
//               <div className="p-2 d-flex align-items-center">
//                 <span>বিমা পলিসি নং - </span>
//                 <span style={{ fontSize: "0.8rem" }}>{data.insurance_policy_no}</span>
//                 <span className="ms-auto">তারিখ - {data.created_at}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Branch Information */}
//         <div className="border mb-4">
//           <div className="row g-0">
//             <div className="col border-end">
//               <div className="p-2">
//                 <div className="d-flex">
//                   <span>শাখার নাম - {data?.branch?.branch_name}</span>
//                   <div className="ms-4">
//                     <span>শাখা কোড: {data?.branch?.branch_code}</span>
//                     <span className="ms-4">ডি:ও কোড: </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col">
//             <div className=" bg-light">
//                 <span>প্রকল্পের নাম:{data?.project?.projectTitle}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Location Information */}
//         <div className="border mb-4">
//           <div className="row g-0">
//             <div className="col border-end">
//               <div className="p-2">
//                 <span>এলাকার নাম - </span>
//               </div>
//             </div>
//             <div className="col">
//               <div className="p-2 d-flex justify-content-between">
//                 <span>অঞ্চলের নাম - </span>
//                 {/* <span>Microfinance (Dabi)</span> */}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Health Declaration */}
//         <div className="border mb-4">
//           <div className="bg-light p-2 text-center">বিমাধারীর স্বাস্থ্য সম্পর্কিত তথ্য</div>
//           <div className="p-2">
//             <div className="d-flex align-items-center justify-content-between">
//               <p className="flex-grow-1 mb-0">
//                 আপনি কি বর্তমানে ক্যান্সার/ এইচআইভি/ কিডনি/ জন্ডিস/ হার্ট/ ফুসফুস সংক্রান্ত জটিলতায় আক্রান্ত আছেন বা বর্তমানে এ সংক্রান্ত কোনরূপ চিকিৎসা গ্রহণ করছেন?
//               </p>
//               <div className="d-flex gap-3">
//                 <div className="d-flex align-items-center gap-1">
//                   <input type="checkbox" className="form-check-input" checked={data?.any_disease === true}></input>
//                   <span>হ্যাঁ</span>
//                 </div>
//                 <div className="d-flex align-items-center gap-1">
//                 <input type="checkbox" className="form-check-input" checked={data?.any_disease === false}></input>
//                   <span>না</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Personal Information */}
//         <div className="border mb-4">
//           <div className="p-2">বিমাধারীর নাম: {data?.client?.name}</div>
//           <div className="border-top">
//             <div className="row g-0">
//               <div className="col-4 border-end p-2">
//                 সদস্য নং: {data.orgmemno}
//               </div>
//               <div className="col-4 border-end p-2">
//                 <div className="d-flex align-items-center gap-3">
//                   <span>লিঙ্গ:</span>
//                   <div className="d-flex gap-3">
//                     <div className="d-flex align-items-center gap-1">
//                       {/* <div className="checkbox-custom" checked={data?.client?.sex === 1}></div> */}
//                       <input type="checkbox" className="form-check-input" checked={data?.client?.sex === 1}></input>
//                       <span>পুরুষ</span>
//                     </div>
//                     <div className="d-flex align-items-center gap-1">
//                       <input type="checkbox" className="form-check-input" checked={data?.client?.sex === 2}></input>
//                       <span>নারী</span>
//                     </div>
//                     <div className="d-flex align-items-center gap-1">
//                       <div className="checkbox-custom"></div>
//                       <span>অন্যান্য</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-4 p-2">
//                 মোবাইল নম্বর: {data?.client?.contact_number}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Additional Information */}
//         <div className="border mb-4">
//           <div className="row g-0">
//             <div className="col-6 border-end p-2">
//             নমিনির  জাতীয় পরিচয়পত্র নং: {data?.nominee_card_id}
//             </div>
//             <div className="col-6 p-2"></div>
//           </div>
//           <div className="row g-0 border-top">
//             <div className="col-6 border-end p-2">
//               নমিনির নাম: {data.nominee_name}
//             </div>
//             <div className="col-6 p-2">
//               নমিনির বয়স: 34
//             </div>
//           </div>
//           <div className="row g-0 border-top">
//             <div className="col-6 border-end p-2">
//               বিমাধারীর সাথে সম্পর্ক: {data?.nomineeRelation?.data_name}
//             </div>
//             <div className="col-6 p-2">
//               নমিনির মোবাইল নম্বর: {data.nominee_phone_no}
//             </div>
//           </div>
//           {/* <div className="row g-0 border-top">
//             <div className="col-12 p-2">
//               নমিনির স্মার্ট কার্ড নং: {data?.nominee_card_id}
//             </div>
//           </div> */}
//         </div>

//         {/* Insurance Details */}
//         <div className="border mb-4">
//           <div className="row g-0">
//             <div className="col-3 border-end p-2">
//               বিমার প্যাকেজ: {data?.category?.policy_name}
//             </div>
//             <div className="col-3 border-end p-2">
//               বিমার ক্যাটাগরি:  {data?.category?.title}
//             </div>
//             <div className="col-3 border-end p-2">
//               প্রিমিয়াম: {data.premium_amnt} টাকা
//             </div>
//             <div className="col-3 p-2">
//               বিমার মেয়াদকাল: ৩৬৫ দিন
//             </div>
//           </div>
//         </div>

//         {/* Declaration */}
//         <div className="border mb-4 p-2">
//           <p className="small mb-0">
//             ফর্মে প্রদত্ত বিমা সংক্রান্ত সকল তথ্য সঠিক এবং বর্ণিত সকল নিয়মাবলী আমি নিজে পড়ে/ বুঝে মেনে নিয়ে স্বাক্ষর করলাম। উক্ত তথ্যাবলী ব্যবহারে ব্র্যাককে অনুমতি প্রদান করছি।
//           </p>
//         </div>

//         {/* Signature Section */}
//         <div className="border">
//           <div className="row g-0">
//             <div className="col-3 border-end p-3">
//               <div className="signature-box"></div>
//               <div className="text-center small mt-2">বিমাধারীর স্বাক্ষর/টিপসই ও তারিখ</div>
//             </div>
//             <div className="col-3 border-end p-3">
//               <div className="signature-box"></div>
//               <div className="text-center small mt-2">
//                 শাখা ব্যবস্থাপক / একজন ব্যবস্থাপক (প্রভিত) এর নাম, পিন, স্বাক্ষর ও তারিখ
//               </div>
//             </div>
//             <div className="col-3 border-end p-3">
//               <div className="h-100"></div>
//             </div>
//             <div className="col-3 p-3">
//               <div className="signature-box"></div>
//               <div className="text-center small mt-2">শাখা হিসাব কর্মকর্তা নাম, পিন, স্বাক্ষর ও তারিখ</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .checkbox-custom {
//           width: 1rem;
//           height: 1rem;
//           border: 1px solid black;
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .signature-box {
//           height: 5rem;
//           border-bottom: 1px solid #dee2e6;
//         }
//       `}</style>
//       </div>
    
//       {/* Form Content */}
//       <div className="insurance-form mt-5">
//         {/* Header */}
//         <div className="mx-auto" style={{ maxWidth: '1000px' }}>
//         {/* Header Section */}
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           {/* <img src="brac-logo.png" alt="Save Safe Logo" height="40" /> */}
//           <div className="text-center">
//             <h1 className="h4 mb-1">নির্ভাবনা স্বাস্থ্যবিমা</h1>
//             <p className="small mb-0">গ্রাহক নিবন্ধন ফর্ম</p>
//           </div>
//           <div className="text-end">
//             {/* <img src="/api/placeholder/120/40" alt="Chartered Life Logo" height="40" /> */}
//             <div className="border border-dark d-inline-block px-2 small">অফিস কপি </div>
//           </div>
//         </div>

//         {/* Form Type and Number Section */}
//         <div className="border mb-4">
//           <div className="row g-0">
//             <div className="col border-end">
//               <div className="p-2 d-flex align-items-center gap-3">
//                 <span>নতুন পলিসি</span>
//                 <input type="checkbox" className="form-check-input" checked={data.insurance_type_id === 1} />
//                 <span>নবায়ন পলিসি</span>
//                 <input type="checkbox" className="form-check-input" checked={data.insurance_type_id === 2} />
//               </div>
//             </div>
//             <div className="col">
//               <div className="p-2 d-flex align-items-center">
//                 <span>বিমা পলিসি নং - </span>
//                 <span style={{ fontSize: "0.8rem" }}>{data.insurance_policy_no}</span>
//                 <span className="ms-auto">তারিখ - {data.created_at}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Branch Information */}
//         <div className="border mb-4">
//           <div className="row g-0">
//             <div className="col border-end">
//               <div className="p-2">
//                 <div className="d-flex">
//                   <span>শাখার নাম - {data?.branch?.branch_name}</span>
//                   <div className="ms-4">
//                     <span>শাখা কোড: {data?.branch?.branch_code}</span>
//                     <span className="ms-4">ডি:ও কোড: </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col">
//               <div className=" bg-light">
//                 <span>প্রকল্পের নাম:{data?.project?.projectTitle}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Location Information */}
//         <div className="border mb-4">
//           <div className="row g-0">
//             <div className="col border-end">
//               <div className="p-2">
//                 <span>এলাকার নাম - </span>
//               </div>
//             </div>
//             <div className="col">
//               <div className="p-2 d-flex justify-content-between">
//                 <span>অঞ্চলের নাম - </span>
//                 {/* <span>Microfinance (Dabi)</span> */}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Health Declaration */}
//         <div className="border mb-4">
//           <div className="bg-light p-2 text-center">বিমাধারীর স্বাস্থ্য সম্পর্কিত তথ্য</div>
//           <div className="p-2">
//             <div className="d-flex align-items-center justify-content-between">
//               <p className="flex-grow-1 mb-0">
//                 আপনি কি বর্তমানে ক্যান্সার/ এইচআইভি/ কিডনি/ জন্ডিস/ হার্ট/ ফুসফুস সংক্রান্ত জটিলতায় আক্রান্ত আছেন বা বর্তমানে এ সংক্রান্ত কোনরূপ চিকিৎসা গ্রহণ করছেন?
//               </p>
//               <div className="d-flex gap-3">
//                 <div className="d-flex align-items-center gap-1">
//                   <input type="checkbox" className="form-check-input" checked={data?.any_disease === true}></input>
//                   <span>হ্যাঁ</span>
//                 </div>
//                 <div className="d-flex align-items-center gap-1">
//                 <input type="checkbox" className="form-check-input" checked={data?.any_disease === false}></input>
//                   <span>না</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Personal Information */}
//         <div className="border mb-4">
//           <div className="p-2">বিমাধারীর নাম: {data?.client?.name}</div>
//           <div className="border-top">
//             <div className="row g-0">
//               <div className="col-4 border-end p-2">
//                 সদস্য নং: {data.orgmemno}
//               </div>
//               <div className="col-4 border-end p-2">
//                 <div className="d-flex align-items-center gap-3">
//                   <span>লিঙ্গ:</span>
//                   <div className="d-flex gap-3">
//                     <div className="d-flex align-items-center gap-1">
//                       {/* <div className="checkbox-custom" checked={data?.client?.sex === 1}></div> */}
//                       <input type="checkbox" className="form-check-input" checked={data?.client?.sex === 1}></input>
//                       <span>পুরুষ</span>
//                     </div>
//                     <div className="d-flex align-items-center gap-1">
//                       <input type="checkbox" className="form-check-input" checked={data?.client?.sex === 2}></input>
//                       <span>নারী</span>
//                     </div>
//                     <div className="d-flex align-items-center gap-1">
//                       <div className="checkbox-custom"></div>
//                       <span>অন্যান্য</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-4 p-2">
//                 মোবাইল নম্বর: {data?.client?.contact_number}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Additional Information */}
//         <div className="border mb-4">
//           <div className="row g-0">
//             <div className="col-6 border-end p-2">
//             নমিনির  জাতীয় পরিচয়পত্র নং: {data?.nominee_card_id}
//             </div>
//             <div className="col-6 p-2"></div>
//           </div>
//           <div className="row g-0 border-top">
//             <div className="col-6 border-end p-2">
//               নমিনির নাম: {data.nominee_name}
//             </div>
//             <div className="col-6 p-2">
//               নমিনির বয়স: 34
//             </div>
//           </div>
//           <div className="row g-0 border-top">
//             <div className="col-6 border-end p-2">
//               বিমাধারীর সাথে সম্পর্ক: {data?.nomineeRelation?.data_name}
//             </div>
//             <div className="col-6 p-2">
//               নমিনির মোবাইল নম্বর: {data.nominee_phone_no}
//             </div>
//           </div>
//           {/* <div className="row g-0 border-top">
//             <div className="col-12 p-2">
//               নমিনির স্মার্ট কার্ড নং: {data?.nominee_card_id}
//             </div>
//           </div> */}
//         </div>

//         {/* Insurance Details */}
//         <div className="border mb-4">
//           <div className="row g-0">
//             <div className="col-3 border-end p-2">
//               বিমার প্যাকেজ: {data?.category?.policy_name}
//             </div>
//             <div className="col-3 border-end p-2">
//               বিমার ক্যাটাগরি:  {data?.category?.title}
//             </div>
//             <div className="col-3 border-end p-2">
//               প্রিমিয়াম: {data.premium_amnt} টাকা
//             </div>
//             <div className="col-3 p-2">
//               বিমার মেয়াদকাল: ৩৬৫ দিন
//             </div>
//           </div>
//         </div>

//         {/* Declaration */}
//         <div className="border mb-4 p-2">
//           <p className="small mb-0">
//             ফর্মে প্রদত্ত বিমা সংক্রান্ত সকল তথ্য সঠিক এবং বর্ণিত সকল নিয়মাবলী আমি নিজে পড়ে/ বুঝে মেনে নিয়ে স্বাক্ষর করলাম। উক্ত তথ্যাবলী ব্যবহারে ব্র্যাককে অনুমতি প্রদান করছি।
//           </p>
//         </div>

//         {/* Signature Section */}
//         <div className="border">
//           <div className="row g-0">
//             <div className="col-3 border-end p-3">
//               <div className="signature-box"></div>
//               <div className="text-center small mt-2">বিমাধারীর স্বাক্ষর/টিপসই ও তারিখ</div>
//             </div>
//             <div className="col-3 border-end p-3">
//               <div className="signature-box"></div>
//               <div className="text-center small mt-2">
//                 শাখা ব্যবস্থাপক / একজন ব্যবস্থাপক (প্রভিত) এর নাম, পিন, স্বাক্ষর ও তারিখ
//               </div>
//             </div>
//             <div className="col-3 border-end p-3">
//               <div className="h-100"></div>
//             </div>
//             <div className="col-3 p-3">
//               <div className="signature-box"></div>
//               <div className="text-center small mt-2">শাখা হিসাব কর্মকর্তা নাম, পিন, স্বাক্ষর ও তারিখ</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .checkbox-custom {
//           width: 1rem;
//           height: 1rem;
//           border: 1px solid black;
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .signature-box {
//           height: 5rem;
//           border-bottom: 1px solid #dee2e6;
//         }
//       `}</style>
//       </div>
//       </div>
   
//     </div>
//     </>



//   );
// };

// export default InsuranceFormPdf;
import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../InsuranceFormPdf.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const InsuranceFormPdf = () => {
  const { id } = useParams();
  const [data,setData] = useState([]);
  const [error, setError] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/health_insurance/${id}`
        );
        setData(response.data);
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
        const canvas = await html2canvas(formRef.current, {
          scale: 2,
          logging: false,
          useCORS: true
        });

        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
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
    <>
    <div className="container mt-3 mb-3" style={{ fontSize: '0.75rem' }}>
      <div className="text-end mb-2" style={{ marginTop: '50px' }}>
        <button 
          className="btn btn-primary download-btn btn-sm"
          onClick={downloadPDF}
        >
          Download as PDF
        </button>
      </div>

      <div ref={formRef}>
        <hr style={{opacity:0}}></hr>
        <hr style={{opacity:0}}></hr>
      <div className="insurance-form" style={{ marginBottom: '70px',marginTop:'70px' }}>
        <div className="mx-auto" style={{ maxWidth: '1000px' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="text-center">
            <h1 className="h5 mb-1">নির্ভাবনা স্বাস্থ্যবিমা</h1>
            <p className="small mb-0" style={{ fontSize: '0.7rem' }}>গ্রাহক নিবন্ধন ফর্ম</p>
          </div>
          <div className="text-end">
            <div className="border border-dark d-inline-block px-2" style={{ fontSize: '0.7rem' }}>গ্রাহক কপি </div>
          </div>
        </div>

        <div className="border mb-3">
          <div className="row g-0">
            <div className="col border-end">
              <div className="p-1 d-flex align-items-center gap-2">
                <span>নতুন পলিসি</span>
                <input type="checkbox" className="form-check-input" checked={data.insurance_type_id === 1} />
                <span>নবায়ন পলিসি</span>
                <input type="checkbox" className="form-check-input" checked={data.insurance_type_id === 2} />
              </div>
            </div>
            <div className="col">
              <div className="p-1 d-flex align-items-center">
                <span>বিমা পলিসি নং - </span>
                <span style={{ fontSize: "0.7rem" }}>{data.insurance_policy_no}</span>
                <span className="ms-auto">তারিখ - {data.created_at}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rest of the sections with reduced padding and font size */}
        <div className="border mb-3">
          <div className="row g-0">
            <div className="col border-end">
              <div className="p-1">
                <div className="d-flex">
                  <span>শাখার নাম - {data?.branch?.branch_name}</span>
                  <div className="ms-3">
                    <span>শাখা কোড: {data?.branch?.branch_code}</span>
                    <span className="ms-3">ডি:ও কোড: </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="bg-light p-1">
                <span>প্রকল্পের নাম:{data?.project?.projectTitle}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border mb-3">
          <div className="row g-0">
            <div className="col border-end">
              <div className="p-1">
                <span>এলাকার নাম - </span>
              </div>
            </div>
            <div className="col">
              <div className="p-1 d-flex justify-content-between">
                <span>অঞ্চলের নাম - </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border mb-3">
          <div className="bg-light p-1 text-center">বিমাধারীর স্বাস্থ্য সম্পর্কিত তথ্য</div>
          <div className="p-1">
            <div className="d-flex align-items-center justify-content-between">
              <p className="flex-grow-1 mb-0" style={{ fontSize: '0.7rem' }}>
                আপনি কি বর্তমানে ক্যান্সার/ এইচআইভি/ কিডনি/ জন্ডিস/ হার্ট/ ফুসফুস সংক্রান্ত জটিলতায় আক্রান্ত আছেন বা বর্তমানে এ সংক্রান্ত কোনরূপ চিকিৎসা গ্রহণ করছেন?
              </p>
              <div className="d-flex gap-2">
                <div className="d-flex align-items-center gap-1">
                  <input type="checkbox" className="form-check-input" checked={data?.any_disease === true}></input>
                  <span>হ্যাঁ</span>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <input type="checkbox" className="form-check-input" checked={data?.any_disease === false}></input>
                  <span>না</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue with the same pattern for the rest of the sections... */}
        {/* Personal Information, Additional Information, Insurance Details, etc. */}
        {/* Using the same reduced padding (p-1 instead of p-2) and font sizes */}

        <div className="border mb-3">
          <div className="p-1">বিমাধারীর নাম: {data?.client?.name}</div>
          <div className="border-top">
            <div className="row g-0">
              <div className="col-4 border-end p-1">
                সদস্য নং: {data.orgmemno}
              </div>
              <div className="col-4 border-end p-1">
                <div className="d-flex align-items-center gap-2">
                  <span>লিঙ্গ:</span>
                  <div className="d-flex gap-2">
                    <div className="d-flex align-items-center gap-1">
                      <input type="checkbox" className="form-check-input" checked={data?.client?.sex === 1}></input>
                      <span>পুরুষ</span>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <input type="checkbox" className="form-check-input" checked={data?.client?.sex === 2}></input>
                      <span>নারী</span>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <div className="checkbox-custom"></div>
                      <span>অন্যান্য</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4 p-1">
                মোবাইল নম্বর: {data?.client?.contact_number}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="border mb-3">
          <div className="row g-0">
            <div className="col-6 border-end p-1">
              নমিনির জাতীয় পরিচয়পত্র নং: {data?.nominee_card_id}
            </div>
            <div className="col-6 p-1"></div>
          </div>
          <div className="row g-0 border-top">
            <div className="col-6 border-end p-1">
              নমিনির নাম: {data.nominee_name}
            </div>
            <div className="col-6 p-1">
              নমিনির বয়স: 34
            </div>
          </div>
          <div className="row g-0 border-top">
            <div className="col-6 border-end p-1">
              বিমাধারীর সাথে সম্পর্ক: {data?.nomineeRelation?.data_name}
            </div>
            <div className="col-6 p-1">
              নমিনির মোবাইল নম্বর: {data.nominee_phone_no}
            </div>
          </div>
        </div>

        {/* Insurance Details */}
        <div className="border mb-3">
          <div className="row g-0">
            <div className="col-3 border-end p-1">
              বিমার প্যাকেজ: {data?.category?.policy_name}
            </div>
            <div className="col-3 border-end p-1">
              বিমার ক্যাটাগরি: {data?.category?.title}
            </div>
            <div className="col-3 border-end p-1">
              প্রিমিয়াম: {data.premium_amnt} টাকা
            </div>
            <div className="col-3 p-1">
              বিমার মেয়াদকাল: ৩৬৫ দিন
            </div>
          </div>
        </div>

        {/* Declaration */}
        <div className="border mb-3 p-1">
          <p className="mb-0" style={{ fontSize: '0.7rem' }}>
            ফর্মে প্রদত্ত বিমা সংক্রান্ত সকল তথ্য সঠিক এবং বর্ণিত সকল নিয়মাবলী আমি নিজে পড়ে/ বুঝে মেনে নিয়ে স্বাক্ষর করলাম। উক্ত তথ্যাবলী ব্যবহারে ব্র্যাককে অনুমতি প্রদান করছি।
          </p>
        </div>

        {/* Signature Section */}
        <div className="border">
          <div className="row g-0">
            <div className="col-3 border-end p-2">
              <div className="signature-box" style={{ height: '4rem' }}></div>
              <div className="text-center mt-1" style={{ fontSize: '0.7rem' }}>বিমাধারীর স্বাক্ষর/টিপসই ও তারিখ</div>
            </div>
            <div className="col-3 border-end p-2">
              <div className="signature-box" style={{ height: '4rem' }}></div>
              <div className="text-center mt-1" style={{ fontSize: '0.7rem' }}>
                শাখা ব্যবস্থাপক / একজন ব্যবস্থাপক (প্রভিত) এর নাম, পিন, স্বাক্ষর ও তারিখ
              </div>
            </div>
            <div className="col-3 border-end p-2">
              <div className="h-100"></div>
            </div>
            <div className="col-3 p-2">
              <div className="signature-box" style={{ height: '4rem' }}></div>
              <div className="text-center mt-1" style={{ fontSize: '0.7rem' }}>শাখা হিসাব কর্মকর্তা নাম, পিন, স্বাক্ষর ও তারিখ</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .checkbox-custom {
          width: 0.875rem;
          height: 0.875rem;
          border: 1px solid black;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .signature-box {
          border-bottom: 1px solid #dee2e6;
        }

        .form-check-input {
          width: 0.875rem;
          height: 0.875rem;
        }
      `}</style>
      </div>
      <hr></hr>
      {/* Office Copy - Repeat the same structure with reduced sizes */}
      <div className="insurance-form" style={{ marginTop: '70px' }}>
        <div className="mx-auto" style={{ maxWidth: '1000px' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="text-center">
            <h1 className="h5 mb-1">নির্ভাবনা স্বাস্থ্যবিমা</h1>
            <p className="small mb-0" style={{ fontSize: '0.7rem' }}>গ্রাহক নিবন্ধন ফর্ম</p>
          </div>
          <div className="text-end">
            <div className="border border-dark d-inline-block px-2" style={{ fontSize: '0.7rem' }}>অফিস কপি </div>
          </div>
        </div>

        <div className="border mb-3">
          <div className="row g-0">
            <div className="col border-end">
              <div className="p-1 d-flex align-items-center gap-2">
                <span>নতুন পলিসি</span>
                <input type="checkbox" className="form-check-input" checked={data.insurance_type_id === 1} />
                <span>নবায়ন পলিসি</span>
                <input type="checkbox" className="form-check-input" checked={data.insurance_type_id === 2} />
              </div>
            </div>
            <div className="col">
              <div className="p-1 d-flex align-items-center">
                <span>বিমা পলিসি নং - </span>
                <span style={{ fontSize: "0.7rem" }}>{data.insurance_policy_no}</span>
                <span className="ms-auto">তারিখ - {data.created_at}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rest of the sections with reduced padding and font size */}
        <div className="border mb-3">
          <div className="row g-0">
            <div className="col border-end">
              <div className="p-1">
                <div className="d-flex">
                  <span>শাখার নাম - {data?.branch?.branch_name}</span>
                  <div className="ms-3">
                    <span>শাখা কোড: {data?.branch?.branch_code}</span>
                    <span className="ms-3">ডি:ও কোড: </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="bg-light p-1">
                <span>প্রকল্পের নাম:{data?.project?.projectTitle}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border mb-3">
          <div className="row g-0">
            <div className="col border-end">
              <div className="p-1">
                <span>এলাকার নাম - </span>
              </div>
            </div>
            <div className="col">
              <div className="p-1 d-flex justify-content-between">
                <span>অঞ্চলের নাম - </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border mb-3">
          <div className="bg-light p-1 text-center">বিমাধারীর স্বাস্থ্য সম্পর্কিত তথ্য</div>
          <div className="p-1">
            <div className="d-flex align-items-center justify-content-between">
              <p className="flex-grow-1 mb-0" style={{ fontSize: '0.7rem' }}>
                আপনি কি বর্তমানে ক্যান্সার/ এইচআইভি/ কিডনি/ জন্ডিস/ হার্ট/ ফুসফুস সংক্রান্ত জটিলতায় আক্রান্ত আছেন বা বর্তমানে এ সংক্রান্ত কোনরূপ চিকিৎসা গ্রহণ করছেন?
              </p>
              <div className="d-flex gap-2">
                <div className="d-flex align-items-center gap-1">
                  <input type="checkbox" className="form-check-input" checked={data?.any_disease === true}></input>
                  <span>হ্যাঁ</span>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <input type="checkbox" className="form-check-input" checked={data?.any_disease === false}></input>
                  <span>না</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue with the same pattern for the rest of the sections... */}
        {/* Personal Information, Additional Information, Insurance Details, etc. */}
        {/* Using the same reduced padding (p-1 instead of p-2) and font sizes */}

        <div className="border mb-3">
          <div className="p-1">বিমাধারীর নাম: {data?.client?.name}</div>
          <div className="border-top">
            <div className="row g-0">
              <div className="col-4 border-end p-1">
                সদস্য নং: {data.orgmemno}
              </div>
              <div className="col-4 border-end p-1">
                <div className="d-flex align-items-center gap-2">
                  <span>লিঙ্গ:</span>
                  <div className="d-flex gap-2">
                    <div className="d-flex align-items-center gap-1">
                      <input type="checkbox" className="form-check-input" checked={data?.client?.sex === 1}></input>
                      <span>পুরুষ</span>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <input type="checkbox" className="form-check-input" checked={data?.client?.sex === 2}></input>
                      <span>নারী</span>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <div className="checkbox-custom"></div>
                      <span>অন্যান্য</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4 p-1">
                মোবাইল নম্বর: {data?.client?.contact_number}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="border mb-3">
          <div className="row g-0">
            <div className="col-6 border-end p-1">
              নমিনির জাতীয় পরিচয়পত্র নং: {data?.nominee_card_id}
            </div>
            <div className="col-6 p-1"></div>
          </div>
          <div className="row g-0 border-top">
            <div className="col-6 border-end p-1">
              নমিনির নাম: {data.nominee_name}
            </div>
            <div className="col-6 p-1">
              নমিনির বয়স: 34
            </div>
          </div>
          <div className="row g-0 border-top">
            <div className="col-6 border-end p-1">
              বিমাধারীর সাথে সম্পর্ক: {data?.nomineeRelation?.data_name}
            </div>
            <div className="col-6 p-1">
              নমিনির মোবাইল নম্বর: {data.nominee_phone_no}
            </div>
          </div>
        </div>

        {/* Insurance Details */}
        <div className="border mb-3">
          <div className="row g-0">
            <div className="col-3 border-end p-1">
              বিমার প্যাকেজ: {data?.category?.policy_name}
            </div>
            <div className="col-3 border-end p-1">
              বিমার ক্যাটাগরি: {data?.category?.title}
            </div>
            <div className="col-3 border-end p-1">
              প্রিমিয়াম: {data.premium_amnt} টাকা
            </div>
            <div className="col-3 p-1">
              বিমার মেয়াদকাল: ৩৬৫ দিন
            </div>
          </div>
        </div>

        {/* Declaration */}
        <div className="border mb-3 p-1">
          <p className="mb-0" style={{ fontSize: '0.7rem' }}>
            ফর্মে প্রদত্ত বিমা সংক্রান্ত সকল তথ্য সঠিক এবং বর্ণিত সকল নিয়মাবলী আমি নিজে পড়ে/ বুঝে মেনে নিয়ে স্বাক্ষর করলাম। উক্ত তথ্যাবলী ব্যবহারে ব্র্যাককে অনুমতি প্রদান করছি।
          </p>
        </div>

        {/* Signature Section */}
        <div className="border">
          <div className="row g-0">
            <div className="col-3 border-end p-2">
              <div className="signature-box" style={{ height: '4rem' }}></div>
              <div className="text-center mt-1" style={{ fontSize: '0.7rem' }}>বিমাধারীর স্বাক্ষর/টিপসই ও তারিখ</div>
            </div>
            <div className="col-3 border-end p-2">
              <div className="signature-box" style={{ height: '4rem' }}></div>
              <div className="text-center mt-1" style={{ fontSize: '0.7rem' }}>
                শাখা ব্যবস্থাপক / একজন ব্যবস্থাপক (প্রভিত) এর নাম, পিন, স্বাক্ষর ও তারিখ
              </div>
            </div>
            <div className="col-3 border-end p-2">
              <div className="h-100"></div>
            </div>
            <div className="col-3 p-2">
              <div className="signature-box" style={{ height: '4rem' }}></div>
              <div className="text-center mt-1" style={{ fontSize: '0.7rem' }}>শাখা হিসাব কর্মকর্তা নাম, পিন, স্বাক্ষর ও তারিখ</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .checkbox-custom {
          width: 0.875rem;
          height: 0.875rem;
          border: 1px solid black;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .signature-box {
          border-bottom: 1px solid #dee2e6;
        }

        .form-check-input {
          width: 0.875rem;
          height: 0.875rem;
        }
      `}</style>
      </div>
      </div>
    </div>
    </>
  );
};

export default InsuranceFormPdf;