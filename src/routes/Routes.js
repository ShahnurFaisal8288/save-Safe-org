import { createBrowserRouter } from "react-router-dom";






import App from "../App";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/authentications/Login";
import Registraition from "../pages/authentications/Registraition";
import PrivateRoute from "./PrivateRoutes";
import InsuranceList from "../pages/InsuranceList";
import InsuranceForm from "../pages/InsuranceForm";
import MemberList from "../pages/MemberList";
import InsuranceDetails from "../pages/InsuranceDetails";
import MicroHealthInsurance from "../pages/MicroHealthInsurance";
import ReceiveCreditAdvice from "../pages/ReceiveCreditAdvice";
import ClaimSettlement from "../pages/ClaimSettlement";
import ApproveStatus from "../pages/ApproveStatus";
import InsuranceFormPdf from "../pages/InsuranceFormPdf";
import Sidebar from "../pages/Sidebar";
import Area from "../pages/Area";
import Member from "../pages/Member";
import CollectorAdd from "../pages/CollectorAdd";
import HouseHold from "../pages/HouseHold";
import LoanEntry from "../pages/LoanEntry";
import LTSAccount from "../pages/LTSAccount";
import LTSLoneEntry from "../pages/LTSLoneEntry";




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
        path: "/insurance-form/:id/:name/:account_number/:sex/:date_of_birth", // Child route for the dashboard with id and member_name parameters
        element: (
          <PrivateRoute requiredPermission="/insurance-form">
            <InsuranceForm />
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
        path: "/insuranceFormPdf/:id", // Child route for the dashboard
        element: (
          <PrivateRoute requiredPermission="/insuranceFormPdf">
          <InsuranceFormPdf />
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
    ],
  },
]);

export default router;
