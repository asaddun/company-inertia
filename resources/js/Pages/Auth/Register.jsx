import { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined, IdcardOutlined } from "@ant-design/icons";
import { Colors } from "../../Themes/Colors";
import { Link, router, usePage } from "@inertiajs/react";
// import { Logos } from "../assets";

const { Title } = Typography;

function Register() {
    const [loading, setLoading] = useState(false);
    const { auth, errors } = usePage().props;

    const onFinish = async (values) => {
        if (loading) return;

        router.post(route("register.store"), values, {
            onStart: () => {
                // Bisa tambahkan loading state di sini jika perlu
                setLoading(true);
            },
            onError: (errors) => {
                console.error("Login Failed:", errors);
            },
            onFinish: () => {
                setLoading(false);
            },
        });
    };

    return (
        <div className="flex-1 flex flex-col justify-center items-center">
            <Link href="/">
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
                <Title
                    level={2}
                    className="text-center"
                    style={{ color: Colors.primary }}
                >
                    Company
                </Title>
            </Link>

            <div className="mb-8">
                <Title level={2} className="text-center">
                    Register account
                </Title>
            </div>

            {/* Form */}
            <Form
                name="register"
                layout="vertical"
                onFinish={onFinish}
                style={{ width: 300 }}
            >
                <Form.Item
                    name="identity_number"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Identity Number",
                        },
                    ]}
                    help={errors.identity_number}
                >
                    <Input
                        prefix={<IdcardOutlined />}
                        placeholder="Identity Number"
                        autoFocus
                    />
                </Form.Item>

                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Full Name",
                        },
                    ]}
                    help={errors.name}
                >
                    <Input
                        prefix={<IdcardOutlined />}
                        placeholder="Full Name"
                    />
                </Form.Item>

                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Username",
                        },
                    ]}
                    help={errors.username}
                >
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Password",
                        },
                    ]}
                    help={errors.password}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item
                    name="password_confirmation"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Password again",
                        },
                    ]}
                    help={errors.password_confirmation}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Re-enter Password"
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
                        {loading ? "Loading..." : "Register"}
                    </Button>
                </Form.Item>
            </Form>
            <div>
                Already have an account?{" "}
                <Link href={route("login")}>Login</Link>
            </div>
        </div>
    );
}

export default Register;
