import { Form, Input, Modal, Select } from "antd";
import { colors } from "../../theme/colors";

const { TextArea } = Input;

function FormAddCarrer({ open, onCancel, onSubmit, loading }) {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSubmit(values, form);
  };

  return (
    <Modal
      title="Add Carrer"
      open={open}
      onCancel={onCancel}
      okButtonProps={{ style: { backgroundColor: colors.primary } }}
      onOk={() => form.submit()}
      confirmLoading={loading}
      destroyOnHidden
      okText="Add"
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter title" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="employment_type"
          label="Employment Type"
          rules={[{ required: true, message: "Please select employment type" }]}
        >
          <Select placeholder="Select employment type">
            <Select.Option value="full_time">Full Time</Select.Option>
            <Select.Option value="part_time">Part Time</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default FormAddCarrer;
