import { Table, InputNumber, Button, message, Typography, Grid } from "antd";
import { useEffect, useState } from "react";
import { Colors } from "../../../Themes/Colors";
import { useApp } from "../../../Context/AppContext";
import { router } from "@inertiajs/react";

const { Title } = Typography;

function JobType({ jobTypes }) {
    const [data, setData] = useState(jobTypes.data);
    const [original, setOriginal] = useState(jobTypes.data);
    const [dirtyRows, setDirtyRows] = useState(new Set());
    const [loading, setLoading] = useState(false);
    const { isMobile } = useApp();

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

    const handleSave = async () => {
        const changedRows = data.filter((row) => dirtyRows.has(row.id));
        if (changedRows.length === 0) return;
        router.put(route("job-types.update-bulk"), {
            data: changedRows,
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
    ];

    return (
        <>
            <Title level={3}>Job Type Configuration</Title>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={data}
                size={isMobile ? "small" : "middle"}
                loading={loading}
                scroll={{ x: "max-content" }}
                rowClassName={(record) =>
                    dirtyRows.has(record.id) ? "row-dirty" : ""
                }
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

            <div className="w-full flex justify-end items-end gap-2">
                <Button
                    onClick={handleReset}
                    disabled={dirtyRows.size === 0}
                    loading={loading}
                >
                    Reset
                </Button>
                <Button
                    type="primary"
                    onClick={handleSave}
                    disabled={dirtyRows.size === 0}
                    loading={loading}
                    style={{ backgroundColor: Colors.primary }}
                >
                    Save Changes
                </Button>
            </div>
        </>
    );
}

export default JobType;
