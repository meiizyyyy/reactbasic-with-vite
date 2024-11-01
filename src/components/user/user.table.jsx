import { Space, Table, Tag } from "antd";
import { fetchAllUserAPI } from "../../services/api.service";
import { useState } from "react";
import { useEffect } from "react";

const UserTable = () => {
    const [dataUsers, setDataUsers] = useState([]);

    //empty array
    useEffect(() => {
        console.log("Run useEffect 111");
        loadUser();
    }, []);

    const columns = [
        {
            title: "ID",
            dataIndex: "_id",
        },
        {
            title: "Full Name",
            dataIndex: "fullName",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
    ];

    const loadUser = async () => {
        // console.log("Run loadUser");
        const res = await fetchAllUserAPI();
        // console.log("End", res.data);
        setDataUsers(res.data);
    };
    // loadUser(); ném lên useEffect để không re-render liên tục
    console.log("Run render 000");
    return <Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />;
};

export default UserTable;
