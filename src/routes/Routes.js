import { createBrowserRouter } from "react-router-dom";






import App from "../App";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/authentications/Login";
import Registraition from "../pages/authentications/Registraition";
import PrivateRoute from "./PrivateRoutes";
import InsuranceList from "../pages/healthInsurance/InsuranceList";
import InsuranceForm from "../pages/healthInsurance/InsuranceForm";
import MemberList from "../pages/healthInsurance/member/MemberList";
import InsuranceDetails from "../pages/healthInsurance/InsuranceDetails";
import MicroHealthInsurance from "../pages/healthInsurance/claim/MicroHealthInsurance";
import ReceiveCreditAdvice from "../pages/ReceiveCreditAdvice";
import ClaimSettlement from "../pages/healthInsurance/claim/ClaimSettlement";
import ApproveStatus from "../pages/healthInsurance/ApproveStatus";
import InsuranceFormPdf from "../pages/healthInsurance/InsuranceFormPdf";
import Sidebar from "../pages/Sidebar";
import Area from "../pages/Area";
import Member from "../pages/healthInsurance/member/Member";
import CollectorAdd from "../pages/CollectorAdd";
import HouseHold from "../pages/HouseHold";
import LoanEntry from "../pages/LoanEntry";
import LTSAccount from "../pages/LTSAccount";
import LTSLoneEntry from "../pages/LTSLoneEntry";
import ClaimList from "../pages/healthInsurance/claim/ClaimList";
import ClaimFormPdf from "../pages/healthInsurance/claim/ClaimFormPdf";
import OfficeTransactions from "../pages/OfficeTransactions";
// import LeaveEntry from "../pages/LeaveEntry";
import HandHeld from "../pages/HandHeld";
import Session from "../pages/Session";
import ClosingEarnings from "../pages/ClosingEarnings";
import BusinessRules from "../pages/BusinessRules";
import PassbookRegister from "../pages/PassbookRegister";
import ManagerPalm from "../pages/ManagerPalm";
import SettledStatus from "../pages/healthInsurance/settle/SettledStatus";
import PolicyReport from "../pages/healthInsurance/policyReport/PolicyReport";
import SettledPdf from "../pages/healthInsurance/settle/SettledPdf";
import RenewInsuranceForm from "../pages/RenewInsuranceForm";
import LeaveEntry from "../pages/leaveEntry/LeaveEntry";
import LeaveEntryList from "../pages/leaveEntry/LeaveEntryList";
import BranchEntry from "../pages/branch/BranchEntry";





const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />, // Standalone Login route
  },
  {
    path: "/register",
    element: <Registraition />, // Standalone Registration route
  },
  {
    path: "/",
    element: <App />, // App is the parent layout
    children: [
      {
        path: "/dashboard", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/dashboard">
          <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/insurance-list", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/insurance-list">
          <InsuranceList />
          </PrivateRoute>
        ),
      },
      {
        path: "/insurance-form/:id/:name/:account_number/:sex/:date_of_birth/:project_code/:date_of_birth/:occupation/:present_address/:village_address/:date_in/:date_out/:nominee/:relationship",
        element: (
          <PrivateRoute requiredPermission="/insurance-form">
            <InsuranceForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/insurance-form-renew",
        element: (
          <PrivateRoute requiredPermission="/insurance-form-renew">
            <RenewInsuranceForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/insurance-form-details/:id/:member_name/:branch_id/:enrolment_id/:insurance_policy_id/:insurance_type_id/:category_id/:premium_amnt/:insurance_tenure/:nominee_name/:nomine_phone_no/:nominee_relation_id/:contact_no", // Child route for the dashboard with id and member_name parameters
        element: (
          <PrivateRoute requiredPermission="/insurance-form-details">
            <InsuranceDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/member-list", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/member-list">
          <MemberList />
          </PrivateRoute>
        ),
      },
      {
        path: "/micro-health-insurance", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/micro-health-insurance">
          <MicroHealthInsurance />
          </PrivateRoute>
        ),
      },
      {
        path: "/receive-credit-advice", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/receive-credit-advice">
          <ReceiveCreditAdvice />
          </PrivateRoute>
        ),
      },
      {
        path: "/claim-settlement", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/claim-settlement">
          <ClaimSettlement />
          </PrivateRoute>
        ),
      },
      {
        path: "/approve-insurance-enrollment/:id", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/approve-insurance-enrollment">
          <ApproveStatus />
          </PrivateRoute>
        ),
      },
      {
        path: "/settled-Claim-form/:id", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/settled-Claim-form">
          <SettledStatus />
          </PrivateRoute>
        ),
      },
      {
        path: "/insuranceFormPdf/:id", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/insuranceFormPdf">
          <InsuranceFormPdf />
          </PrivateRoute>
        ),
      },
      {
        path: "/claimFormPdf/:id", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/claimFormPdf">
          <ClaimFormPdf />
          </PrivateRoute>
        ),
      },
      {
        path: "/settledPdf/:id", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/settledPdf">
          <SettledPdf />
          </PrivateRoute>
        ),
      },
      {
        path: "/sidebar", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/sidebar">
          <Sidebar />
          </PrivateRoute>
        ),
      },
      {
        path: "/area", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/area">
          <Area />
          </PrivateRoute>
        ),
      },
      {
        path: "/member", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/member">
          <Member />
          </PrivateRoute>
        ),
      },
      {
        path: "/collectorAdd", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/collectorAdd">
          <CollectorAdd />
          </PrivateRoute>
        ),
      },
      {
        path: "/houseHold", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/houseHold">
          <HouseHold />
          </PrivateRoute>
        ),
      },
      {
        path: "/loanEntry", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/loanEntry">
          <LoanEntry />
          </PrivateRoute>
        ),
      },
      {
        path: "/LTSAccount", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/LTSAccount">
          <LTSAccount />
          </PrivateRoute>
        ),
      },
      {
        path: "/LTSLoanEntry", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/LTSLoanEntry">
          <LTSLoneEntry />
          </PrivateRoute>
        ),
      },
      {
        path: "/claimList", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/claimList">
          <ClaimList />
          </PrivateRoute>
        ),
      },
      {
        path: "/office-transactions", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/office-transactions">
          <OfficeTransactions />
          </PrivateRoute>
        ),
      },
      {
        path: "/leave-entry", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/leave-entry">
          <LeaveEntry />
          </PrivateRoute>
        ),
      },
      {
        path: "/leave-entry-list", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/leave-entry">
          <LeaveEntryList />
          </PrivateRoute>
        ),
      },
      {
        path: "/hand-held", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/hand-held">
          <HandHeld />
          </PrivateRoute>
        ),
      },
      {
        path: "/session", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/session">
          <Session />
          </PrivateRoute>
        ),
      },
      {
        path: "/closing-earnings-posting", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/closing-earnings-posting">
          <ClosingEarnings />
          </PrivateRoute>
        ),
      },
      {
        path: "/business-rules", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/business-rules">
          <BusinessRules />
          </PrivateRoute>
        ),
      },
      {
        path: "/passbook-register", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/passbook-register">
          <PassbookRegister />
          </PrivateRoute>
        ),
      },
      {
        path: "/manager-palm", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/manager-palm">
          <ManagerPalm />
          </PrivateRoute>
        ),
      },
      {
        path: "/policyReport", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/policyReport">
          <PolicyReport />
          </PrivateRoute>
        ),
      },
      {
        path: "/branchEntry", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/branchEntry">
          <BranchEntry />
          </PrivateRoute>
        ),
      },
      {
        path: "/pageWisePermissions", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/pageWisePermissions">
          <pageWisePermissions />
          </PrivateRoute>
        ),
      },
     
    ],
  },
]);

export default router;
