import { Button, Input, Form, notification } from "antd";
import { registerUserAPI } from "../services/api.service";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [form] = Form.useForm();

    const navigate = useNavigate();

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
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        maxWidth: "1024px",
                        margin: "0 auto",
                        paddingTop: "100px",
                    }}>
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

                    <Button type="primary" onClick={() => form.submit()}>
                        Register
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default RegisterPage;
