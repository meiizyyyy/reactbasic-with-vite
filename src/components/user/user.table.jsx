import { Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UpdateUserModal from "./update.user.modal";
import { useState } from "react";
const UserTable = (props) => {
    const { dataUsers, loadUser } = props;

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    const columns = [
        {
            title: "ID",
            dataIndex: "_id",
            render: (_, record) => {
                return <a href="#">{record._id}</a>;
            },
        },
        {
            title: "Full Name",
            dataIndex: "fullName",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => {
                return (
                    <div style={{ display: "flex", gap: "20px" }}>
                        <a href="#">
                            <EditOutlined
                                onClick={() => {
                                    console.log("check", record);
                                    setDataUpdate(record);
                                    setIsModalUpdateOpen(true);
                                }}
                                style={{ color: "orange", cursor: "pointer" }}
                            />
                        </a>
                        <a>
                            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
                        </a>
                    </div>
                );
            },
        },
    ];

    // loadUser(); ném lên useEffect để không re-render liên tục
    console.log("Run render 000");

    return (
        <>
            <Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
        </>
    );
};

export default UserTable;
