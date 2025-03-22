import { createBrowserRouter } from "react-router";
import Layout from "../../components/Layout";
import Home from "../../components/Home";
import Login from "../../components/Login";
import Register from "../../components/Register";
import Dashboard from "../../components/Dashboard";
import GroupDashboard from "../../components/GroupDashboard";
import { ProtectedRoute } from "../../components/ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true, // Default child route (dashboard)
                element: <Dashboard />
            },
            {
                path: "groups/:groupId", // Nested inside /dashboard
                element: <GroupDashboard />
            }
        ]
    }
]);
