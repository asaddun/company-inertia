import { Layout, Menu, Button, Dropdown, ConfigProvider, Space } from "antd";
import {
    MenuOutlined,
    LogoutOutlined,
    LoginOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Colors } from "../Themes/Colors";
import { HomeItems } from "../Configs/HomeItems";
import { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
// import { Logos } from "../assets/index.js";

const { Header } = Layout;

function Navbar({ onHamburgerClick, isMobile }) {
    const { app, auth } = usePage().props;

    const items = HomeItems.filter((item) => !item.auth || auth.user).map(
        (item) => ({
            key: item.key,
            label: <Link href={item.path}>{item.label}</Link>,
        }),
    );

    const profileItems = [
        {
            key: "account",
            icon: <UserOutlined />,
            label: "Account",
            onClick: () => router.get(route("account")),
        },
        {
            type: "divider",
        },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: "Logout",
            onClick: () => router.post(route("logout")),
            danger: true,
        },
    ];

    return (
        <Header
            style={{
                display: "flex",
                alignItems: "center",
                padding: isMobile ? "0 16px" : "0 64px",
                background: "#fff",
                borderBottom: "1px solid #f0f0f0",
            }}
        >
            {/* LEFT */}
            <div style={{ display: "flex", alignItems: "center" }}>
                {isMobile ? (
                    <Button
                        type="text"
                        icon={<MenuOutlined />}
                        onClick={onHamburgerClick}
                    />
                ) : (
                    <Link
                        href="/"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            fontWeight: 600,
                            fontSize: 24,
                            color: Colors.primary,
                        }}
                    >
                        {/* <img
                            src={Logos.main}
                            alt="Dabellyou"
                            style={{
                                height: 32,
                                width: 32,
                                objectFit: "contain",
                            }}
                        /> */}
                        {app.company_name}
                    </Link>
                )}
            </div>

            {/* CENTER (Desktop Public Menu) */}
            {!isMobile && (
                <ConfigProvider
                    theme={{
                        components: {
                            Menu: {
                                itemHoverBg: "transparent",
                                itemActiveBg: "transparent",
                                itemSelectedBg: "transparent",
                                itemHoverColor: "inherit",
                                itemSelectedColor: "inherit",
                                horizontalItemSelectedColor: "transparent",
                            },
                        },
                    }}
                >
                    <Menu
                        mode="horizontal"
                        selectable={false}
                        style={{
                            marginLeft: 32,
                            flex: 1,
                            fontSize: 16,
                        }}
                        items={items}
                    />
                </ConfigProvider>
            )}

            {/* RIGHT */}
            <div style={{ marginLeft: "auto" }}>
                {auth.user ? (
                    <Dropdown
                        menu={{
                            items: profileItems,
                        }}
                        trigger={["click"]}
                        placement="bottomRight"
                    >
                        <Space style={{ cursor: "pointer" }}>
                            <Button>{auth.user?.name}</Button>
                        </Space>
                    </Dropdown>
                ) : (
                    <div className="flex gap-2">
                        <Link href={route("login")}>
                            <Button
                                style={{
                                    color: "#fff",
                                    backgroundColor: Colors.primary,
                                    fontSize: 16,
                                }}
                            >
                                Login
                            </Button>
                        </Link>
                        <Link href={route("register")}>
                            <Button
                                style={{
                                    fontSize: 16,
                                }}
                            >
                                Register
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </Header>
    );
}

export default Navbar;
