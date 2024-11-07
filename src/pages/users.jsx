import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { useState, useEffect } from "react";
import { fetchAllUserAPI } from "../services/api.service";

const UsersPage = () => {
    //lift-ing up state
    const [dataUsers, setDataUsers] = useState([]);

    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);

    //empty array
    useEffect(
        () => {
            // console.log("Run useEffect 111");
            loadUser();
        },
        [current, pageSize],
        //Chỉ khi 2 cái này thay đổi thì Effect mới chạy
    );
    const loadUser = async () => {
        // console.log("Run loadUser");
        const res = await fetchAllUserAPI(current, pageSize);

        // console.log("End", res.data);
        if (res.data) {
            setDataUsers(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
    };

    // console.log("CHeck current", current);
    // console.log("Check pagesize", pageSize);
    return (
        <div style={{ padding: "20px" }}>
            <UserForm loadUser={loadUser} />
            <UserTable dataUsers={dataUsers} loadUser={loadUser} current={current} pageSize={pageSize} total={total} setCurrent={setCurrent} setPageSize={setPageSize} />
        </div>
    );
};

export default UsersPage;
