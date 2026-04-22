import { Form, Input, Modal, Select } from "antd";
import { Colors } from "../../Themes/Colors";
import { useEffect } from "react";

function FormJobType({ data, open, onCancel, onSubmit, optionsFields }) {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        onSubmit(values, data, form);
    };

    useEffect(() => {
        if (open && data) {
            form.setFieldsValue({
                name: data.name,
                unit_label: data.unit_label,
                form_fields: data.form_fields,
            });
        }
    }, [open, data]);

    return (
        <div>
            <Modal
                title={`${data ? "Edit" : "Add"} Job Type`}
                open={open}
                onCancel={onCancel}
                okButtonProps={{ style: { backgroundColor: Colors.primary } }}
                onOk={() => form.submit()}
                destroyOnHidden
                okText="Save"
            >
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            { required: true, message: "Please enter name" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item name="unit_label" label="Unit Label">
                        <Input />
                    </Form.Item>

                    <Form.Item name="form_fields" label="Form Fields">
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: "100%" }}
                            placeholder="Please select"
                            options={optionsFields}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default FormJobType;
