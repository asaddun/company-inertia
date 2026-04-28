import { Button, Popconfirm, Space, Table, Tooltip, Typography } from "antd";
import { Colors } from "../../../Themes/Colors";
import {
    CheckCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    PlusOutlined,
    RedoOutlined,
} from "@ant-design/icons";
import { useApp } from "../../../Context/AppContext";
import { Link, router } from "@inertiajs/react";
import Filter from "../../../Components/Filter";

const { Title } = Typography;

function Reports({ reports, context, filter, defaultFilters, filterKeys }) {
    const { isMobile } = useApp();
    const isTrash = filter.status === "trash";

    const handleDelete = async (id) => {
        router.delete(route("reports.destroy", { report: id }));
    };

    const handleRestore = async (id) => {
        router.put(route("reports.restore", { report: id }));
    };

    const handleForceDelete = async (id) => {
        router.delete(route("reports.forceDelete", { report: id }));
    };

    const handleFilter = (values) => {
        router.get(route(`reports.${context}`), values);
    };

    const handlePagination = (pagination) => {
        router.get(route(`reports.${context}`), {
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
                        <>
                            <Button
                                color="primary"
                                variant="solid"
                                shape="circle"
                                size="small"
                                icon={<EditOutlined />}
                                onClick={() =>
                                    router.get(route("reports.edit", record.id))
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
            <Title level={3}>
                {`${context.charAt(0).toUpperCase() + context.slice(1)} Reports`}
            </Title>
            <div className="flex justify-between py-2">
                <div>
                    <Filter
                        filter={filter}
                        defaultFilters={defaultFilters}
                        filterKeys={filterKeys}
                        datePicker={"date"}
                        rangeDatePicker={true}
                        handleFilter={handleFilter}
                        isMobile={isMobile}
                    />
                </div>
                <div>
                    {context == "my" && (
                        <Link href={route("reports.create")}>
                            <Button
                                variant="solid"
                                style={{
                                    backgroundColor: Colors.primary,
                                    color: "#FFF",
                                }}
                                icon={<PlusOutlined />}
                            >
                                Create
                            </Button>
                        </Link>
                    )}
                </div>
            </div>

            <Table
                size={isMobile ? "small" : "middle"}
                columns={columns}
                dataSource={reports.data}
                rowKey="id"
                scroll={{ x: "max-content" }}
                pagination={{
                    current: reports.current_page,
                    pageSize: reports.per_page,
                    total: reports.total,
                    showSizeChanger: !isMobile,
                    pageSizeOptions: [5, 10, 30, 50],
                    showQuickJumper: !isMobile,
                    simple: isMobile,
                }}
                onChange={handlePagination}
            />
        </>
    );
}

export default Reports;
