import { useEffect, useMemo } from "react";
import { Colors } from "../../Themes/Colors";
import { Button, Form, Input, InputNumber } from "antd";
import { router } from "@inertiajs/react";

function FormReport({ selectedDate, types, selectedType, jobFields, report }) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (report) {
            form.setFieldsValue({
                ...report,
            });
        }
    }, []);

    // Set tanggal & tipe kalau berubah dari parent
    useEffect(() => {
        form.setFieldsValue({
            work_date: selectedDate.format("YYYY-MM-DD"),
            job_type_id: selectedType,
        });
    }, [selectedDate, selectedType]);

    const currentType = useMemo(() => {
        return types.find((t) => t.id === selectedType);
    }, [types, selectedType]);

    const dynamicFields = useMemo(() => {
        if (!currentType) return [];

        return currentType.form_fields
            .map((fieldKey) => {
                const fieldConfig = jobFields.find(
                    (field) => field.value === fieldKey,
                );

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
            })
            .filter(Boolean); // 👈 biar null kehapus
    }, [currentType, jobFields]);

    const renderInput = (field) => {
        if (field.type === "number") {
            return <InputNumber style={{ width: "100%" }} min={1} />;
        }

        return <Input />;
    };

    const handleFinish = async (values) => {
        router.post(route("reports.store"), values);
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

                {/* Dynamic Fields */}
                {dynamicFields.map((field) => {
                    if (!field) return null;

                    return (
                        <Form.Item
                            key={field.key}
                            name={field.key}
                            label={field.label}
                            rules={[
                                {
                                    required: true,
                                    message: `Please enter ${field.label}`,
                                },
                            ]}
                        >
                            {renderInput(field)}
                        </Form.Item>
                    );
                })}

                <Form.Item label={null}>
                    <Button
                        style={{
                            backgroundColor: Colors.primary,
                            color: "white",
                        }}
                        htmlType="submit"
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default FormReport;
