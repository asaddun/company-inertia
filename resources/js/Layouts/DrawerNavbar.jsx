import { ConfigProvider, Drawer, Menu } from "antd";
// import { Link } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext.jsx";
// import { Logos } from "../assets/index.js";
import { Colors } from "../Themes/Colors";
import { menuItems } from "../Configs/MenuItems.js";
import { Link } from "@inertiajs/react";

function DrawerNavbar({ open, onClose, isAuthenticated }) {
    // const { isAuthenticated, logout } = useAuth();
    const items = menuItems
        .filter((item) => !item.auth || isAuthenticated)
        .map((item) => ({
            key: item.key,
            label: <Link href={item.path}>{item.label}</Link>,
        }));
    return (
        <Drawer
            title={
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
            }
            placement="left"
            open={open}
            closable={false}
            onClose={onClose}
            styles={{
                wrapper: { width: "60%" },
            }}
        >
            <ConfigProvider
                theme={{
                    components: {
                        Menu: {
                            itemHoverBg: "transparent",
                            itemActiveBg: "transparent",
                            itemSelectedBg: "transparent",
                            itemHoverColor: "inherit",
                            itemSelectedColor: "inherit",
                        },
                    },
                }}
            >
                <Menu
                    mode="vertical"
                    items={items}
                    onClick={onClose}
                    style={{ borderInlineEnd: 0, fontSize: 16 }}
                />
            </ConfigProvider>
        </Drawer>
    );
}

export default DrawerNavbar;
