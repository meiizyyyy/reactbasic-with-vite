import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/login",
        element: <div>Hello Login!!!</div>,
    },
    {
        path: "/register",
        element: <div>"Hello register!!!"</div>,
    },
    {
        path: "/users",
        element: <div>"Hello users !!!"</div>,
    },
    {
        path: "/products",
        element: <div>"Hello products!!!"</div>,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
        {/* <App /> */}
    </React.StrictMode>,
);
