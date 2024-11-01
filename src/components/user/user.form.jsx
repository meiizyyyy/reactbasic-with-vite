import Input from "antd/es/input/Input";
import { Button, Flex, notification, Modal } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.service";

const UserForm = (props) => {
    const { loadUser } = props;
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmitBtn = async () => {
        const res = await createUserAPI(fullName, email, password, phone);
        if (res.data) {
            notification.success({
                message: "Create User",
                description: "Tạo user thành công",
            });
            resetAndCloseModal();
            await loadUser();
        } else {
            notification.error({
                message: "Create User",
                description: JSON.stringify(res.message),
            });
        }
    };

    const resetAndCloseModal = () => {
        setIsModalOpen(false);
        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
    };

    return (
        <div className="user-form" style={{ margin: "20px 30px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Users</h3>
                <Button
                    type="primary"
                    onClick={() => {
                        setIsModalOpen(true);
                    }}>
                    Create
                </Button>
            </div>

            <Modal
                maskClosable={false}
                title="Create User"
                okText={"Create"}
                open={isModalOpen}
                onOk={() => handleSubmitBtn()}
                onCancel={() => {
                    resetAndCloseModal();
                }}>
                <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
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
                </div>
            </Modal>
        </div>
    );
};

export default UserForm;
