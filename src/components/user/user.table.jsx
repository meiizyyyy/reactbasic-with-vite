import { Table, Popconfirm, notification } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UpdateUserModal from "./update.user.modal";
import { useState } from "react";
import ViewUserDetail from "./view.user.detail";
import { deleteUserAPI } from "../../services/api.service";

const UserTable = (props) => {
    const { dataUsers, loadUser } = props;

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [dataDetail, setDataDetail] = useState(null);
    const [isUserDetailOpen, setIsUserDetailOpen] = useState(false);

    const handleDeleteUser = async (id) => {
        const res = await deleteUserAPI(id);
        if (res.data) {
            notification.success({
                message: "Delete User",
                description: "Xóa user thành công",
            });
            await loadUser();
        } else {
            notification.error({
                message: "Delete User",
                description: JSON.stringify(res.message),
            });
        }
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "_id",
            render: (_, record) => {
                return (
                    <a
                        onClick={() => {
                            console.log("check details");
                            setDataDetail(record);
                            setIsUserDetailOpen(true);
                        }}>
                        {record._id}
                    </a>
                );
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
                            <Popconfirm
                                title="Xóa người dùng"
                                description="Bạn có chắc muốn xóa người dùng này?"
                                onConfirm={() => {
                                    handleDeleteUser(record._id);
                                }}
                                okText="Yes"
                                cancelText="No">
                                <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
                            </Popconfirm>
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
            <ViewUserDetail isUserDetailOpen={isUserDetailOpen} setIsUserDetailOpen={setIsUserDetailOpen} dataDetail={dataDetail} setDataDetail={setDataDetail} />
        </>
    );
};

export default UserTable;
