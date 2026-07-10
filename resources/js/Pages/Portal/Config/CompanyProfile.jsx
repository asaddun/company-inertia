import { Button, Card, Form, Input, Upload } from "antd";
import { Colors } from "../../../Themes/Colors";
import { useApp } from "../../../Context/AppContext";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { PlusOutlined } from "@ant-design/icons";

function CompanyProfile({ settings }) {
    const { isMobile } = useApp();
    const [form] = Form.useForm();
    const [logoFile, setLogoFile] = useState(null);
    const [fileList, setFileList] = useState(
        settings.company_logo
            ? [
                  {
                      uid: "-1",
                      name: "logo.png",
                      status: "done",
                      url: settings.company_logo_url,
                  },
              ]
            : [],
    );

    const handleFinish = async (values) => {
        router.patch(route("global.update"), {
            ...values,
            company_logo: logoFile,
        });
    };

    return (
        <Card title="Company Profile" className="w-full">
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    company_name: settings.company_name,
                }}
                style={{ width: isMobile ? "100%" : "50%" }}
                onFinish={handleFinish}
            >
                <Form.Item label="Company Logo">
                    <Upload
                        listType="picture-card"
                        maxCount={1}
                        fileList={fileList}
                        beforeUpload={(file) => {
                            const allowedTypes = [
                                "image/png",
                                "image/jpeg",
                                "image/webp",
                            ];

                            if (!allowedTypes.includes(file.type)) {
                                message.error("Logo harus PNG, JPG, atau WEBP");
                                return Upload.LIST_IGNORE;
                            }

                            if (file.size / 1024 / 1024 > 2) {
                                message.error("Ukuran logo maksimal 2MB");
                                return Upload.LIST_IGNORE;
                            }

                            setLogoFile(file);

                            setFileList([
                                {
                                    uid: file.uid,
                                    name: file.name,
                                    status: "done",
                                    originFileObj: file,
                                    thumbUrl: URL.createObjectURL(file),
                                },
                            ]);

                            return false;
                        }}
                        onRemove={() => {
                            setLogoFile(null);
                            setFileList([]);
                        }}
                    >
                        {fileList.length >= 1 ? null : <PlusOutlined />}
                    </Upload>
                </Form.Item>

                <Form.Item label="Company Name" name="company_name">
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
