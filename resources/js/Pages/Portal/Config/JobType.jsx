import {
    Table,
    InputNumber,
    Button,
    message,
    Typography,
    Grid,
    Space,
    Popconfirm,
} from "antd";
import { useEffect, useState } from "react";
import { Colors } from "../../../Themes/Colors";
import { useApp } from "../../../Context/AppContext";
import { router } from "@inertiajs/react";
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    RedoOutlined,
    SaveOutlined,
} from "@ant-design/icons";
import Filter from "../../../Components/Filter";
import FormJobType from "../../../Components/Form/FormJobType";

const { Title } = Typography;

function JobType({ jobTypes, filter, defaultFilters, filterKeys, fields }) {
    const [data, setData] = useState(jobTypes.data);
    const [selectedData, setSelectedData] = useState(null);
    const [original, setOriginal] = useState(jobTypes.data);
    const [dirtyRows, setDirtyRows] = useState(new Set());
    const [formOpen, setFormOpen] = useState(false);
    const { isMobile } = useApp();
    const isTrash = filter.status === "trash";

    useEffect(() => {
        setData(jobTypes.data);
        setOriginal(jobTypes.data);
    }, [jobTypes]);

    const isRowChanged = (row, originalRow) => {
        return Object.keys(row).some((key) => {
            return row[key] != originalRow[key];
        });
    };

    const handleChange = (id, field, value) => {
        const newData = data.map((item) =>
            item.id === id ? { ...item, [field]: value } : item,
        );

        setData(newData);

        const originalRow = original.find((r) => r.id === id);
        const updatedRow = newData.find((r) => r.id === id);

        const newDirty = new Set(dirtyRows);

        if (isRowChanged(updatedRow, originalRow)) {
            newDirty.add(id);
        } else {
            newDirty.delete(id);
        }

        setDirtyRows(newDirty);
    };

    const handleAddButton = () => {
        setFormOpen(true);
    };

    const handleSubmit = async (values, data, form) => {
        if (data) {
            // Update data
            router.put(route("job-types.update", data.id), values, {
                onSuccess: () => {
                    form.resetFields();
                    setFormOpen(false);
                },
                onError: (errors) => {
                    const fieldErrors = Object.keys(errors).map((key) => ({
                        name: key,
                        errors: [errors[key]],
                    }));

                    form.setFields(fieldErrors);
                },
            });
        } else {
            // Store data
            router.post(route("job-types.store"), values, {
                onSuccess: () => {
                    form.resetFields();
                    setFormOpen(false);
                },
                onError: (errors) => {
                    const fieldErrors = Object.keys(errors).map((key) => ({
                        name: key,
                        errors: [errors[key]],
                    }));

                    form.setFields(fieldErrors);
                },
            });
        }
    };

    const handleEditButton = (data) => {
        setSelectedData(data);
        setFormOpen(true);
    };

    const handleReset = async () => {
        setData(original);
        setDirtyRows(new Set());
    };

    const handleUpdate = async (id) => {
        const changedRows = data.find((row) => row.id === id);
        if (!changedRows) return;
        router.put(route("job-types.update", id), changedRows, {
            onSuccess: () => {
                setDirtyRows((prev) => {
                    const newDirty = new Set(prev);
                    newDirty.delete(id);
                    return newDirty;
                });
            },
        });
    };

    const handleFilter = (values) => {
        router.get(route("job-types.index"), values);
    };

    const handleDelete = async (id) => {
        router.delete(route("job-types.destroy", { jobType: id }));
    };

    const handleRestore = async (id) => {
        router.put(route("job-types.restore", { jobType: id }));
    };

    const handleForceDelete = async (id) => {
        router.delete(route("job-types.forceDelete", { jobType: id }));
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Wage Per Item",
            dataIndex: "wage_per_item",
            render: (_, record) => (
                <InputNumber
                    min={0}
                    value={record.wage_per_item}
                    onChange={(val) =>
                        handleChange(record.id, "wage_per_item", val)
                    }
                    prefix="$"
                />
            ),
        },
        {
            title: "Current Price",
            dataIndex: "current_price",
            render: (_, record) => (
                <InputNumber
                    min={0}
                    value={record.current_price}
                    onChange={(val) =>
                        handleChange(record.id, "current_price", val)
                    }
                    prefix="$"
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
                                disabled={!dirtyRows.has(record.id)}
                                size="small"
                                icon={<SaveOutlined />}
                                onClick={() => handleUpdate(record.id)}
                            />
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
            <Title level={3}>Job Type Configuration</Title>

            <div className="flex justify-between py-2">
                <div className="flex items-center gap-2">
                    <Filter
                        filter={filter}
                        defaultFilters={defaultFilters}
                        filterKeys={filterKeys}
                        options={null}
                        handleFilter={handleFilter}
                        isMobile={isMobile}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="solid"
                        style={{
                            backgroundColor: Colors.primary,
                            color: "#FFF",
                        }}
                        onClick={handleAddButton}
                        icon={<PlusOutlined />}
                    >
                        Add
                    </Button>
                </div>
            </div>

            <Table
                rowKey="id"
                columns={columns}
                dataSource={data}
                size={isMobile ? "small" : "middle"}
                scroll={{ x: "max-content" }}
                pagination={{
                    current: jobTypes.current_page,
                    pageSize: jobTypes.per_page,
                    total: jobTypes.total,
                    showSizeChanger: !isMobile,
                    pageSizeOptions: [5, 10, 30, 50],
                    showQuickJumper: !isMobile,
                    simple: isMobile,
                }}
            />

            <div className="flex justify-end items-end">
                <Button
                    onClick={handleReset}
                    disabled={dirtyRows.size === 0}
                    icon={<RedoOutlined />}
                >
                    Reset Changes
                </Button>
            </div>

            <FormJobType
                data={selectedData}
                open={formOpen}
                onCancel={() => setFormOpen(false)}
                onSubmit={handleSubmit}
                optionsFields={fields}
            />
        </>
    );
}

export default JobType;
