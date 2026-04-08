import { ConfigProvider, Drawer, Menu } from "antd";
// import { Logos } from "../assets/index.js";
import { Colors } from "../Themes/Colors.jsx";
import { menuItems } from "../Configs/MenuItems.js";
import { Link, usePage } from "@inertiajs/react";

function DrawerHome({ open, onClose }) {
    const { auth } = usePage().props;

    const items = menuItems
        .filter((item) => !item.auth || auth.user)
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
                    Company
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

export default DrawerHome;
