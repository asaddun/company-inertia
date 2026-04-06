import {
    DashboardOutlined,
    DollarOutlined,
    FileProtectOutlined,
    FileTextOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Level } from "./EnumLevels";

export const officeItems = [
    {
        key: "dashboard",
        label: "Dashboard",
        icon: <DashboardOutlined />,
        path: "/office",
    },
    {
        key: "members",
        label: "Members",
        icon: <UserOutlined />,
        path: "/office/members",
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
                path: "/office/reports/me",
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
                path: "/office/payrolls",
                minLevel: Level.MANAGEMENT,
            },
            {
                key: "my-payrolls",
                label: "My Payrolls",
                path: "/office/payrolls/me",
                minLevel: Level.EMPLOYEE,
            },
            {
                key: "payrolls-config",
                label: "Configuration",
                path: "/office/payrolls/config",
                minLevel: Level.MANAGEMENT,
            },
            {
                key: "payrolls-dashboard",
                label: "Dashboard",
                path: "/office/payrolls/dashboard",
                minLevel: Level.EMPLOYEE,
            },
        ],
    },
    {
        key: "carrer",
        label: "Carrer",
        icon: <FileProtectOutlined />,
        path: "/office/carrer",
        minLevel: Level.MANAGEMENT,
    },
];
