import { createBrowserRouter } from "react-router";
import Layout from "../../components/Layout";
import Home from "../../components/Home";
import Login from "../../components/Login";
import Register from "../../components/Register";
import Dashboard from "../../components/Dashboard";
import GroupDashboard from "../../components/GroupDashboard";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import FriendDashboard from "../../components/FriendDashboard";

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
                index: true,
                element: <Dashboard />
            },
            {
                path: "groups/:groupId",
                element: <GroupDashboard />
            },
            {
                path: "friends/:friendId",
                element: <FriendDashboard />
            }
        ]
    }
]);
