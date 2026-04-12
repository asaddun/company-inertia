import { useEffect, useState } from "react";
// import api from "../../services/api";
import {
    Button,
    Grid,
    message,
    Popconfirm,
    Space,
    Table,
    Typography,
} from "antd";
import {
    DeleteOutlined,
    InfoCircleOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import FormInfoUser from "../../Components/Form/FormInfoUser";
import FormAddMember from "../../Components/Form/FormAddMember";
import { Colors } from "../../Themes/Colors";
import { useApp } from "../../Context/AppContext";

const { useBreakpoint } = Grid;
const { Title } = Typography;

function Users({ users, levels }) {
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

    return (
        <>
            <Title level={3}>Member List</Title>
            <div className="flex justify-between py-2">
                <div class="flex items-center gap-2"></div>
                <div class="flex items-center gap-2">
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
