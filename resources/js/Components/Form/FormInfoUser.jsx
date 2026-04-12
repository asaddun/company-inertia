import { Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";
import { Colors } from "../../Themes/Colors";

// const ROLE_MAP = [
//     { value: 1, label: "Visitor" },
//     { value: 2, label: "Employee" },
//     { value: 3, label: "Management" },
//     { value: 4, label: "Owner" },
// ];

function FormInfoUser({ open, onCancel, user, onSubmit, loading, levels }) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open && user) {
            form.setFieldsValue({
                name: user.name,
                phone: user.phone,
                bank_account_number: user.bank_account_number,
                level: user.level,
            });
        }
    }, [open, user]);

    return (
        <Modal
            title="User Info"
            open={open}
            onCancel={onCancel}
            okButtonProps={{ style: { backgroundColor: Colors.primary } }}
            onOk={() => form.submit()}
            confirmLoading={loading}
            destroyOnHidden
            okText="Update"
        >
            <Form form={form} layout="vertical" onFinish={onSubmit}>
                <Form.Item name="name" label="Name">
                    <Input />
                </Form.Item>

                <Form.Item name="phone" label="Phone">
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    name="bank_account_number"
                    label="Bank Account Number"
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item name="level" label="Level">
                    <Select options={levels} />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default FormInfoUser;
