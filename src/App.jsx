import "./components/todo/todo.css";

import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import { Outlet } from "react-router-dom";
import { getAccountAPI } from "./services/api.service";
import { useContext, useEffect } from "react";
import { AuthContext } from "./components/context/auth.context";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";

const App = () => {
    // addNewTodo();
    const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        const res = await getAccountAPI();
        if (res.data) {
            //success
            setUser(res.data.user);
            // console.log("Check data account", res.data);
        }
        setIsAppLoading(false);
    };

    return (
        <>
            {isAppLoading === true ? (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%",
                    }}>
                    <Spin indicator={<LoadingOutlined spin />} />
                </div>
            ) : (
                <>
                    <Header />
                    <Outlet />
                    <Footer />
                </>
            )}
        </>
    );
};

export default App;
