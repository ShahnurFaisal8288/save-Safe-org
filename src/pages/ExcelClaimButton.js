import React from 'react';
import { Button } from 'react-bootstrap';
import * as XLSX from 'xlsx';

const ExcelExportButton = ({ claimData }) => {
  const handleExport = () => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Initialize the data array with the required headers
    const data = [
      [
        'Branch Name',
        'Branch Code',
        'Area Name',
        'Region Name',
        'Division Name',
        'Project Name',
        'Policy Taken Date',
        'Incident Date (According to Prescription)',
        'Incident Setup Date',
        'Package Type (Category-1/Category-2/Category-3)',
        'Policy Type (Surokha/Momota)',
        'Claim Type (Natural Death/Accidental Death/Disability (TPD)/Disability (PPD)/IPD/OPD/Maternity (Normal Delivery)/Maternity (C-section)/Maternity (Legal abortion))',
        'Claimed Amount',
        'Sum Insured Amount',
        'Remaining Sum Insured',
        'Number of Claims Paid',
        'Claim Status (Rejected/Settled)',
        'Claim Paid Amount',
        'Rejected Claim Amount',
        'Unique Policy ID (System Generated)',
        'Policy Holder\'s Name',
        'Policy Holder\'s Member Code (BRAC MEMBER)',
        'Policy Holder\'s Mobile Number',
        'Policy Holder\'s NID',
        'Policy Holder\'s Smart NID',
        'Policy Holder\'s Birth Certificate',
        'Policy Holder\'s Passport No',
        'Policy Holder\'s Driving License',
        'Nominee Name',
        'Nominee Age',
        'Nominee Smart NID',
        'Nominee Birth Certificate',
        'Nominee Passport No',
        'Nominee Driving License',
        'Nominee Relation with Policy Holder',
        'Nominee Mobile Number',
        'Claim No',
        'Claim Payment Date',
      ],
    ];

    // Map claimData to the required format
    if (claimData && claimData.length > 0) {
      claimData.forEach((item) => {
        data.push([
          item.branch_name || '',
          item.branch_code || '',
          item.area_name || '',
          item.region_name || '',
          item.division_name || '',
          item.healthInsurance?.project_code || '',
          '', // Policy Taken Date (not provided in the data)
          item.date_of_incident || '',
          '', // Incident Setup Date (not provided in the data)
          '', // Package Type (not provided in the data)
          item.InsurancePolicy?.policy_name || '',
          item.treatmentType?.type_name || '',
          item.claim_amount || '',
          '', // Sum Insured Amount (not provided in the data)
          '', // Remaining Sum Insured (not provided in the data)
          '', // Number of Claims Paid (not provided in the data)
          item.status?.status_name || '',
          '', // Claim Paid Amount (not provided in the data)
          '', // Rejected Claim Amount (not provided in the data)
          item.insurance_policy_no || '',
          '', // Policy Holder's Name (not provided in the data)
          item.healthInsurance?.orgmemno || '',
          '', // Policy Holder's Mobile Number (not provided in the data)
          '', // Policy Holder's NID (not provided in the data)
          '', // Policy Holder's Smart NID (not provided in the data)
          '', // Policy Holder's Birth Certificate (not provided in the data)
          '', // Policy Holder's Passport No (not provided in the data)
          '', // Policy Holder's Driving License (not provided in the data)
          '', // Nominee Name (not provided in the data)
          '', // Nominee Age (not provided in the data)
          '', // Nominee Smart NID (not provided in the data)
          '', // Nominee Birth Certificate (not provided in the data)
          '', // Nominee Passport No (not provided in the data)
          '', // Nominee Driving License (not provided in the data)
          '', // Nominee Relation with Policy Holder (not provided in the data)
          '', // Nominee Mobile Number (not provided in the data)
          item.enrollment_id || '',
          '', // Claim Payment Date (not provided in the data)
        ]);
      });
    } else {
      // Add empty rows if no data is available
      for (let i = 0; i < 5; i++) {
        data.push(Array(37).fill(''));
      }
    }

    // Create worksheet
    const ws = XLSX.utils.aoa_to_sheet(data);

    // Set column widths
    ws['!cols'] = Array(37).fill({ wch: 25 });

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Claim Data Report');

    // Generate Excel file
    XLSX.writeFile(wb, 'Claim_Data_Report.xlsx');
  };

  return (
    <div className="d-flex justify-content-end">
      <Button className="btn-sm" onClick={handleExport}>
        Export to Excel
      </Button>
    </div>
  );
};

export default ExcelExportButton;
