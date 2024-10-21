import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login.jsx";
import ProductsPage from "./pages/products.jsx";
import UsersPage from "./pages/users.jsx";
import RegisterPage from "./pages/register.jsx";
import TodoApp from "./components/todo/TodoApp.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <TodoApp />,
            },
            {
                path: "/users",
                element: <UsersPage />,
            },
            {
                path: "/products",
                element: <ProductsPage />,
            },
        ],
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
        {/* <App /> */}
    </React.StrictMode>,
);
