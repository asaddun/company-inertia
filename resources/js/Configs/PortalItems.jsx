import {
    DashboardOutlined,
    DollarOutlined,
    FileProtectOutlined,
    FileTextOutlined,
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
        key: "members",
        label: "Members",
        icon: <UserOutlined />,
        path: "/portal/members",
        minLevel: Level.MANAGEMENT,
    },
    {
        key: "report",
        label: "Reports",
        icon: <FileTextOutlined />,
        minLevel: Level.EMPLOYEE,
        children: [
            {
                key: "my-reports",
                label: "My Reports",
                path: "/portal/reports/me",
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
                path: "/portal/payrolls/me",
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
        key: "carrer",
        label: "Career",
        icon: <FileProtectOutlined />,
        path: "/portal/careers",
        minLevel: Level.MANAGEMENT,
    },
];
