import { Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";
import { colors } from "../../theme/colors";

const ROLE_MAP = [
  { value: 1, label: "Visitor" },
  { value: 2, label: "Employee" },
  { value: 3, label: "Management" },
  { value: 4, label: "Owner" },
];

function FormModalMember({ open, onCancel, user, onSubmit, loading }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && user) {
      form.setFieldsValue({
        name: user.name,
        wage_per_component: user.wage_per_component,
        role: user.role,
      });
    }
  }, [open, user]);

  return (
    <Modal
      title="Edit Member"
      open={open}
      onCancel={onCancel}
      okButtonProps={{ style: { backgroundColor: colors.primary } }}
      onOk={() => form.submit()}
      confirmLoading={loading}
      destroyOnHidden
      okText="Save"
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>

        <Form.Item name="wage_per_component" label="Wage per Component">
          <Input />
        </Form.Item>

        <Form.Item name="role" label="Role">
          <Select options={ROLE_MAP} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default FormModalMember;
