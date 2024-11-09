import React, { useState } from "react";
import { Button, Input, InputNumber, Modal, notification, Select } from "antd";
import { createBookAPI, handleUploadFile } from "../../services/api.service";
const CreateBookControl = (props) => {
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const { isModalOpen, setIsModalOpen, loadBook } = props;

    console.log(mainText);

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

    const handleOk = async () => {
        if (!setSelectedFile) {
            notification.error({
                message: "Create Book",
                description: "Vui lòng tải lên hình ảnh",
            });
            return;
        }

        const resUpload = await handleUploadFile(selectedFile, "book");
        if (resUpload.data) {
            const thumb = resUpload.data.fileUploaded;
            const res = await createBookAPI(thumb, mainText, author, price, quantity, category);
            if (res.data) {
                notification.success({
                    message: "Create Book",
                    description: "Thêm sách mới thành công",
                });
                resetAndCloseModal();
                await loadBook();
            } else {
                notification.error({
                    message: "Create Book",
                    description: JSON.stringify(res.message),
                });
            }
        }
    };

    const resetAndCloseModal = () => {
        setIsModalOpen(false);
        setMainText("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setSelectedFile(null);
        setPreview(null);
    };

    return (
        <>
            <Modal title="Create Book" open={isModalOpen} onOk={handleOk} onCancel={resetAndCloseModal}>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <span>Tiêu đề</span>
                    <Input
                        value={mainText}
                        onChange={(event) => {
                            setMainText(event.target.value);
                        }}
                    />
                    <span>Tác giả</span>
                    <Input
                        value={author}
                        onChange={(event) => {
                            setAuthor(event.target.value);
                        }}
                    />
                    <span>Giá tiền</span>
                    <InputNumber
                        value={price}
                        addonAfter={" đ"}
                        onChange={(event) => {
                            setPrice(event);
                        }}
                    />
                    <span>Số lượng</span>
                    <InputNumber
                        value={quantity}
                        onChange={(event) => {
                            setQuantity(event);
                        }}
                    />
                    <span>Thể loại</span>
                    <Select
                        defaultValue="Arts"
                        style={{
                            width: 120,
                        }}
                        value={category}
                        onChange={(value) => {
                            setCategory(value);
                        }}
                        options={[
                            {
                                value: "Arts",
                                label: "Arts",
                            },
                            {
                                value: "Business",
                                label: "Business",
                            },
                            {
                                value: "Comics",
                                label: "Comics",
                            },
                            {
                                value: "Cooking",
                                label: "Cooking",
                            },
                            {
                                value: "Entertainment",
                                label: "Entertainment",
                            },
                            {
                                value: "History",
                                label: "History",
                            },
                            {
                                value: "Music",
                                label: "Music",
                            },
                            {
                                value: "Sports",
                                label: "Sports",
                            },
                            {
                                value: "Teen",
                                label: "Teen",
                            },
                            {
                                value: "Travel",
                                label: "Travel",
                            },
                        ]}
                    />
                    <div>
                        <span>Ảnh</span>
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
                                Upload Image
                            </label>
                            <input
                                type="file"
                                name=""
                                id="btn-upload"
                                hidden
                                onChange={handleOnChangeFile}
                                onClick={(event) => {
                                    event.target.value = null;
                                }}
                            />
                        </div>

                        {preview && (
                            <>
                                <div
                                    style={{
                                        marginTop: "10px",
                                        marginBottom: "55px",
                                        height: "300px",
                                        width: "250px",
                                    }}>
                                    <p>Preview</p>
                                    <img height={"100%"} width={"100%"} src={preview} alt="" />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default CreateBookControl;
