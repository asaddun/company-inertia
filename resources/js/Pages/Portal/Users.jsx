import { useState } from "react";
import {
    Badge,
    Button,
    ConfigProvider,
    Form,
    Input,
    Popconfirm,
    Popover,
    Segmented,
    Select,
    Space,
    Switch,
    Table,
    Typography,
} from "antd";
import {
    DeleteOutlined,
    FilterFilled,
    FilterOutlined,
    InfoCircleOutlined,
    PlusOutlined,
    RedoOutlined,
} from "@ant-design/icons";
import FormInfoUser from "../../Components/Form/FormInfoUser";
import FormAddEmployee from "../../Components/Form/FormAddEmployee";
import { Colors } from "../../Themes/Colors";
import { useApp } from "../../Context/AppContext";
import { router } from "@inertiajs/react";

const { Title } = Typography;

function Users({ users, levels, filter, defaultFilters, filterKeys }) {
    const { isMobile } = useApp();
    const [addOpen, setAddOpen] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [form] = Form.useForm();
    const filterValues = Form.useWatch([], form);

    const handleAddButton = () => {
        setAddOpen(true);
    };

    const handleAdd = async (values, form) => {
        router.post(route("users.store"), values, {
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

    const handleEditButton = (user) => {
        setSelectedUser(user);
        setInfoOpen(true);
    };

    const handleUpdate = async (values, form) => {
        router.put(route("users.update", selectedUser.id), values, {
            onSuccess: () => {
                setInfoOpen(false);
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

    const handleDelete = async (id) => {
        router.delete(route("users.destroy", { user: id }));
    };

    const handleRestore = async (id) => {
        router.put(route("users.restore", { user: id }));
    };

    const handleForceDelete = async (id) => {
        router.delete(route("users.forceDelete", { user: id }));
    };

    const levelsMap = Object.fromEntries(
        levels.map((level) => [level.value, level.label]),
    );

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Level",
            dataIndex: "level",
            key: "level",
            render: (level) => levelsMap[level] ?? "-",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space>
                    {filter.status != "trash" ? (
                        <>
                            <Button
                                color="primary"
                                variant="solid"
                                shape="circle"
                                size="small"
                                icon={<InfoCircleOutlined />}
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

    const handlePagination = (pagination) => {
        router.get(route("users.index"), {
            ...filter,
            page: pagination.current,
            per_page: pagination.pageSize,
        });
    };

    const handleFilter = (values) => {
        router.get(route("users.index"), values);
    };

    const handleReset = () => {
        form.resetFields();
        router.get(
            route("users.index"),
            {},
            {
                replace: true,
            },
        );
    };

    const options = [
        { label: "All", value: "all" },
        { label: "Employee", value: "employee" },
        { label: "Member", value: "member" },
    ];

    const normalize = (val) => val ?? "";

    const isFiltered = filterKeys.some((key) => {
        return normalize(filter?.[key]) !== normalize(defaultFilters[key]);
    });

    const isFieldActive = (key) => {
        return normalize(filter?.[key]) !== normalize(defaultFilters[key]);
    };

    const activeCount = filterKeys.filter((key) => {
        return normalize(filter?.[key]) !== normalize(defaultFilters[key]);
    }).length;

    const popoverContent = (
        <Form
            form={form}
            layout="inline"
            onFinish={handleFilter}
            initialValues={{
                search: filter?.search,
                type: filter?.type ?? "employee",
                status: filter?.status ?? "active",
            }}
            onValuesChange={(changed, all) => {
                if (changed.status === "trash" || changed.search != null) {
                    form.setFieldsValue({ type: "all" });
                }
            }}
            className="flex flex-col gap-2"
        >
            {/* SEARCH */}
            <div>
                <div
                    className={`text-xs mb-1 ${
                        isFieldActive("search")
                            ? "text-blue-500 font-semibold"
                            : "text-gray-500"
                    }`}
                >
                    Search
                </div>

                <Form.Item name="search">
                    <Input placeholder="Search user" />
                </Form.Item>
            </div>

            {/* TYPE */}
            <div>
                <div
                    className={`text-xs mb-1 ${
                        isFieldActive("type")
                            ? "text-blue-500 font-semibold"
                            : "text-gray-500"
                    }`}
                >
                    Type
                </div>

                <Form.Item name="type">
                    {!isMobile ? (
                        <Segmented
                            disabled={filterValues?.status === "trash"}
                            options={options}
                        />
                    ) : (
                        <Select
                            className="min-w-35"
                            disabled={filterValues?.status === "trash"}
                            options={options}
                        />
                    )}
                </Form.Item>
            </div>

            {/* TRASH */}
            <div>
                <div
                    className={`text-xs mb-1 ${
                        isFieldActive("status")
                            ? "text-blue-500 font-semibold"
                            : "text-gray-500"
                    }`}
                >
                    Trash
                </div>

                <ConfigProvider
                    theme={{
                        components: {
                            Switch: {
                                colorPrimary: "#ff4d4f",
                                colorPrimaryHover: "#ff4d4f",
                            },
                        },
                    }}
                >
                    <Form.Item
                        name="status"
                        valuePropName="checked"
                        getValueProps={(value) => ({
                            checked: value === "trash",
                        })}
                        getValueFromEvent={(checked) => {
                            return checked ? "trash" : "active";
                        }}
                    >
                        <Switch
                            checkedChildren={<DeleteOutlined />}
                            unCheckedChildren={<DeleteOutlined />}
                        />
                    </Form.Item>
                </ConfigProvider>
            </div>

            {/* ACTION */}
            <div className="flex justify-end gap-2">
                <Button onClick={handleReset}>Reset</Button>

                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ backgroundColor: Colors.primary }}
                >
                    Apply
                </Button>
            </div>
        </Form>
    );

    return (
        <>
            <Title level={3}>Users List</Title>
            <div className="flex justify-between py-2">
                <div className="flex items-center gap-2">
                    <Popover
                        placement="rightTop"
                        trigger="click"
                        title={"Filter"}
                        content={popoverContent}
                        style={{ maxWidth: "none", width: "max-content" }}
                    >
                        <Badge count={activeCount}>
                            <Button
                                icon={
                                    isFiltered ? (
                                        <FilterFilled />
                                    ) : (
                                        <FilterOutlined />
                                    )
                                }
                            >
                                Filter
                            </Button>
                        </Badge>
                    </Popover>
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
                size={isMobile ? "small" : "middle"}
                columns={columns}
                dataSource={users.data}
                rowKey="id"
                scroll={{ x: "max-content" }}
                pagination={{
                    current: users.current_page,
                    pageSize: users.per_page,
                    total: users.total,
                    showSizeChanger: !isMobile,
                    pageSizeOptions: [5, 10, 30, 50],
                    showQuickJumper: !isMobile,
                    simple: isMobile,
                }}
                onChange={handlePagination}
            />

            <FormAddEmployee
                open={addOpen}
                onCancel={() => setAddOpen(false)}
                onSubmit={handleAdd}
            />

            <FormInfoUser
                open={infoOpen}
                onCancel={() => setInfoOpen(false)}
                onSubmit={handleUpdate}
                user={selectedUser}
                levels={levels}
            />
        </>
    );
}

export default Users;
