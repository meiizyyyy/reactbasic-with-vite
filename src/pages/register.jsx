import { Button, Input, Form, notification, Row, Col, Divider } from "antd";
import { registerUserAPI } from "../services/api.service";
import { Link, useNavigate } from "react-router-dom";
import "./pages.css";

const RegisterPage = () => {
    const [form] = Form.useForm();

    const navigate = useNavigate();

    //antd onfinish
    const onFinish = async (values) => {
        console.log(values);

        //call api
        const res = await registerUserAPI(values.fullName, values.email, values.password, values.phone);
        if (res.data) {
            notification.success({
                message: "Register user",
                description: "Đăng ký người dùng thành công",
            });
            navigate("/login");
        } else {
            notification.error({
                message: "Register user",
                description: JSON.stringify(res.message),
            });
        }
    };
    return (
        <>
            <Form   
                form={form}
                layout="vertical"
                name="basic"
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                style={{ margin: "10px", paddingTop: "100px" }}>
                <Row justify={"center"}>
                    <strong style={{ fontSize: "1.5rem", marginBottom: "20px" }}>Đăng ký tài khoản</strong>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username!",
                                },
                            ]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Full Name"
                            name="fullName"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Name!",
                                },
                            ]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Email!",
                                },
                            ]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={8}>
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
                <Row justify={"center"}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Phone Number"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    pattern: new RegExp(/\d+/g),
                                    message: "Wrong format!",
                                },
                            ]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify={"center"}>
                    <Col xs={24} md={8}>
                        <Button type="primary" onClick={() => form.submit()}>
                            Register
                        </Button>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={8}>
                        <Divider></Divider>
                        <div className="register__auth-nav">
                            <p>Đã có tài khoản? </p>
                            <Link to="/login">Đăng nhập tại đây</Link>
                        </div>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default RegisterPage;
