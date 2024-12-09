import { createBrowserRouter } from "react-router-dom";






import App from "../App";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/authentications/Login";
import Registraition from "../pages/authentications/Registraition";
import PrivateRoute from "./PrivateRoutes";
import InsuranceList from "../pages/InsuranceList";
import InsuranceForm from "../pages/InsuranceForm";
import MemberList from "../pages/MemberList";


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
        path: "/insurance-form/:id/:name/:account_number", // Child route for the dashboard with id and member_name parameters
        element: (
          <PrivateRoute requiredPermission="/insurance-form">
            <InsuranceForm />
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
    ],
  },
]);

export default router;
