import { Form, Input, Modal } from "antd";
import { Colors } from "../../Themes/Colors";

function FormAddMember({ open, onCancel, onSubmit }) {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        onSubmit(values, form); // kirim ke parent
    };

    return (
        <Modal
            title="Add Member"
            open={open}
            destroyOnHidden
            onCancel={onCancel}
            okButtonProps={{ style: { backgroundColor: Colors.primary } }}
            onOk={() => form.submit()}
            okText="Add"
        >
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default FormAddMember;
