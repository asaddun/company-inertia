import { useState } from "react";
import { Button, Form, Popconfirm, Space, Table, Typography } from "antd";
import {
    DeleteOutlined,
    InfoCircleOutlined,
    PlusOutlined,
    RedoOutlined,
} from "@ant-design/icons";
import FormInfoUser from "../../Components/Form/FormInfoUser";
import FormAddEmployee from "../../Components/Form/FormAddEmployee";
import { Colors } from "../../Themes/Colors";
import { useApp } from "../../Context/AppContext";
import { router } from "@inertiajs/react";
import Filter from "../../Components/Filter";

const { Title } = Typography;

function Users({ users, levels, filter, defaultFilters, filterKeys }) {
    const { isMobile } = useApp();
    const [addOpen, setAddOpen] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

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

    const optionsType = [
        { label: "All", value: "all" },
        { label: "Employee", value: "employee" },
        { label: "Member", value: "member" },
    ];

    return (
        <>
            <Title level={3}>Users List</Title>
            <div className="flex justify-between py-2">
                <div className="flex items-center gap-2">
                    <Filter
                        filter={filter}
                        defaultFilters={defaultFilters}
                        filterKeys={filterKeys}
                        optionsType={optionsType}
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
