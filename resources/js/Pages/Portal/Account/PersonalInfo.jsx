import { Button, Card, Form, Input } from "antd";
import { Colors } from "../../../Themes/Colors";
import { useApp } from "../../../Context/AppContext";
import { useState } from "react";
import { router } from "@inertiajs/react";

function PersonalInfo({ user }) {
    const { isMobile } = useApp();
    const [form] = Form.useForm();

    const handleFinish = async (values) => {
        router.patch(route("account.info.update"), values);
    };

    return (
        <Card title="Personal Information" className="w-full">
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    identity_number: user.identity_number,
                    name: user.name,
                    phone: user.phone,
                    bank_account_number: user.bank_account_number,
                }}
                style={{ width: isMobile ? "100%" : "50%" }}
                onFinish={handleFinish}
            >
                <Form.Item
                    label="ID Number"
                    name="identity_number"
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: "Please input your ID Number",
                    //     },
                    // ]}
                >
                    <Input
                        disabled={user.identity_number}
                        inputMode="numeric"
                    />
                </Form.Item>

                <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Full Name",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Phone" name="phone">
                    <Input inputMode="numeric" />
                </Form.Item>

                <Form.Item label="Bank Account" name="bank_account_number">
                    <Input inputMode="numeric" />
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

export default PersonalInfo;
