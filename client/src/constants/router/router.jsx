import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import { ROUTES } from "./route";

export const router = createBrowserRouter(
    createRoutesFromElements(
        ROUTES.map((route) => (
            <Route key={route.path} path={route.path} element={route.element}/>
        ))
    )
)