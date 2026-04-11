import { useState } from "react";
import {
    Button,
    Grid,
    Popconfirm,
    Space,
    Switch,
    Table,
    Typography,
} from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    RedoOutlined,
} from "@ant-design/icons";
import { Colors } from "../../Themes/Colors";
import FormUpdateCareer from "../../Components/Form/FormUpdateCarrer";
import FormAddCareer from "../../Components/Form/FormAddCarrer";
import { router } from "@inertiajs/react";

const { useBreakpoint } = Grid;
const { Title } = Typography;

function Career({ careers, filter }) {
    const screens = useBreakpoint();
    const isMobile = !screens.md;
    const [loading, setLoading] = useState();
    const [data, setData] = useState(careers.data);
    const [addOpen, setAddOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [saving, setSaving] = useState(false);
    const isTrash = filter.status === "trash";

    const handleAddButton = () => {
        setAddOpen(true);
    };

    const handleAdd = async (values, form) => {
        setLoading(true);
        router.post(route("careers.store"), values, {
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
            onFinish: () => {
                setLoading(false);
            },
        });
    };

    const handleToggleStatus = async (id, checked) => {
        const oldData = [...data];
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

    const handleDelete = async (id) => {
        router.delete(route("careers.destroy", { career: id }));
    };

    const handleRestore = async (id) => {
        router.put(route("careers.restore", { career: id }));
    };

    const handleForceDelete = async (id) => {
        router.delete(route("careers.forceDelete", { career: id }));
    };

    const handleSwitchTrash = (checked) => {
        router.get(route("careers.index"), {
            ...filter,
            status: checked ? "trash" : "active",
            page: 1,
        });
    };

    const handlePagination = (pagination) => {
        router.get(route("careers.index"), {
            ...filter,
            page: pagination.current,
            per_page: pagination.pageSize,
        });
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
                    {!isTrash ? (
                        <>
                            <Button
                                color="primary"
                                variant="solid"
                                shape="circle"
                                size="small"
                                icon={<EditOutlined />}
                                onClick={() => handleEditButton(record)}
                            />
                            <Popconfirm
                                title="Move to trash?"
                                okText="Move"
                                okButtonProps={{ danger: true }}
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
                        </>
                    ) : (
                        <>
                            <Popconfirm
                                title="Restore data?"
                                okText="Restore"
                                cancelText="Cancel"
                                onConfirm={() => handleRestore(record.id)}
                            >
                                <Button
                                    color="primary"
                                    variant="solid"
                                    shape="circle"
                                    size="small"
                                    icon={<RedoOutlined />}
                                />
                            </Popconfirm>
                            <Popconfirm
                                title="Delete data?"
                                okText="Delete"
                                okButtonProps={{ danger: true }}
                                cancelText="Cancel"
                                onConfirm={() => handleForceDelete(record.id)}
                            >
                                <Button
                                    color="danger"
                                    variant="solid"
                                    shape="circle"
                                    size="small"
                                    icon={<DeleteOutlined />}
                                />
                            </Popconfirm>
                        </>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <>
            <Title level={3}>Career Management</Title>
            <div className="flex justify-between py-2">
                <div>
                    <Switch
                        checked={isTrash}
                        onChange={handleSwitchTrash}
                        checkedChildren={<DeleteOutlined />}
                        unCheckedChildren={<DeleteOutlined />}
                        style={{ backgroundColor: isTrash ? "red" : undefined }}
                    />
                </div>
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
                dataSource={careers.data}
                rowKey="id"
                loading={loading}
                scroll={{ x: "max-content" }}
                pagination={{
                    current: careers.current_page,
                    pageSize: careers.per_page,
                    total: careers.total,
                }}
                onChange={handlePagination}
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
