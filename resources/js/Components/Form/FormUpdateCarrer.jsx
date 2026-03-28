import { Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";
import { colors } from "../../theme/colors";

const { TextArea } = Input;

function FormUpdateCarrer({ open, onCancel, data, onSubmit, loading }) {
  const [form] = Form.useForm();

  const Employment_Type = [
    { value: "full_time", label: "Full Time" },
    { value: "part_time", label: "Part Time" },
  ];

  useEffect(() => {
    if (open && data) {
      form.setFieldsValue({
        title: data.title,
        description: data.description,
        employment_type: data.employment_type,
      });
    }
  }, [open, data]);

  return (
    <Modal
      title="Edit Carrer"
      open={open}
      onCancel={onCancel}
      okButtonProps={{ style: { backgroundColor: colors.primary } }}
      onOk={() => form.submit()}
      confirmLoading={loading}
      destroyOnHidden
      okText="Save"
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item name="title" label="Title">
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item name="employment_type" label="Employement Type">
          <Select options={Employment_Type} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default FormUpdateCarrer;
