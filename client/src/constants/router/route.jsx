import Home from "../../components/Home";
import Login from "../../components/Login";
import Register from "../../components/Register";
import Dashboard from "../../components/Dashboard";
import GroupDashboard from "../../components/GroupDashboard";
import Layout from "../../components/Layout";
import { ProtectedRoute } from "../../components/ProtectedRoute";

export const ROUTES = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
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
                index: true, // Default route inside Layout
                element: <Dashboard />,
            },
            {
                path: "groups/:groupId",
                element: <GroupDashboard />,
            },
        ],
    },
];
