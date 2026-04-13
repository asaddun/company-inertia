import { Layout, Menu, Button, Dropdown, ConfigProvider, Space } from "antd";
import { MenuOutlined, LogoutOutlined, LoginOutlined } from "@ant-design/icons";
import { Colors } from "../Themes/Colors";
import { HomeItems } from "../Configs/HomeItems";
import { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
// import { Logos } from "../assets/index.js";

const { Header } = Layout;

function Navbar({ onHamburgerClick, isMobile }) {
    const [loading, setLoading] = useState(false);
    const { auth } = usePage().props;

    const handleLogout = async () => {
        router.post(route("logout"), {
            onStart: () => {
                // Bisa tambahkan loading state di sini jika perlu
                setLoading(true);
            },
            onError: (errors) => {
                console.error("Logout Failed:", errors);
            },
            onFinish: () => {
                setLoading(false);
            },
        });
    };

    const items = HomeItems.filter((item) => !item.auth || auth.user).map(
        (item) => ({
            key: item.key,
            label: <Link href={item.path}>{item.label}</Link>,
        }),
    );

    const profileItems = [
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: "Logout",
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
                        Company
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
                            onClick: ({ key }) => {
                                if (key === "logout") {
                                    handleLogout();
                                }
                            },
                        }}
                        trigger={["click"]}
                        placement="bottomRight"
                    >
                        <Space style={{ cursor: "pointer" }}>
                            <Button loading={loading}>{auth.user?.name}</Button>
                        </Space>
                    </Dropdown>
                ) : (
                    <Link href="/login">
                        <Button
                            style={{
                                color: "#fff",
                                backgroundColor: Colors.primary,
                                fontSize: 16,
                            }}
                            icon={<LoginOutlined />}
                        >
                            Login
                        </Button>
                    </Link>
                )}
            </div>
        </Header>
    );
}

export default Navbar;
