import { createBrowserRouter } from "react-router-dom";






import App from "../App";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/authentications/Login";
import Registraition from "../pages/authentications/Registraition";
import PrivateRoute from "./PrivateRoutes";
import InsuranceList from "../pages/InsuranceList";
import InsuranceForm from "../pages/InsuranceForm";


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
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                ),
            },
            {
                path: "/insurance-list", // Child route for the dashboard
                element: (
                    <PrivateRoute>
                        <InsuranceList />
                    </PrivateRoute>
                ),
            },
            {
                path: "/insurance-form", // Child route for the dashboard
                element: (
                    <PrivateRoute>
                        <InsuranceForm />
                    </PrivateRoute>
                ),
            },
           
        ],
    },
]);

export default router;