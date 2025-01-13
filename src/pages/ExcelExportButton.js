import React from 'react';
import * as XLSX from 'xlsx';
import { Button } from 'react-bootstrap';

const ExcelExportButton = ({ 
    policyWiseData, 
    selectedProject,
    selectedBranch,
    selectedPolicy,
    selectedCategory,
    fromDate,
    toDate,
    vo
  }) => {
    const handleExport = () => {
      // Create a new workbook
      const wb = XLSX.utils.book_new();
      
      // Create the data structure
      const data = [
        ['BRAC'],
        ['Nirvabona Health Insurance Policy Information Report'],
        [`From ${fromDate || 'DD-MM-YYYY'} To ${toDate || 'DD-MM-YYYY'}`],
        [],
        ['Project:', selectedProject || 'Microinsurance Dabi (15)'],
        ['Branch:', selectedBranch || 'Pallabi (616)'],
        ['Policy Type:', selectedPolicy || 'Shurokha'],
        ['Category Type:', selectedCategory || 'Category-3'],
        ['VO:', vo || '3323 (KALAPANIR LANE)'],
        [],
        ['Policy ID', 'Member No', 'Member Name', 'ERP Member ID', 'Policy Type', 'Category Type', 'Nominee Name', 'Nominee NID', 'Nominee Relation', 'Policy Duration', 'Policy Enrolment Date', 'Policy Expiration Date', 'Premium Amount', 'Claim Value', 'Status'],
      ];
  
      // Add empty rows for data
      for (let i = 0; i < 3; i++) {
        data.push(new Array(15).fill(''));
      }
  
      // Add totals at the bottom
      data.push(
        ['VO Total', '', '', '', '', '', '', '', '', '', 'No. of Premium:', '', '', 'NNN.NN'],
        ['Total', '', '', '', '', '', '', '', '', '', 'No. of Premium:', '', '', 'NNN.NN']
      );
  
      // Create worksheet
      const ws = XLSX.utils.aoa_to_sheet(data);
  
      // Set column widths
      ws['!cols'] = [
        { wch: 15 }, // Policy ID
        { wch: 12 }, // Member No
        { wch: 15 }, // Member Name
        { wch: 15 }, // ERP Member ID
        { wch: 12 }, // Policy Type
        { wch: 12 }, // Category Type
        { wch: 15 }, // Nominee Name
        { wch: 15 }, // Nominee NID
        { wch: 15 }, // Nominee Relation
        { wch: 12 }, // Policy Duration
        { wch: 15 }, // Policy Enrolment
        { wch: 15 }, // Policy Expiration
        { wch: 12 }, // Premium Amount
        { wch: 12 }, // Claim Value
        { wch: 12 }  // Status
      ];
  
      // Merge cells for headers
      ws['!merges'] = [
        // BRAC header
        { s: { r: 0, c: 0 }, e: { r: 0, c: 14 } },
        // Report title
        { s: { r: 1, c: 0 }, e: { r: 1, c: 14 } },
        // Date range
        { s: { r: 2, c: 0 }, e: { r: 2, c: 14 } }
      ];
  
      // Define the cell range
      const range = XLSX.utils.decode_range(ws['!ref']);
  
      // Apply styles to all cells
      for (let R = 0; R <= range.e.r; R++) {
        for (let C = 0; C <= range.e.c; C++) {
          const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
          if (!ws[cellRef]) ws[cellRef] = { v: '', t: 's' };
  
          // Initialize style object
          ws[cellRef].s = {
            border: {
              top: { style: 'thin', color: { auto: 1 } },
              bottom: { style: 'thin', color: { auto: 1 } },
              left: { style: 'thin', color: { auto: 1 } },
              right: { style: 'thin', color: { auto: 1 } }
            },
            font: { name: 'Arial', sz: 10 },
            alignment: { vertical: 'center', horizontal: 'left', wrapText: true }
          };
  
          // Headers (first three rows)
          if (R < 3) {
            ws[cellRef].s.alignment.horizontal = 'center';
            ws[cellRef].s.font = { bold: true, sz: 11 };
          }
          
          // Table headers row
          if (R === 10) {
            ws[cellRef].s.font = { bold: true, sz: 10 };
            ws[cellRef].s.alignment.horizontal = 'center';
          }
          
          // Project info rows
          if (R >= 4 && R <= 8) {
            if (C === 0) ws[cellRef].s.font = { bold: true, sz: 10 };
          }
        }
      }
  
      // Add sheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
      // Write file
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