import { useEffect, useState } from "react";
// import api from "../../services/api";
import {
    Button,
    Form,
    Grid,
    message,
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

const { useBreakpoint } = Grid;
const { Title } = Typography;

function Users({ users, levels, filter }) {
    // const screens = useBreakpoint();
    // const isMobile = !screens.md;
    const { isMobile } = useApp();

    // const [messageApi, contextHolder] = message.useMessage();
    // const [messageState, setMessageState] = useState(null);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState();

    const [addOpen, setAddOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [saving, setSaving] = useState(false);
    const type = filter.type;
    const isTrash = filter.status === "trash";
    const [form] = Form.useForm();

    // const [pagination, setPagination] = useState({
    //     current: 1,
    //     pageSize: 10,
    //     total: 0,
    // });

    // useEffect(() => {
    //     if (!messageState) return;

    //     messageApi.open(messageState);
    //     setMessageState(null);
    // }, [messageState]);

    const handleAddButton = (user) => {
        setAddOpen(true);
    };

    const handleAdd = async (values) => {
        // setSaving(true);
        // try {
        //     const res = await api.post(`/users`, values);
        //     setMessageState({
        //         type: "success",
        //         content: res.data.message,
        //     });
        //     setAddOpen(false);
        //     fetchMembers(pagination.current, pagination.pageSize);
        // } catch (err) {
        //     setMessageState({
        //         type: "error",
        //         content: err.response?.data?.message,
        //     });
        // } finally {
        //     setSaving(false);
        // }
    };

    const handleEditButton = (user) => {
        setSelectedUser(user);
        setUpdateOpen(true);
    };

    const handleUpdate = async (values) => {
        // setSaving(true);
        // try {
        //     const res = await api.put(`/users/${selectedUser.id}`, values);
        //     setMessageState({
        //         type: "success",
        //         content: res.data.message,
        //     });
        //     setUpdateOpen(false);
        //     fetchMembers(pagination.current, pagination.pageSize);
        // } catch (err) {
        //     setMessageState({
        //         type: "error",
        //         content: err.response?.data?.message,
        //     });
        // } finally {
        //     setSaving(false);
        // }
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

    const handleSwitchTrash = (checked) => {
        // router.get(route("careers.index"), {
        //     ...filter,
        //     status: checked ? "trash" : "active",
        //     page: 1,
        // });
    };

    const popoverContent = (
        <Form
            form={form}
            layout="vertical"
            // onFinish={handleFinish}
            className="flex flex-col gap-4"
        >
            <div>
                <div className="text-xs text-gray-500 mb-1">Type</div>
                <Form.Item>
                    {!isMobile ? (
                        <Segmented
                            options={["All", "Employee", "Member"]}
                            // onChange={(value) => console.log(value)}
                        />
                    ) : (
                        <Select
                            defaultValue="all"
                            className="min-w-35"
                            options={[
                                { value: "all", label: "All" },
                                { value: "employee", label: "Employee" },
                                { value: "member", label: "Member" },
                            ]}
                        />
                    )}
                </Form.Item>
            </div>

            <div>
                <div className="text-xs text-gray-500 mb-1">Trash</div>
                <Switch
                    checked={isTrash}
                    onChange={handleSwitchTrash}
                    checkedChildren={<DeleteOutlined />}
                    unCheckedChildren={<DeleteOutlined />}
                    style={{ backgroundColor: isTrash ? "red" : undefined }}
                />
            </div>
            {/* </div> */}
        </Form>
    );

    const content = (
        <div style={{ padding: "8px" }}>
            <p>
                Teks singkat ini akan membuat Popover menyesuaikan lebar secara
                otomatis.
            </p>
        </div>
    );

    return (
        <>
            <Title level={3}>Member List</Title>
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
                onChange={(pagination) => {
                    fetchMembers(pagination.current, pagination.pageSize);
                }}
            />

            <FormAddMember
                open={addOpen}
                loading={saving}
                onCancel={() => setAddOpen(false)}
                onSubmit={handleAdd}
            />

            <FormInfoUser
                open={updateOpen}
                user={selectedUser}
                loading={saving}
                onCancel={() => setUpdateOpen(false)}
                onSubmit={handleUpdate}
                levels={levels}
            />
        </>
    );
}

export default Users;
