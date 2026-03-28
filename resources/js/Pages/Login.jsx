import { useEffect, useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
// import { useAuth } from "../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
import { Colors } from "../Themes/Colors";
// import { useLoading } from "../contexts/LoadingContext";
// import { Logos } from "../assets";

const { Title } = Typography;

function Login({ login, user }) {
    // const { login, user } = useAuth();
    // const navigate = useNavigate();
    // const { loading, setLoading } = useLoading();
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     if (user) navigate("/office");
    // }, [user]);

    const onFinish = async (values) => {
        if (loading) return;
        setLoading(true);
        console.log(values);

        try {
            await login(values);
        } catch (err) {
            console.log("Login gagal", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col justify-center items-center">
            {/* Logo */}
            <div className="mb-8">
                {/* <img
                    src={Logos.main}
                    alt="Dabellyou logo"
                    className="mx-auto"
                    style={{
                        height: 100,
                        width: 100,
                        objectFit: "contain",
                    }}
                /> */}

                <Title level={2} className="text-center">
                    Sign in to your account
                </Title>
            </div>

            {/* Form */}
            <Form
                name="login"
                layout="vertical"
                onFinish={onFinish}
                style={{ width: 300 }}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username",
                        },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined />}
                        placeholder="Username"
                        autoFocus
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password",
                        },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ backgroundColor: Colors.primary }}
                        block
                        loading={loading}
                    >
                        {loading ? "Loading..." : "Login"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;
