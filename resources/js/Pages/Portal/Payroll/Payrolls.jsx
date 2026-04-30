import {
    Badge,
    Button,
    Card,
    // Grid,
    // message,
    Table,
    Tabs,
    Tag,
    Typography,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
// import api from "../../../services/api";
// import { useNavigate, useLocation } from "react-router-dom";
import { Colors } from "../../../Themes/Colors";
import { useApp } from "../../../Context/AppContext";
import { router, usePage } from "@inertiajs/react";
import Filter from "../../../Components/Filter";
import { Level } from "../../../Configs/EnumLevels";

const { Title } = Typography;
// const { useBreakpoint } = Grid;

function Payrolls({ payrolls, filter, defaultFilters, filterKeys, counts }) {
    const { isMobile } = useApp();
    const { auth } = usePage().props;

    const handleFilter = (values) => {
        router.get(route("payrolls.index"), values);
    };

    const columns = [
        {
            title: "No",
            dataIndex: "no",
            key: "no",
            render: (_, __, index) => index + 1,
        },
        {
            title: "Employee",
            dataIndex: ["user", "name"],
        },
        {
            title: "Period",
            dataIndex: "week_code",
        },
        {
            title: "Salary",
            dataIndex: "amount",
            render: (_, record) => `$${record.total_wage_amount}`,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (value) => {
                if (!value) return "-";
                const colorMap = {
                    draft: "red",
                    submitted: "blue",
                    approved: "green",
                    paid: "gold",
                };
                const label = value.charAt(0).toUpperCase() + value.slice(1);
                return <Tag color={colorMap[value] || "default"}>{label}</Tag>;
            },
        },
        {
            title: "Action",
            render: (_, record) => (
                // record.status === "submitted" && (
                <Button
                    style={{
                        backgroundColor: Colors.primary,
                        color: "white",
                    }}
                    size="small"
                    icon={<InfoCircleOutlined />}
                    onClick={() =>
                        router.get(route("payrolls.show", record.id))
                    }
                >
                    Review
                </Button>
                // ),
            ),
        },
    ];

    const optionsType = [
        { label: "All", value: "all" },
        { label: "Draft", value: "draft" },
        { label: "Submitted", value: "submitted" },
        { label: "Approved", value: "approved" },
        { label: "Paid", value: "paid" },
    ];

    return (
        <>
            <Title level={3}>Payrolls</Title>
            <div className="flex justify-between py-2">
                <div className="flex gap-2">
                    <Filter
                        filter={filter}
                        defaultFilters={defaultFilters}
                        filterKeys={filterKeys}
                        optionsType={optionsType}
                        datePicker={"week"}
                        handleFilter={handleFilter}
                        isMobile={isMobile}
                    />
                    {auth.user.level > Level.EMPLOYEE && (
                        <>
                            {counts.submitted > 0 && (
                                <Badge count={counts.submitted}>
                                    <Button
                                        onClick={() =>
                                            router.get(
                                                route("payrolls.index"),
                                                {
                                                    type: "submitted",
                                                },
                                            )
                                        }
                                    >
                                        Need Approval
                                    </Button>
                                </Badge>
                            )}
                            {counts.approved > 0 && (
                                <Badge count={counts.approved}>
                                    <Button
                                        onClick={() =>
                                            router.get(
                                                route("payrolls.index"),
                                                {
                                                    type: "approved",
                                                },
                                            )
                                        }
                                    >
                                        Need Payment
                                    </Button>
                                </Badge>
                            )}
                        </>
                    )}
                </div>
                {/* <div></div> */}
            </div>

            <Table
                size={isMobile ? "small" : "middle"}
                columns={columns}
                dataSource={payrolls.data}
                rowKey="id"
                scroll={{ x: "max-content" }}
                pagination={{
                    current: payrolls.current,
                    pageSize: payrolls.pageSize,
                    total: payrolls.total,
                    showSizeChanger: !isMobile,
                    pageSizeOptions: [5, 10, 30, 50],
                    showQuickJumper: !isMobile,
                    simple: isMobile,
                }}
                onChange={(pagination, filters) => {
                    setRequestParams((prev) => ({
                        ...prev,
                        page: pagination.current,
                        per_page: pagination.pageSize,
                        status: filters?.status?.[0] || null,
                    }));
                }}
            />
        </>
    );
}

export default Payrolls;
