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
    RedoOutlined,
    SaveOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

function JobType({ jobTypes, filter }) {
    const [data, setData] = useState(jobTypes.data);
    const [original, setOriginal] = useState(jobTypes.data);
    const [dirtyRows, setDirtyRows] = useState(new Set());
    const { isMobile } = useApp();
    const isTrash = filter.status === "trash";

    const isRowChanged = (row, originalRow) => {
        return Object.keys(row).some((key) => row[key] !== originalRow[key]);
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

    const handleReset = async () => {
        setData(original);
        setDirtyRows(new Set());
    };

    const handleSave = async (id) => {
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
                                onClick={() => handleSave(record.id)}
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
        </>
    );
}

export default JobType;
