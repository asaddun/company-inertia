import {
    DashboardOutlined,
    DollarOutlined,
    FileProtectOutlined,
    FileTextOutlined,
    SettingOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Level } from "./EnumLevels";

export const PortalItems = [
    {
        key: "dashboard",
        label: "Dashboard",
        icon: <DashboardOutlined />,
        path: "/portal",
    },
    {
        key: "users",
        label: "Users",
        icon: <UserOutlined />,
        path: "/portal/users",
        minLevel: Level.MANAGEMENT,
    },
    {
        key: "report",
        label: "Reports",
        icon: <FileTextOutlined />,
        minLevel: Level.EMPLOYEE,
        children: [
            {
                key: "all-reports",
                label: "All Reports",
                path: "/portal/reports",
                minLevel: Level.MANAGEMENT,
            },
            {
                key: "my-reports",
                label: "My Reports",
                path: "/portal/reports/my",
                minLevel: Level.EMPLOYEE,
            },
        ],
    },
    {
        key: "payrolls",
        label: "Payrolls",
        icon: <DollarOutlined />,
        minLevel: Level.EMPLOYEE,
        children: [
            {
                key: "payrolls",
                label: "Payrolls",
                path: "/portal/payrolls",
                minLevel: Level.MANAGEMENT,
            },
            {
                key: "my-payrolls",
                label: "My Payrolls",
                path: "/portal/payrolls/my",
                minLevel: Level.EMPLOYEE,
            },
            {
                key: "payrolls-config",
                label: "Configuration",
                path: "/portal/payrolls/config",
                minLevel: Level.MANAGEMENT,
            },
            {
                key: "payrolls-dashboard",
                label: "Dashboard",
                path: "/portal/payrolls/dashboard",
                minLevel: Level.EMPLOYEE,
            },
        ],
    },
    {
        key: "career",
        label: "Career",
        icon: <FileProtectOutlined />,
        path: "/portal/careers",
        minLevel: Level.MANAGEMENT,
    },
    {
        key: "configuration",
        label: "Configuration",
        icon: <SettingOutlined />,
        minLevel: Level.MANAGEMENT,
        children: [
            {
                key: "jobtype",
                label: "Job Type",
                path: "/portal/config/job-type",
                minLevel: Level.MANAGEMENT,
            },
        ],
    },
];
