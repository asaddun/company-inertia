import { useEffect, useMemo } from "react";
import { colors } from "../../theme/colors";
import { Button, Form, Input, InputNumber } from "antd";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../contexts/LoadingContext";

function FormReport({
  selectedDate,
  types,
  selectedType,
  jobFields,
  isEdit,
  reportData,
}) {
  const [form] = Form.useForm();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { loading, setLoading } = useLoading();

  const currentType = useMemo(() => {
    return types.find((t) => t.id === selectedType);
  }, [types, selectedType]);

  // Set tanggal & tipe kalau berubah dari parent
  useEffect(() => {
    form.setFieldsValue({
      work_date: selectedDate,
      job_type_id: selectedType,
    });
  }, [selectedDate, selectedType]);

  // Set default wage saat user / tipe berubah
  useEffect(() => {
    if (!user || !currentType) return;

    form.setFieldsValue({
      wage_per_item:
        user.wage_per_component > 0
          ? user.wage_per_component
          : currentType.wage_per_item,
    });
  }, [user, currentType]);

  useEffect(() => {
    if (isEdit && reportData) {
      form.setFieldsValue({
        // work_date: reportData.work_date,
        // job_type_id: reportData.job_type_id,
        // wage_per_item: reportData.wage_per_item,
        ...reportData,
      });
    }
  }, [reportData]);

  const dynamicFields = useMemo(() => {
    if (!currentType) return [];

    return currentType.form_fields.map((fieldKey) => {
      const fieldConfig = jobFields[fieldKey];

      if (!fieldConfig) return null;

      const unitLabel =
        fieldKey === "quantity" && currentType.unit_label
          ? ` ${currentType.unit_label.charAt(0).toUpperCase()}${currentType.unit_label.slice(1)}`
          : "";

      return {
        key: fieldKey,
        label: `${fieldConfig.label}${unitLabel}`,
        type: fieldConfig.type,
      };
    });
  }, [currentType, jobFields]);

  const renderInput = (field) => {
    if (field.type === "number") {
      return <InputNumber style={{ width: "100%" }} min={1} />;
    }

    return <Input />;
  };

  const handleFinish = async (values) => {
    setLoading(true);
    let payload;

    if (!isEdit) {
      payload = {
        ...values,
        work_date: values.work_date
          ? values.work_date.format("YYYY-MM-DD")
          : null,
      };
    } else {
      payload = {
        ...values,
      };
    }

    try {
      const res = await api.post("/reports", payload);
      navigate("/office/reports/me", {
        state: {
          flash: {
            type: "success",
            text: res.data.message,
          },
        },
        replace: true,
      });
      return;
    } catch (error) {
      navigate("/office/reports/me", {
        state: {
          flash: {
            type: "error",
            text: error.response?.data?.message,
          },
        },
        replace: true,
      });
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="job_type_id" hidden>
          <Input />
        </Form.Item>

        <Form.Item name="work_date" hidden>
          <Input />
        </Form.Item>

        <Form.Item name="wage_per_item" hidden>
          <Input />
        </Form.Item>

        {/* Dynamic Fields */}
        {dynamicFields.map((field) => {
          if (!field) return null;

          return (
            <Form.Item
              key={field.key}
              name={field.key}
              label={field.label}
              rules={[
                { required: true, message: `Please enter ${field.label}` },
              ]}
            >
              {renderInput(field)}
            </Form.Item>
          );
        })}

        <Form.Item label={null}>
          <Button
            style={{ backgroundColor: colors.primary, color: "white" }}
            htmlType="submit"
            disabled={loading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default FormReport;
