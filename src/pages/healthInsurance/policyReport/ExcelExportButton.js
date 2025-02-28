import React from 'react';
import { Button } from 'react-bootstrap';
import * as XLSX from 'xlsx';
// import { Button } from '@/components/ui/button';

const ExcelExportButton = ({ 
  policyWiseData, 
  selectedProject,
  selectedBranch,
  selectedPolicy,
  selectedCategory,
  fromDate,
  toDate,
  totalPremium,
  totalCount
}) => {
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };
  const formatDates = (dateString) => {
    if (!dateString) return '';
    
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-GB', options);
    
    const date = new Date(formattedDate);
    date.setMonth(date.getMonth() + 12);
    
    return date.toISOString().slice(0, 10);
 };

 
  const handleExport = () => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();
    
    // Create the data structure exactly matching the image
    const data = [
      ['', { t: 's', v: '', l: { Target: '/images/Picture3.png', Tooltip: 'BRAC Logo' } }, '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['', '', 'Nirvabona Health Insurance Policy Information Report', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['', '', `From ${formatDate(fromDate) || 'DD-MM-YYYY'} To ${formatDate(toDate) || 'DD-MM-YYYY'}`, '', '', '', '', '', '', '', '', '', '', '', '', ''],
      [''],
      ['', 'Project:', selectedProject, '', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['', 'Branch:', selectedBranch, '', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['', 'Policy Type:', selectedPolicy, '', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['', 'Category Type:', selectedCategory, '', '', '', '', '', '', '', '', '', '', '', '', ''],
      // ['', 'VO:', vo || '3323 (KALAPANIR LANE)', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      [''],
      // Table headers
      ['', 'Policy ID', 'Member No', 'Member Name', 'ERP Member ID', 'Policy Type', 'Category Type', 'Nominee Name', 'Nominee NID', 'Nominee Relation', 'Policy Duration', 'Policy Enrolment Date', 'Policy Expiration Date', 'Premium Amount', 'Claim Value', 'Status'],
    ];

    // Add policy data
    if (policyWiseData && policyWiseData.length > 0) {
      policyWiseData.forEach(item => {
        data.push(['',
          item?.insurance_policy_no || '',
          item?.orgmemno || '',
          item?.clients?.name || '',
          item?.enrolment_id || '',
          item?.health_configurations?.policy_name || '',
          item?.health_configurations?.title || '',
          item?.nominee_name || '',
          item?.nominee_card_id || '',
          item?.relationships?.data_name || '',
          item?.insurance_tenure || '',
          formatDate(item?.created_at) || '',
          formatDates(item?.created_at) || '',
          item?.premium_amnt || '',
          item?.total_claim_amount || '',
          item?.statuses?.status_name || ''
        ]);
      });
    } else {
      // Add empty rows if no data
      for (let i = 0; i < 5; i++) {
        data.push(['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']);
      }
    }

    // Add totals at the bottom
    data.push(
      ['', 'VO Total', '', '', '', '', '', '', '', '', ''],
      ['', 'Total', totalCount, '', '', '', '', '', '', '', '', 'No. of Premium:', '', totalPremium, '', '']
    );

    // Create worksheet
    const ws = XLSX.utils.aoa_to_sheet(data);

    // Set column widths
    ws['!cols'] = [
      { wch: 4 },  // Empty first column
      { wch: 15 }, // Policy ID
      { wch: 12 }, // Member No
      { wch: 20 }, // Member Name
      { wch: 15 }, // ERP Member ID
      { wch: 15 }, // Policy Type
      { wch: 15 }, // Category Type
      { wch: 20 }, // Nominee Name
      { wch: 15 }, // Nominee NID
      { wch: 15 }, // Nominee Relation
      { wch: 15 }, // Policy Duration
      { wch: 20 }, // Policy Enrolment
      { wch: 20 }, // Policy Expiration
      { wch: 15 }, // Premium Amount
      { wch: 15 }, // Claim Value
      { wch: 12 }  // Status
    ];

    // Add merged cells
    ws['!merges'] = [
      // BRAC header
      { s: { r: 1, c: 2 }, e: { r: 1, c: 15 } },
      // Report title
      { s: { r: 2, c: 2 }, e: { r: 2, c: 15 } },
      // Date range
      { s: { r: 3, c: 2 }, e: { r: 3, c: 15 } }
    ];

    // Add borders and styling
    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let R = 0; R <= range.e.r; R++) {
      for (let C = 0; C <= range.e.c; C++) {
        const cell_ref = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[cell_ref]) continue;

        // Initialize style if not exists
        if (!ws[cell_ref].s) ws[cell_ref].s = {};

        // Default styling
        ws[cell_ref].s = {
          font: { name: "Arial", sz: 10 },
          alignment: { vertical: "center", horizontal: "left" },
          border: {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" }
          }
        };

        // Headers styling (row 11)
        if (R === 10) {
          ws[cell_ref].s.font = { bold: true, sz: 10 };
          ws[cell_ref].s.fill = { fgColor: { rgb: "F2F2F2" } };
        }

        // BRAC and report title styling
        if (R < 3) {
          ws[cell_ref].s.font = { bold: true, sz: 12 };
          ws[cell_ref].s.alignment = { horizontal: "center" };
        }

        // Project info styling
        if (R >= 4 && R <= 8) {
          ws[cell_ref].s.font = { sz: 10 };
        }
      }
    }

    // Add the worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Policy Information');

    // Generate Excel file
    XLSX.writeFile(wb, 'Policy_Information_Report.xlsx');
  };

  return (
    <div className="d-flex justify-content-end">
      <Button
        className="btn-sm"
        onClick={handleExport}
      >
        Excel
      </Button>
    </div>
  );
};

export default ExcelExportButton;