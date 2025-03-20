import Home from "../../components/Home";
import Login from "../../components/Login";
import Register from "../../components/Register";

export const ROUTES = [
    {
        path: "/",
        element: <Home/>
    },
    {
        path:"/login",
        element: <Login/>
    },
    {
        path:"/register",
        element: <Register/>
    },
]