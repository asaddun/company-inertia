import { router, usePage } from "@inertiajs/react";
import { Button, Card, Form, Input, Typography } from "antd";
import { Colors } from "../../Themes/Colors";
import { useApp } from "../../Context/AppContext";

const { Title } = Typography;

function FormChangeUsername({ user }) {
    const { errors } = usePage().props;
    const { isMobile } = useApp();
    const [form] = Form.useForm();

    const handleFinish = async (values) => {
        router.patch(route("account.username.update"), values);
        form.resetFields(["current_password"]);
    };

    return (
        <Card title="Change Username" className="w-full">
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    username: user.username,
                }}
                style={{ width: isMobile ? "100%" : "50%" }}
                onFinish={handleFinish}
            >
                <Form.Item
                    label="Current Password"
                    name="current_password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Current Password",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Username",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item className="flex justify-end">
                    <Button
                        htmlType="submit"
                        style={{
                            backgroundColor: Colors.primary,
                            color: "white",
                        }}
                    >
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default FormChangeUsername;
