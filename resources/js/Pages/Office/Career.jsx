import { useEffect, useState } from "react";
import {
    Button,
    Grid,
    Popconfirm,
    Space,
    Switch,
    Table,
    Typography,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Colors } from "../../Themes/Colors";
import FormUpdateCareer from "../../Components/Form/FormUpdateCarrer";
import FormAddCareer from "../../Components/Form/FormAddCarrer";
import { router } from "@inertiajs/react";

const { useBreakpoint } = Grid;
const { Title } = Typography;

function Career({ careers }) {
    const screens = useBreakpoint();
    const isMobile = !screens.md;
    const [loading, setLoading] = useState();
    const [data, setData] = useState(careers);
    const [addOpen, setAddOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [saving, setSaving] = useState(false);

    const handleAddButton = () => {
        setAddOpen(true);
    };

    const handleAdd = async (values, form) => {
        router.post(route("careers.add"), values, {
            onSuccess: () => {
                form.resetFields();
                setAddOpen(false);
            },
            onError: (errors) => {
                const fieldErrors = Object.keys(errors).map((key) => ({
                    name: key,
                    errors: [errors[key]],
                }));

                form.setFields(fieldErrors);
            },
        });
    };

    const handleToggleStatus = async (id, checked) => {
        // 1. Simpan data lama (untuk rollback)
        const oldData = [...data];
        // 2. Update UI langsung (smooth)
        setData((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, is_active: checked ? 1 : 0 } : item,
            ),
        );
        setSaving(id);
        router.put(
            route("careers.update", { career: id }),
            { is_active: checked ? 1 : 0 },
            {
                onSuccess: () => {},
                onError: (errors) => {
                    setData(oldData);
                },
                onFinish: () => {
                    setSaving(false);
                },
            },
        );
    };

    const handleEditButton = (data) => {
        setSelectedData(data);
        setUpdateOpen(true);
    };

    const handleUpdate = async (values, form) => {
        router.put(
            route("careers.update", { career: selectedData.id }),
            values,
            {
                onSuccess: () => {
                    form.resetFields();
                    setUpdateOpen(false);
                },
                onError: (errors) => {
                    const fieldErrors = Object.keys(errors).map((key) => ({
                        name: key,
                        errors: [errors[key]],
                    }));

                    form.setFields(fieldErrors);
                },
            },
        );
    };

    const columns = [
        {
            title: "No",
            dataIndex: "no",
            key: "no",
            render: (_, __, index) => index + 1,
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Status",
            dataIndex: "is_active",
            key: "is_active",
            render: (is_active, record) => (
                <Switch
                    checked={is_active === 1}
                    // checkedChildren="I"
                    // unCheckedChildren="O"
                    loading={saving === record.id}
                    onChange={(checked) =>
                        handleToggleStatus(record.id, checked)
                    }
                />
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space>
                    <Button
                        color="primary"
                        variant="solid"
                        shape="circle"
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => handleEditButton(record)}
                    />
                    <Popconfirm
                        title="Delete Data?"
                        okText="Delete"
                        cancelText="Cancel"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button
                            color="danger"
                            variant="solid"
                            shape="circle"
                            size="small"
                            icon={<DeleteOutlined />}
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    return (
        <>
            <div className="flex justify-between px-2">
                <Title level={3}>Career Management</Title>
                <Button
                    variant="solid"
                    style={{ backgroundColor: Colors.primary, color: "#FFF" }}
                    onClick={handleAddButton}
                    icon={<PlusOutlined />}
                >
                    Add
                </Button>
            </div>

            <Table
                size={isMobile ? "small" : "middle"}
                columns={columns}
                dataSource={careers}
                rowKey="id"
                loading={loading}
                scroll={{ x: "max-content" }}
            />

            <FormAddCareer
                open={addOpen}
                loading={saving}
                onCancel={() => setAddOpen(false)}
                onSubmit={handleAdd}
            />

            <FormUpdateCareer
                open={updateOpen}
                data={selectedData}
                loading={saving}
                onCancel={() => setUpdateOpen(false)}
                onSubmit={handleUpdate}
            />
        </>
    );
}

export default Career;
