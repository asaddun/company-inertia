import { Form, Input, Modal } from "antd";
import { colors } from "../../theme/colors";

function FormAddMember({ open, onCancel, onSubmit, loading }) {
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    await onSubmit(values); // kirim ke parent
    form.resetFields(); // reset di child
  };

  return (
    <Modal
      title="Add Member"
      open={open}
      destroyOnHidden
      onCancel={onCancel}
      okButtonProps={{ style: { backgroundColor: colors.primary } }}
      onOk={() => form.submit()}
      confirmLoading={loading}
      okText="Add"
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default FormAddMember;
