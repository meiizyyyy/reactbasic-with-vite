import "./components/todo/todo.css";

import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import { Outlet } from "react-router-dom";
import { getAccountAPI } from "./services/api.service";
import { useContext, useEffect } from "react";
import { AuthContext } from "./components/context/auth.context";

const App = () => {
    // addNewTodo();
    const { setUser } = useContext(AuthContext);

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        const res = await getAccountAPI();
        if (res.data) {
            //success
            setUser(res.data.user);
            console.log("Check data account", res.data);
        }
    };

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default App;
