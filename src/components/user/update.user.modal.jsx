import { useEffect, useState } from "react";
import Input from "antd/es/input/Input";
import { Button, Flex, notification, Modal } from "antd";
import { createUserAPI, updateUserAPI } from "../../services/api.service";

const UpdateUserModal = (props) => {
    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");

    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props;

    // dataUpdate != prev => ueff run
    useEffect(() => {
        console.log("check data update props", dataUpdate);
        if (dataUpdate) {
            setId(dataUpdate._id);
            setFullName(dataUpdate.fullName);
            setPhone(dataUpdate.phone);
        }
    }, [dataUpdate]);

    const handleSubmitBtn = async () => {
        const res = await updateUserAPI(id, fullName, phone);
        if (res.data) {
            notification.success({
                message: "Update User",
                description: "Cập nhật user thành công",
            });
            resetAndCloseModal();
            await loadUser();
        } else {
            notification.error({
                message: "Update User",
                description: JSON.stringify(res.message),
            });
        }
    };

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setFullName("");
        setId("");
        setPhone("");
        setDataUpdate(null);
    };

    return (
        <Modal
            maskClosable={false}
            title="Update User"
            okText={"Update"}
            open={isModalUpdateOpen}
            onOk={() => handleSubmitBtn()}
            onCancel={() => {
                resetAndCloseModal();
            }}>
            <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
                <div>
                    <span>ID</span>
                    <Input value={id} disabled />
                </div>

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
    );
};

export default UpdateUserModal;
