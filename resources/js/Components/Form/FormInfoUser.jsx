import { Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";
import { Colors } from "../../Themes/Colors";

function FormInfoUser({ open, onCancel, onSubmit, user, levels }) {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        onSubmit(values, form);
    };

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
            destroyOnHidden
            okText="Update"
        >
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item name="name" label="Name">
                    <Input disabled />
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
