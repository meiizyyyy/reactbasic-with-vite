import React, { useState } from "react";
import { Drawer, Button, notification } from "antd";
import { handleUploadFile, updateUserAvatarAPI } from "../../services/api.service";
const ViewUserDetail = (props) => {
    const { dataDetail, setDataDetail, isUserDetailOpen, setIsUserDetailOpen, loadUser } = props;
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    const handleOnChangeFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }

        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpdateUserAvatar = async () => {
        //upload

        const resUpload = await handleUploadFile(selectedFile, "avatar");

        console.log("Check ", resUpload);
        if (resUpload.data) {
            //success
            const newAvatar = resUpload.data.fileUploaded;
            console.log("Check new", newAvatar);

            const resUpdateAvatar = await updateUserAvatarAPI(newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone);
            if (resUpdateAvatar.data) {
                setIsUserDetailOpen(false);
                setSelectedFile(null);
                setPreview(null);
                await loadUser();
                notification.success({
                    message: "Update User Avatar",
                    description: "Cập nhật avatar thành công",
                });
            } else {
                notification.error({
                    message: "Update User Avatar",
                    description: JSON.stringify(resUpdateAvatar.message),
                });
            }
        } else {
            notification.error({
                message: "Error Upload Files",
                description: JSON.stringify(resUpload.message),
            });
        }
    };

    console.log("CHeck", preview);
    return (
        <>
            <Drawer
                width={"30vw"}
                title="User Detail"
                open={isUserDetailOpen}
                onClose={() => {
                    setIsUserDetailOpen(false);
                    setDataDetail(null);
                }}>
                {dataDetail ? (
                    <>
                        <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
                            <div>
                                <p>Avatar: </p>

                                <div
                                    style={{
                                        marginTop: "10px",
                                        height: "250px",
                                        width: "250px",
                                        border: "solid 1px #ccc",
                                        objectFit: "cover",
                                    }}>
                                    <img height={"100%"} width={"100%"} src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} alt="" />
                                </div>

                                <div>
                                    <label
                                        htmlFor="btn-upload"
                                        style={{
                                            display: "block",
                                            width: "fit-content",
                                            marginTop: "15px",
                                            padding: "10px",
                                            background: "orange",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                        }}>
                                        Upload Avatar
                                    </label>
                                    <input type="file" name="" id="btn-upload" hidden onChange={handleOnChangeFile} />
                                </div>

                                {preview && (
                                    <>
                                        <div
                                            style={{
                                                marginTop: "10px",
                                                marginBottom: "55px",
                                                height: "250px",
                                                width: "250px",
                                            }}>
                                            <p>Preview</p>
                                            <img height={"100%"} width={"100%"} src={preview} alt="" />
                                            <Button type="primary" onClick={handleUpdateUserAvatar}>
                                                Save
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div>
                                <span>ID: {dataDetail._id}</span>
                            </div>
                            <div>
                                <span>Full name: {dataDetail.fullName} </span>
                            </div>
                            <div>
                                <span>Email: {dataDetail.email} </span>
                            </div>
                            <div>
                                <span>Phone number: {dataDetail.phone} </span>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <p>Không có dữ liệu</p>
                    </>
                )}
            </Drawer>
        </>
    );
};

export default ViewUserDetail;
