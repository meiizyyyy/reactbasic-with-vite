import Input from "antd/es/input/Input";
import { Button, Flex } from "antd";
import { useState } from "react";

const UserForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    console.log("check var:", fullName, email, password, phone);

    const handleClickBtn = () => {
        console.log({ fullName, email, password, phone });
    };
    return (
        <div className="user-form" style={{ margin: "20px 30px" }}>
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>Full name</span>
                    <Input
                        // value={"fullName"} set gia tri
                        value={fullName}
                        onChange={(event) => {
                            setFullName(event.target.value);
                        }}
                    />
                </div>
                <div>
                    <span>Email</span>
                    <Input
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                </div>
                <div>
                    <span>Password</span>
                    <Input.Password
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                </div>
                <div>
                    <span>Phone number</span>
                    <Input
                        value={phone}
                        onChange={(event) => {
                            setPhone(event.target.value);
                        }}
                    />
                </div>
                <div>
                    <Button type="primary" onClick={handleClickBtn}>
                        Create
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UserForm;
