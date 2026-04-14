import { useState } from "react";
import {
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
    FilterOutlined,
    InfoCircleOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import FormInfoUser from "../../Components/Form/FormInfoUser";
import FormAddMember from "../../Components/Form/FormAddMember";
import { Colors } from "../../Themes/Colors";
import { useApp } from "../../Context/AppContext";
import { router } from "@inertiajs/react";

const { Title } = Typography;

function Users({ users, levels, filter }) {
    const { isMobile } = useApp();
    const [addOpen, setAddOpen] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [form] = Form.useForm();

    const handleAddButton = (user) => {
        setAddOpen(true);
    };

    const handleAdd = async (values) => {
        //
    };

    const handleEditButton = (user) => {
        setSelectedUser(user);
        setInfoOpen(true);
    };

    const handleUpdate = async (values) => {
        //
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
                    <Button
                        color="primary"
                        variant="solid"
                        shape="circle"
                        size="small"
                        icon={<InfoCircleOutlined />}
                        onClick={() => handleEditButton(record)}
                    />
                    <Popconfirm
                        title="Delete Member?"
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

    const handlePagination = (pagination) => {
        router.get(route("users.index"), {
            ...filter,
            page: pagination.current,
            per_page: pagination.pageSize,
        });
    };

    const handleFinish = (values) => {
        router.get(route("users.index"), values);
        console.log(form.getFieldsValue());
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

    const popoverContent = (
        <Form
            form={form}
            layout="inline"
            onFinish={handleFinish}
            initialValues={{
                search: filter?.search,
                type: filter?.type ?? "employee",
                status: filter?.status ?? "active",
            }}
            className="flex flex-col gap-2"
        >
            {/* SEARCH */}
            <div>
                <div className="text-xs text-gray-500 mb-1">Search</div>

                <Form.Item name="search">
                    <Input placeholder="Search user" />
                </Form.Item>
            </div>

            {/* TYPE */}
            <div>
                <div className="text-xs text-gray-500 mb-1">Type</div>

                <Form.Item name="type">
                    {!isMobile ? (
                        <Segmented options={options} />
                    ) : (
                        <Select className="min-w-35" options={options} />
                    )}
                </Form.Item>
            </div>

            {/* TRASH */}
            <div>
                <div className="text-xs text-gray-500 mb-1">Trash</div>

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
                        <Button icon={<FilterOutlined />}>Filter</Button>
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
                loading={loading}
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

            <FormAddMember
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
