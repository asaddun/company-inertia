// import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu, Button, Dropdown, ConfigProvider, Space } from "antd";
import { MenuOutlined, LogoutOutlined, LoginOutlined } from "@ant-design/icons";
// import { useAuth } from "../contexts/AuthContext.jsx";
import { Colors } from "../Themes/Colors";
import { menuItems } from "../Configs/MenuItems.js";
import { useState } from "react";
import { Link } from "@inertiajs/react";
// import { useLoading } from "../contexts/LoadingContext.jsx";
// import { Logos } from "../assets/index.js";

const { Header } = Layout;

function Navbar({ onHamburgerClick, isMobile, isAuthenticated }) {
    // const navigate = useNavigate();
    // const { isAuthenticated, logout, user } = useAuth();
    // const { loading, setLoading } = useLoading();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        navigate("/", { replace: true });
        setLoading(true);

        try {
            await logout();
        } catch (err) {
            console.log("Logout gagal", err);
        } finally {
            setLoading(false);
        }
    };

    const items = menuItems
        .filter((item) => !item.auth || isAuthenticated)
        .map((item) => ({
            key: item.key,
            label: <Link href={item.path}>{item.label}</Link>,
        }));

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
                        Dabellyou
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
                {isAuthenticated ? (
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
                            <Button loading={loading}>{user?.name}</Button>
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
