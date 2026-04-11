import { useState } from "react";
import { Drawer, Menu, ConfigProvider } from "antd";
import { Colors } from "../Themes/Colors.jsx";
import { PortalItems } from "../Configs/PortalItems";
// import { Logos } from "../assets/index.js";
import "../../css/SidebarStyle.css";
import { filterMenuByRole } from "../Configs/FilterRole.js";
import { Link, usePage } from "@inertiajs/react";

function DrawerPortal({ open, onClose }) {
    const [openKeys, setOpenKeys] = useState([]);
    const { auth } = usePage().props;

    const onOpenChange = (keys) => {
        setOpenKeys(keys.slice(-1));
    };

    const onMenuClick = ({ key, keyPath }) => {
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

    const filteredItems = filterMenuByRole(PortalItems, auth.user?.level ?? 0);
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

export default DrawerPortal;
