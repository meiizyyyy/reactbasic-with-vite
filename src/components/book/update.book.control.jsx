import { Input, InputNumber, Modal, notification, Select } from "antd";
import React, { useEffect, useState } from "react";
import { handleUploadFile, updateBookAPI } from "../../services/api.service";

const UpdateBookControl = (props) => {
    const { isModalUpdateOpen, setIsModalUpdateOpen, loadBook, dataUpdate, setDataUpdate } = props;
    const [id, setId] = useState("");
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    // const [thumbnail, setThumbnail] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

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

    const updateBook = async (newThumbnail) => {
        const res = await updateBookAPI(id, newThumbnail, mainText, author, price, quantity, category);
        if (res.data) {
            resetAndCloseModal();
            loadBook();
            notification.success({
                message: "Update Book",
                description: "Cập nhật sách thành công",
            });
        } else {
            notification.error({
                message: "Update Book",
                description: JSON.stringify(res.message),
            });
        }
    };

    const handleSubmitBtn = async () => {
        if (!selectedFile && !preview) {
            notification.error({
                message: "Update book",
                description: "Vui lòng tải lên hình ảnh",
            });
            return;
        }

        let newThumbnail = "";
        if (preview && !selectedFile) {
            newThumbnail = dataUpdate.thumb;
        } else {
            const resUpload = await handleUploadFile(selectedFile, "book");
            if (resUpload.data) {
                newThumbnail = resUpload.data.fileUploaded;
            } else {
                notification.error({
                    message: "Upload file",
                    description: JSON.stringify(resUpload.message),
                });
                return;
            }
        }
        updateBook(newThumbnail);
    };

    //render
    useEffect(() => {
        console.log("Check dataUpdate props", dataUpdate);
        if (dataUpdate) {
            setId(dataUpdate._id);
            setMainText(dataUpdate.mainText);
            setAuthor(dataUpdate.author);
            setPrice(dataUpdate.price);
            setQuantity(dataUpdate.quantity);
            setCategory(dataUpdate.category);
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`);
        }
    }, [dataUpdate]);

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setId("");
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
            <Modal
                title="Update Book"
                open={isModalUpdateOpen}
                onOk={handleSubmitBtn}
                onCancel={() => {
                    setIsModalUpdateOpen(false);
                }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <span>ID</span>
                    <Input value={id} disabled />
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
                            setPrice(event.target.value);
                        }}
                    />
                    <span>Số lượng</span>
                    <InputNumber
                        style={{ width: "100%" }}
                        value={quantity}
                        onChange={(event) => {
                            setQuantity(event.target.value);
                        }}
                    />
                    <span>Thể loại</span>
                    <Select
                        defaultValue="Arts"
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
                    <span>Ảnh</span>
                    <div
                    // style={{
                    //     marginTop: "10px",
                    //     height: "250px",
                    //     width: "250px",
                    //     border: "solid 1px #ccc",
                    //     objectFit: "contain",
                    // }}
                    >
                        {preview && (
                            <>
                                <div
                                    style={{
                                        marginTop: "10px",
                                        marginBottom: "55px",
                                        height: "300px",
                                        width: "250px",
                                    }}>
                                    <img height={"100%"} width={"100%"} src={preview} alt="" />
                                </div>
                            </>
                        )}
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
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default UpdateBookControl;
