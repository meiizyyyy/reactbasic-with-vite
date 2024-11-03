import { Button, Checkbox, Col, Divider, Flex, Form, Input, message, notification, Row } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import FormItem from "antd/es/form/FormItem";
import { loginAPI } from "../services/api.service";
import { useState } from "react";
const LoginPage = () => {
    const [form] = Form.useForm();
    const [isLoginClicked, setIsLoginClicked] = useState(false);
    const navigate = useNavigate();
    //antd onfinish
    const onFinish = async (values) => {
        console.log(values);
        setIsLoginClicked(true);
        const res = await loginAPI(values.email, values.password);
        if (res.data) {
            message.success("Đăng nhập thành công");
            navigate("/");
        } else {
            notification.error({
                message: "Error Login",
                description: JSON.stringify(res.message),
            });
        }
        setIsLoginClicked(false);
    };

    return (
        <>
            <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Form form={form} name="login" layout="vertical" style={{ margin: "10px", paddingTop: "100px", width: "600px" }} onFinish={onFinish}>
                    <Row justify={"center"}>
                        <strong style={{ fontSize: "1.5rem", marginBottom: "20px" }}>Đăng Nhập</strong>
                    </Row>
                    <Row justify={"center"}>
                        <Col xs={24} md={24}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Email!",
                                    },
                                    {
                                        type: "email",
                                        message: "The input is not valid E-mail!",
                                    },
                                ]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify={"center"}>
                        <Col xs={24} md={24}>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Password!",
                                    },
                                ]}>
                                <Input.Password />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row justify={"space-between"}>
                        <FormItem>
                            <Button type="primary" loading={isLoginClicked} onClick={() => form.submit()}>
                                Login
                            </Button>
                        </FormItem>
                        <Form.Item>
                            <Link to="/">Trở về trang chủ</Link>
                        </Form.Item>
                    </Row>
                    <Row justify={"center"}>
                        <Col xs={24} md={24}>
                            <Divider></Divider>
                        </Col>
                    </Row>
                    <Row justify={"center"}>
                        <Col xs={24} md={24}>
                            <Form.Item>
                                <div className="login__signup-nav">
                                    Chưa có tài khoản? <Link to="/register">Đăng ký tại đây</Link>
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    );
};

export default LoginPage;
