import React from 'react'
import { Button } from 'react-bootstrap';
import * as XLSX from 'xlsx';

const ExcelEnrolment = ({currentData}) => {
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
            'Policy Holder’s Gender',
            'BENIFIT_CODE',
            'ORG_CODE',
            'Policy Holder’s Age',
            'DOB',
            'Policy Taken Date',
            'Policy Expiry Date',
            'Policy renewal status',
            'Package Type (Category-1/ Category-2/ Category-3)',
            'Policy Type (Surokha/ Momota)',
            'Premium Amount',
            'Unique Policy ID (System Generated)',
            `Policy Holder's Name`,
            `Policy Holder’s Member code (BRAC MEMBER)`,
            `Member Number (System Generated)`,
            `Policy Holder’s Mobile Number`,
            `Sum Insured (IPD)`,
            `Sum Insured (OPD)`,
            `Sum Insured (Maternity_Normal)`,
            `Sum Insured (Maternity_Cesarian)`,
            `Sum Insured (Maternity_Legal_Abortion)`,
            `Sum Insured (Natural Death)`,
            `Sum Insured (Accidental Death)`,
            `Sum Insured (PTD)`,
            `Sum Insured (PPD)`,
            `Policy Holder's NID`,
            `Policy Holder's Smart NID`,
            `Policy Holder's Birth Certificate`,
            `Policy Holder's Passport no`,
            `Policy Holder's driving license`,
            `Nominee Name`,
            `Nominee Age`,
            `Nominee NID`,
            `Nominee Birth Certificate`,
            `Nominee Passport no`,
            `Nominee driving license`,
            `Nominee Relation with Policy Holder`,
            `Nominee Mobile Number`,
          ],
        ];
      
        // Map currentData to the required format
        if (currentData && currentData.length > 0) {
          currentData.forEach((item) => {
            data.push([
              item.branch?.branch_name || '',
              item.branch?.branch_code || '',
              item.areas?.name || '',
              item.regions?.name || '',
              item.divisions?.name || '',
              item.projects?.projectTitle || '',
              item.health_configurations?.gender || '',
              item.health_configurations?.benefit_code || '',
              item.health_configurations.organization_code || '',
              item.clients.date_of_birth ? Math.floor((new Date() - new Date(item.clients.date_of_birth).getTime()) / (1000 * 60 * 60 * 24 * 365.25)) : '',
              item.clients.date_of_birth || '',
              formatDate(item.created_at) || '',
              formatDate(item.created_at) || '', formatDate(new Date(new Date(item.created_at).setMonth(new Date(item.created_at).getMonth() + 12))) || '',
              item.health_configurations.title || '',
              item.health_configurations?.policy_name || '', // Policy Type (Surokha/ Momota)
              item.premium_amnt || '',
              item.insurance_policy_no || '',
              item.clients?.name || '',
              item.orgmemno || '',
              '',
              item.clients.contact_number || '',
              item?.health_configurations?.ipd || '', // Sum Insured (IPD) (not provided in the data)
              item?.health_configurations?.opd || '', // Sum Insured (OPD) (not provided in the data)
              '', // Sum Insured (Maternity_Normal) (not provided in the data)
              item?.health_configurations?.cesarean_delivery || '', // Sum Insured (Maternity_Cesarian) (not provided in the data)
              '', // Sum Insured (Maternity_Legal_Abortion) (not provided in the data)
              item?.health_configurations?.natural_death || '', // Sum Insured (Natural Death) (not provided in the data)
              item?.health_configurations?.accidental_death ||'', // Sum Insured (Accidental Death) (not provided in the data)
              item?.health_configurations?.permanent_total_disability || '', // Sum Insured (PTD) (not provided in the data)
              item?.health_configurations?.permanent_partial_disability|| '', // Sum Insured (PPD) (not provided in the data)
              item.clients?.nid ||'', // Policy Holder's NID (not provided in the data)
              item.clients?.smart_card||'', // Policy Holder's Smart NID (not provided in the data)
              item.clients?.birth_certificate || '', // Policy Holder's Birth Certificate (not provided in the data)
              item?.clients?.passport_no||'', // Policy Holder's Passport no (not provided in the data)
              item?.clients?.driving_license||'', // Policy Holder's driving license (not provided in the data)
              item.nominee_name || '',
              item.nominee_birthdate
                ? Math.floor((new Date() - new Date(item.nominee_birthdate).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
                : '',
              (item?.nominee_typeof_card_id === 2) ? (item.nominee_card_id || '') : '',
              (item?.nominee_typeof_card_id === 1) ? (item.nominee_card_id || '') : '',
              (item?.nominee_typeof_card_id === 3) ? (item.nominee_card_id || '') : '',
              (item?.nominee_typeof_card_id === 4) ? (item.nominee_card_id || '') : '',
             
              '', // Nominee driving license (not provided in the data)
              item.relationships?.data_name || '',
              item.nominee_phone_no || '',
            ]);
          });
        } else {
          // Add empty rows if no data is available
          for (let i = 0; i < 5; i++) {
            data.push(Array(42).fill(''));
          }
        }
      
        // Create worksheet
        const ws = XLSX.utils.aoa_to_sheet(data);
      
        // Set column widths
        ws['!cols'] = Array(42).fill({ wch: 25 });
      
        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Enrolment Data Report');
      
        // Generate Excel file
        XLSX.writeFile(wb, 'Enrolment_Data_Report.xlsx');
      };
    
      return (
        <div className="d-flex justify-content-end">
          <Button className="btn-sm" onClick={handleExport}>
            Export to Excel
          </Button>
        </div>
      );
}

export default ExcelEnrolment
