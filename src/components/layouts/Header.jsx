import { Link } from "react-router-dom";
import { Menu } from "antd";
import { HomeOutlined, UserOutlined, BookOutlined, SettingOutlined, LoginOutlined, LogoutOutlined, AliwangwangOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import "./header.css";

const Header = () => {
    const [current, setCurrent] = useState("");

    const { user } = useContext(AuthContext);
    // console.log("Check context", user);

    const onClick = (e) => {
        console.log("click ", e);
        setCurrent(e.key);
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
                                      label: "Đăng Xuất",
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
