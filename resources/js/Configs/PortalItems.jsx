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
                key: "my-reports",
                label: "My Reports",
                path: "/portal/reports/my",
                minLevel: Level.EMPLOYEE,
            },
            {
                key: "all-reports",
                label: "All Reports",
                path: "/portal/reports",
                minLevel: Level.MANAGEMENT,
            },
        ],
    },
    {
        key: "payrolls",
        label: "Payrolls",
        icon: <DollarOutlined />,
        path: "/portal/payrolls",
        minLevel: Level.EMPLOYEE,
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
                key: "global",
                label: "Global",
                path: "/portal/config/global",
                minLevel: Level.MANAGEMENT,
            },
            {
                key: "jobtype",
                label: "Job Type",
                path: "/portal/config/job-type",
                minLevel: Level.MANAGEMENT,
            },
        ],
    },
];
