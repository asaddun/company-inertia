import { router, usePage } from "@inertiajs/react";
import { Button, Card, Form, Input, Typography } from "antd";
import { Colors } from "../../Themes/Colors";
import { useApp } from "../../Context/AppContext";

const { Title } = Typography;

function FormChangePassword() {
    const { errors } = usePage().props;
    const { isMobile } = useApp();
    const [form] = Form.useForm();

    const handleFinish = async (values) => {
        router.patch(route("account.password.update"), values, {
            onSuccess: () => {
                form.resetFields();
            },
        });
        form.resetFields(["current_password"]);
    };

    return (
        <Card title="Change Password" className="w-full">
            <Form
                form={form}
                layout="vertical"
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
                    label="New Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your New Password",
                        },
                    ]}
                    help={errors.password}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Confirm New Password"
                    name="password_confirmation"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Confirm New Password",
                        },
                    ]}
                    help={errors.password_confirmation}
                >
                    <Input.Password />
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

export default FormChangePassword;
