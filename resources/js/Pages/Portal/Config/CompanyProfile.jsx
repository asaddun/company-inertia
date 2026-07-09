import { Button, Card, Form, Input } from "antd";
import { Colors } from "../../../Themes/Colors";
import { useApp } from "../../../Context/AppContext";
import { useState } from "react";
import { router } from "@inertiajs/react";

function CompanyProfile({ settings }) {
    const { isMobile } = useApp();
    const [form] = Form.useForm();

    const handleFinish = async (values) => {
        // router.patch(route("account.info.update"), values);
    };

    return (
        <Card title="Company Profile" className="w-full">
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    name: settings.company_name,
                }}
                style={{ width: isMobile ? "100%" : "50%" }}
                onFinish={handleFinish}
            >
                <Form.Item label="Company Name" name="name">
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

export default CompanyProfile;
