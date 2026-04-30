import {
    Row,
    Col,
    Card,
    Descriptions,
    Table,
    Tag,
    Skeleton,
    Button,
    Typography,
} from "antd";
// import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import api from "../../../services/api";
import { Colors } from "../../../Themes/Colors";
import ReportsTable from "../../../Components/ReportsTable";
import { useApp } from "../../../Context/AppContext";
import { router, usePage } from "@inertiajs/react";
import { Level } from "../../../Configs/EnumLevels";

const { Title } = Typography;

function DetailPayroll({ payroll }) {
    const { isMobile } = useApp();
    const { auth } = usePage().props;

    const colorStatusMap = {
        draft: "red",
        submitted: "blue",
        approved: "green",
        paid: "gold",
    };

    const handleSubmit = async () => {
        router.patch(route("payrolls.status", payroll.id), {
            status: "submitted",
        });
    };

    const handleReject = async () => {
        router.patch(route("payrolls.status", payroll.id), {
            status: "draft",
        });
    };

    const handleApprove = async () => {
        router.patch(route("payrolls.status", payroll.id), {
            status: "approved",
        });
    };

    const handlePaid = async () => {
        router.patch(route("payrolls.status", payroll.id), {
            status: "paid",
        });
    };

    const handlePagination = (pagination) => {
        router.get(route("payrolls.index"), {
            ...filter,
            page: pagination.current,
            per_page: pagination.pageSize,
        });
    };

    return (
        <>
            <Title level={3}>Payroll Detail</Title>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card title="Payroll Detail">
                        <Row gutter={[16, 8]}>
                            <Col xs={24} md={12}>
                                <Descriptions column={1} size="small">
                                    <Descriptions.Item label="Employee">
                                        {payroll.user?.name}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Period">
                                        {payroll.week_code}
                                    </Descriptions.Item>
                                </Descriptions>
                            </Col>

                            <Col xs={24} md={12}>
                                <Descriptions column={1} size="small">
                                    <Descriptions.Item label="Total Wage">
                                        ${payroll.total_wage_amount}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Status">
                                        <Tag
                                            color={
                                                colorStatusMap[
                                                    payroll.status
                                                ] || "default"
                                            }
                                        >
                                            {payroll.status
                                                .charAt(0)
                                                .toUpperCase() +
                                                payroll.status.slice(1)}
                                        </Tag>
                                    </Descriptions.Item>
                                </Descriptions>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                <Col span={24}>
                    <Card title="Reports List">
                        <ReportsTable
                            data={payroll.reports}
                            isMobile={isMobile}
                            handlePagination={handlePagination}
                            paginationEnabled={false}
                        />
                    </Card>
                </Col>
            </Row>
            {payroll.status === "draft" && (
                <div className="w-full flex justify-end items-end mt-4">
                    <Button
                        style={{
                            backgroundColor: Colors.primary,
                            color: "white",
                        }}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </div>
            )}
            {payroll.status === "submitted" && (
                <div className="w-full flex justify-end items-end mt-4 gap-2">
                    <Button
                        style={{
                            color: Colors.primary,
                            borderColor: Colors.primary,
                        }}
                        onClick={handleReject}
                    >
                        Reject
                    </Button>
                    {auth.user.level > Level.EMPLOYEE && (
                        <Button
                            style={{
                                backgroundColor: Colors.primary,
                                color: "white",
                            }}
                            onClick={handleApprove}
                        >
                            Approve
                        </Button>
                    )}
                </div>
            )}
            {payroll.status === "approved" && (
                <div className="w-full flex justify-end items-end mt-4">
                    <Button
                        style={{
                            backgroundColor: Colors.primary,
                            color: "white",
                        }}
                        onClick={handlePaid}
                    >
                        Paid
                    </Button>
                </div>
            )}
        </>
    );
}

export default DetailPayroll;
