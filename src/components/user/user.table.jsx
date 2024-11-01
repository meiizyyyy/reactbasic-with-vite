import { Space, Table, Tag } from "antd";

const UserTable = (props) => {
    const { dataUsers } = props;
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

    // loadUser(); ném lên useEffect để không re-render liên tục
    console.log("Run render 000");
    return <Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />;
};

export default UserTable;
