import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { useState, useEffect } from "react";
import { fetchAllUserAPI } from "../services/api.service";

const UsersPage = () => {
    //lift-ing up state
    const [dataUsers, setDataUsers] = useState([]);
    //empty array
    useEffect(() => {
        console.log("Run useEffect 111");
        loadUser();
    }, []);
    const loadUser = async () => {
        // console.log("Run loadUser");
        const res = await fetchAllUserAPI();
        // console.log("End", res.data);
        setDataUsers(res.data);
    };

    return (
        <div style={{ padding: "20px" }}>
            <UserForm loadUser={loadUser} />
            <UserTable dataUsers={dataUsers} loadUser={loadUser} />
        </div>
    );
};

export default UsersPage;
