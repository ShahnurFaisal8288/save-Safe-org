import React from 'react';
import { Button } from 'react-bootstrap';
import * as XLSX from 'xlsx';

const ExcelExportButton = ({ claimData }) => {
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };
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
          item.healthInsurance?.client?.sectors?.branches?.branch_name || '',
          item.healthInsurance?.client?.sectors?.branches?.branch_code || '',
          item.healthInsurance?.client?.sectors?.branches?.area_name || '',
          item.healthInsurance?.client?.sectors?.branches?.region_name || '',
          item.healthInsurance?.client?.sectors?.branches?.division_name || '',
          item.healthInsurance?.project?.projectTitle || '',
          formatDate(item.healthInsurance?.created_at) || '',
          formatDate(item.date_of_incident) || '',
          formatDate(item.date_of_incident) || '',
          item.InsurancePolicy.title || '',
          item.InsurancePolicy?.policy_name || '',
          item.treatmentType?.type_name || '',
          item.claim_amount || '',
          item.InsurancePolicy?.sum_insured || '', // Sum Insured Amount (not provided in the data)
          '', // Remaining Sum Insured (not provided in the data)
          '', // Number of Claims Paid (not provided in the data)
          item.status?.status_name || '',
          '', // Claim Paid Amount (not provided in the data)
          '', // Rejected Claim Amount (not provided in the data)
          item.insurance_policy_no || '',
          item.healthInsurance?.client?.name || '',
          item.healthInsurance?.orgmemno || '',
          item.healthInsurance?.contact_no || '',
          item.healthInsurance?.client?.nid || '', // Policy Holder's NID (not provided in the data)
          item.healthInsurance?.client?.smart_card || '', // Policy Holder's Smart NID (not provided in the data)
          item.healthInsurance?.client?.birth_certificate || '', // Policy Holder's Birth Certificate (not provided in the data)
          item.healthInsurance?.client?.passport_no || '', // Policy Holder's Passport No (not provided in the data)
          item.healthInsurance?.client?.driving_license || '', // Policy Holder's Driving License (not provided in the data)
          item.healthInsurance?.nominee_name || '',
            item.healthInsurance?.nominee_birthdate
            ? Math.floor((new Date() - new Date(item.healthInsurance.nominee_birthdate).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
            : '',
            
            (item.healthInsurance?.nominee_typeof_card_id === 5) ? (item.healthInsurance?.nominee_card_id || '') : '',
            (item.healthInsurance?.nominee_typeof_card_id === 1) ? (item.healthInsurance?.nominee_card_id || '') : '',
            (item.healthInsurance?.nominee_typeof_card_id === 3) ? (item.healthInsurance?.nominee_card_id || '') : '',
            (item.healthInsurance?.nominee_typeof_card_id === 4) ? (item.healthInsurance?.nominee_card_id || '') : '',

          item.healthInsurance?.nomineeRelation?.data_name || '',
          item.healthInsurance?.nominee_phone_no || '',
          item.id || '',
          item.created_at || '',
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
