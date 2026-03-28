import {
  DashboardOutlined,
  DollarOutlined,
  FileProtectOutlined,
  FileTextOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Roles } from "./Roles";

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
    minRole: Roles.MANAGEMENT,
  },
  {
    key: "report",
    label: "Reports",
    icon: <FileTextOutlined />,
    minRole: Roles.EMPLOYEE,
    children: [
      {
        key: "my-reports",
        label: "My Reports",
        path: "/office/reports/me",
        minRole: Roles.EMPLOYEE,
      },
    ],
  },
  {
    key: "payrolls",
    label: "Payrolls",
    icon: <DollarOutlined />,
    minRole: Roles.EMPLOYEE,
    children: [
      {
        key: "payrolls",
        label: "Payrolls",
        path: "/office/payrolls",
        minRole: Roles.MANAGEMENT,
      },
      {
        key: "my-payrolls",
        label: "My Payrolls",
        path: "/office/payrolls/me",
        minRole: Roles.EMPLOYEE,
      },
      {
        key: "payrolls-config",
        label: "Configuration",
        path: "/office/payrolls/config",
        minRole: Roles.MANAGEMENT,
      },
      {
        key: "payrolls-dashboard",
        label: "Dashboard",
        path: "/office/payrolls/dashboard",
        minRole: Roles.EMPLOYEE,
      },
    ],
  },
  {
    key: "carrer",
    label: "Carrer",
    icon: <FileProtectOutlined />,
    path: "/office/carrer",
    minRole: Roles.MANAGEMENT,
  },
];
