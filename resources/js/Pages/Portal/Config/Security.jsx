import { Button, Form, Input, Typography, Card } from "antd";
import { useApp } from "../../../Context/AppContext";
import { Colors } from "../../../Themes/Colors";
import { usePage } from "@inertiajs/react";

function Security({ settings }) {
    const { isMobile } = useApp();
    const [form] = Form.useForm();

    const handleFinish = async (values) => {
        router.patch(route("global.update"), values);
    };

    return (
        <div className="flex flex-col gap-2">
            <Card title="Default Password" className="w-full">
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        default_password: settings.default_password,
                    }}
                    style={{ width: isMobile ? "100%" : "50%" }}
                    onFinish={handleFinish}
                >
                    <Form.Item label="Default Password" name="default_password">
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
        </div>
    );
}

export default Security;
