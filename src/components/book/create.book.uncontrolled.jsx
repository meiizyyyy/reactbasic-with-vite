import { Category } from "@react-buddy/ide-toolbox";
import { Modal, Button, Checkbox, Form, Input, Select, notification, InputNumber } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/api.service";

const CreateBookUnControl = (props) => {
    const { isModalOpen, setIsModalOpen, loadBook } = props;
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [form] = Form.useForm();

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

    const handleSubmitBtn = async (values) => {
        console.log("Check value form", values);
        const { mainText, author, price, quantity, category } = values;
        if (!selectedFile) {
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
        form.resetFields();
        setIsModalOpen(false);
        setPreview(null);
        setSelectedFile(null);
    };
    return (
        <>
            <Modal
                title="Create Book"
                open={isModalOpen}
                onOk={() => {
                    form.submit();
                }}
                onCancel={resetAndCloseModal}>
                <Form form={form} onFinish={handleSubmitBtn} layout="vertical">
                    <Form.Item
                        label="Tiêu đề"
                        name="mainText"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập Tiêu đề!",
                            },
                        ]}>
                        <Input style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        label="Tác giả"
                        name="author"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên tác giả!",
                            },
                        ]}>
                        <Input style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        label="Giá tiền"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập giá tiền!",
                            },
                        ]}>
                        <InputNumber style={{ width: "100%" }} addonAfter={" đ"} />
                    </Form.Item>
                    <Form.Item
                        label="Số lượng"
                        name="quantity"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập số lượng!",
                            },
                        ]}>
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        label="Thể loại"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn thể loại!",
                            },
                        ]}>
                        <Select placeholder="Lựa chọn thể loại" allowClear>
                            <Option value="Arts">Arts</Option>
                            <Option value="Business">Business</Option>
                            <Option value="Comics">Comics</Option>
                            <Option value="Cooking">Cooking</Option>
                            <Option value="Entertainment">Entertainment</Option>
                            <Option value="History">History</Option>
                            <Option value="Music">Music</Option>
                            <Option value="Sports">Sports</Option>
                            <Option value="Teen">Teen</Option>
                            <Option value="Travel">Travel</Option>
                        </Select>
                    </Form.Item>
                    <FormItem>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
                                        style={{ display: "none" }}
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
                    </FormItem>
                </Form>
            </Modal>
        </>
    );
};

export default CreateBookUnControl;
