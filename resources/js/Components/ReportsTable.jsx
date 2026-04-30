import {
    CheckCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    RedoOutlined,
} from "@ant-design/icons";
import { router } from "@inertiajs/react";
import { Button, Popconfirm, Space, Table, Tag, Tooltip } from "antd";

function ReportsTable({
    data,
    isTrash,
    isMobile,
    handlePagination,
    paginationEnabled = true,
}) {
    const handleDelete = async (id) => {
        router.delete(route("reports.destroy", { report: id }));
    };

    const handleRestore = async (id) => {
        router.put(route("reports.restore", { report: id }));
    };

    const handleForceDelete = async (id) => {
        router.delete(route("reports.forceDelete", { report: id }));
    };

    const columns = [
        {
            title: "No",
            dataIndex: "no",
            key: "no",
            render: (_, __, index) => index + 1,
        },
        {
            title: "Name",
            dataIndex: ["user", "name"],
            key: "user_name",
        },
        {
            title: "Job",
            dataIndex: ["job_type", "name"],
            key: "job_type_name",
        },
        {
            title: "Date",
            dataIndex: "work_date",
            key: "work_date",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            render: (_, record) =>
                `${record.quantity} ${record.job_type.unit_label}`,
        },
        {
            title: "Stored",
            dataIndex: "stored",
            key: "stored",
            render: (_, record) => {
                if (record.stored == null) {
                    return "-";
                }

                const isLess = record.stored < record.expected;

                return (
                    <span>
                        ${record.stored}{" "}
                        {isLess ? (
                            <Tooltip
                                title={`Stored value does not meet the Expected value ($${record.expected})`}
                            >
                                <ExclamationCircleOutlined
                                    style={{ color: "orange" }}
                                />
                            </Tooltip>
                        ) : (
                            <CheckCircleOutlined style={{ color: "green" }} />
                        )}
                    </span>
                );
            },
        },
        {
            title: "Bonus",
            dataIndex: "bonus",
            key: "bonus",
            render: (_, record) => {
                if (record.bonus == null) {
                    return "-";
                }
                return <span>${record.bonus}</span>;
            },
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space>
                    {!isTrash ? (
                        record.payroll.status == "draft" ? (
                            <>
                                <Button
                                    color="primary"
                                    variant="solid"
                                    shape="circle"
                                    size="small"
                                    icon={<EditOutlined />}
                                    onClick={() =>
                                        router.get(
                                            route("reports.edit", record.id),
                                        )
                                    }
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
                            <Tag color={"blue"}>Submitted</Tag>
                        )
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
        <Table
            size={isMobile ? "small" : "middle"}
            columns={columns}
            dataSource={data}
            rowKey="id"
            scroll={{ x: "max-content" }}
            pagination={
                paginationEnabled
                    ? {
                          current: data.current_page,
                          pageSize: data.per_page,
                          total: data.total,
                          showSizeChanger: !isMobile,
                          pageSizeOptions: [5, 10, 30, 50],
                          showQuickJumper: !isMobile,
                          simple: isMobile,
                      }
                    : false
            }
            onChange={paginationEnabled ? handlePagination : undefined}
        />
    );
}

export default ReportsTable;
