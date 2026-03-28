import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu, ConfigProvider } from "antd";
import { officeItems } from "../Configs/OfficeItems";
import { Colors } from "../Theme/Colors";
import "../../css/SidebarStyle.css";
import { filterMenuByRole } from "../Configs/FilterRole";
import { useAuth } from "../contexts/AuthContext";

const { Sider } = Layout;

function Sidebar({ isMobile }) {
    const [openKeys, setOpenKeys] = useState([]);
    const location = useLocation();
    const { user } = useAuth();

    useEffect(() => {
        const segments = location.pathname.split("/").filter(Boolean);
        if (segments.length >= 2) {
            setOpenKeys([segments[1]]);
        }
    }, []);

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
                    <Link to={item.path}>{item.label}</Link>
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

    const filteredItems = filterMenuByRole(officeItems, user?.role ?? 0);
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
                    selectedKeys={[location.pathname]}
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
