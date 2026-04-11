import { useState } from "react";
import { Layout, Menu, ConfigProvider } from "antd";
import { PortalItems } from "../Configs/PortalItems";
import { Colors } from "../Themes/Colors";
import "../../css/SidebarStyle.css";
import { filterMenuByRole } from "../Configs/FilterRole";
import { Link, usePage } from "@inertiajs/react";

const { Sider } = Layout;

function Sidebar({ isMobile, user, location }) {
    const [openKeys, setOpenKeys] = useState([]);
    const { auth } = usePage().props;

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

    const filteredItems = filterMenuByRole(PortalItems, auth.user?.level ?? 0);
    const items = buildMenuItems(filteredItems);

    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        darkItemBg: Colors.primary,
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
            <Sider width={200} collapsedWidth="0" collapsed={isMobile}>
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
                    inlineIndent={24}
                />
            </Sider>
        </ConfigProvider>
    );
}

export default Sidebar;
