import { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
import { Drawer, Menu, ConfigProvider } from "antd";
import { Colors } from "../Themes/Colors";
import { officeItems } from "../Configs/OfficeItems.jsx";
// import { Logos } from "../assets/index.js";
import "../../css/SidebarStyle.css";
import { filterMenuByRole } from "../Configs/FilterRole.js";
import { Link, usePage } from "@inertiajs/react";
// import { useAuth } from "../contexts/AuthContext.jsx";

function DrawerOffice({ open, onClose, user }) {
    const [openKeys, setOpenKeys] = useState([]);
    const { auth } = usePage().props;

    // useEffect(() => {
    //     const segments = location.pathname.split("/").filter(Boolean);
    //     if (segments.length >= 2) {
    //         setOpenKeys([segments[1]]);
    //     }
    // }, []);

    const onOpenChange = (keys) => {
        setOpenKeys(keys.slice(-1));
    };

    const onMenuClick = ({ key, keyPath }) => {
        // keyPath length = 1 → menu biasa (bukan submenu item)
        if (keyPath.length === 1) {
            setOpenKeys([]);
        }
    };

    function buildMenuItems(items) {
        return items.map((item) => {
            const menuItem = {
                key: item.path || item.key,
                icon: item.icon,
                label: item.path ? (
                    <Link href={item.path}>{item.label}</Link>
                ) : (
                    item.label
                ),
            };

            if (item.children) {
                menuItem.children = buildMenuItems(item.children);
                menuItem.label = item.label;
            }

            return menuItem;
        });
    }

    const filteredItems = filterMenuByRole(officeItems, auth.user?.level ?? 0);
    const items = buildMenuItems(filteredItems);

    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        darkItemBg: "inherit",
                        darkSubMenuItemBg: Colors.primary,
                        darkItemColor: "#ffffff", // text normal
                        darkItemHoverColor: "#000000", // text hover
                        darkItemSelectedBg: "#ffffff", // bg active
                        darkItemSelectedColor: "#000000",
                        darkItemHoverBg: "#ffffff",
                    },
                },
            }}
        >
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
                        Company
                    </Link>
                }
                size="60%"
                placement="left"
                open={open}
                closable={false}
                onClose={onClose}
                styles={{
                    body: { backgroundColor: Colors.primary },
                    wrapper: { width: "60%" },
                }}
            >
                <Menu
                    theme="dark"
                    mode="inline"
                    // selectedKeys={[location.pathname]}
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    onClick={onMenuClick}
                    style={{
                        height: "100%",
                        borderInlineEnd: 0,
                    }}
                    items={items}
                />
            </Drawer>
        </ConfigProvider>
    );
}

export default DrawerOffice;
