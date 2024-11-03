import { Table, Popconfirm, notification } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UpdateUserModal from "./update.user.modal";
import { useState } from "react";
import ViewUserDetail from "./view.user.detail";
import { deleteUserAPI } from "../../services/api.service";

const UserTable = (props) => {
    const { dataUsers, loadUser, current, pageSize, total, setCurrent, setPageSize } = props;

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
            title: "STT",
            render: (_, record, index) => {
                return <>{index + 1 + (current - 1) * pageSize}</>;
            },
        },
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
    // console.log("Run render 000");

    const onChange = (pagination, filters, sorter, extra) => {
        // doi trang : currrent
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current); //"5" -> 5
            }
        }
        //doi tong phan tu
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize); //"5" -> 5
            }
        }

        console.log("Check onCHange", { pagination, filters, sorter, extra });
    };

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataUsers}
                rowKey={"_id"}
                pagination={{
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: total,
                    showTotal: (total, range) => {
                        return (
                            <div>
                                {range[0]} - {range[1]} trên {total} rows
                            </div>
                        );
                    },
                }}
                onChange={onChange}
            />
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
            <ViewUserDetail
                isUserDetailOpen={isUserDetailOpen}
                setIsUserDetailOpen={setIsUserDetailOpen}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                loadUser={loadUser}
            />
        </>
    );
};

export default UserTable;
