import { createBrowserRouter } from "react-router-dom";






import App from "../App";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/authentications/Login";
import Registraition from "../pages/authentications/Registraition";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/login",
                element: <Login />,  // This will load the Login component when the app runs
            },
            {
                path: "/register",
                element: <Registraition />,  // This will load the Login component when the app runs
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
        ],
    },
]);
export default router;
