import { Link, Navigate, useNavigate } from "react-router-dom";
import { Menu, message } from "antd";
import { HomeOutlined, UserOutlined, BookOutlined, SettingOutlined, LoginOutlined, LogoutOutlined, AliwangwangOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import "./header.css";
import { logoutAPI } from "../../services/api.service";

const Header = () => {
    const [current, setCurrent] = useState("");

    const { user, setUser } = useContext(AuthContext);
    // console.log("Check context", user);
    const navigate = useNavigate();
    const onClick = (e) => {
        console.log("click ", e);
        setCurrent(e.key);
    };

    const handleLogout = async () => {
        const res = await logoutAPI();
        if (res.data) {
            //clear data
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: "",
            });
            localStorage.removeItem("access_token");
            message.success("Đăng Xuất thành công!");
            navigate("/");
        }
    };

    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: "home",
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/users"}>Users</Link>,
            key: "users",
            icon: <UserOutlined />,
        },
        {
            label: <Link to={"/books"}>Books</Link>,
            key: "books",
            icon: <BookOutlined />,
        },

        ...(!user.id
            ? [
                  {
                      label: <Link to={"/login"}>Đăng Nhập</Link>,
                      key: "login",
                      className: "menu-item-auth",
                      style: { marginLeft: "auto" },
                      icon: <LoginOutlined />,
                  },
              ]
            : []),

        ...(user.id
            ? [
                  {
                      label: `Welcome, ${user.fullName} !!`,
                      key: "setting",
                      className: "menu-item-auth",
                      style: { marginLeft: "auto" },
                      icon: <AliwangwangOutlined />,
                      children: [
                          {
                              type: "group",
                              children: [
                                  {
                                      label: <span onClick={handleLogout}>Đăng Xuất</span>,
                                      key: "logout",
                                  },
                              ],
                          },
                      ],
                  },
              ]
            : []),
    ];

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default Header;
