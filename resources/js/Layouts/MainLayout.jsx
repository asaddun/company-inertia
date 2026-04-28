import { useState, useEffect } from "react";
import { Layout, Grid, message } from "antd";
import Navbar from "./Navbar";
import DrawerPortal from "./DrawerPortal";
import DrawerHome from "./DrawerHome";
import { SyncLoader } from "react-spinners";
import { Colors } from "../Themes/Colors";
import ScrollToTop from "../Configs/ScrollToTop";
import Footer from "./Footer";
import { router, usePage } from "@inertiajs/react";
import AppContext from "../Context/AppContext";

const { Content } = Layout;
const { useBreakpoint } = Grid;

export default function MainLayout({ children }) {
    const screens = useBreakpoint();
    const isMobile = !screens.lg;
    const { url } = usePage();
    const isOffice = url.startsWith("/portal");
    const isLogin = url.startsWith("/login");
    const [loading, setLoading] = useState(false);
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [portalOpen, setPortalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const { props } = usePage();

    useEffect(() => {
        if (props.flash?.success) {
            messageApi.success(props.flash.success);
            return;
        }

        const errorKeys = Object.keys(props.errors || {});
        if (errorKeys.length > 0) {
            const firstErrorMessage = props.errors[errorKeys[0]];
            messageApi.error(firstErrorMessage);
            return;
        }

        if (props.flash?.error) {
            messageApi.error(props.flash.error);
            console.error(props.flash.error);
        }
    }, [props.timestamp]);

    useEffect(() => {
        // Event ketika mulai pindah halaman
        const unregisterStart = router.on("start", () => setLoading(true));

        // Event ketika selesai (baik sukses maupun error)
        const unregisterFinish = router.on("finish", () => setLoading(false));

        // Cleanup function untuk menghapus listener saat komponen unmount
        return () => {
            unregisterStart();
            unregisterFinish();
        };
    }, []);

    const handleHamburgerClick = () => {
        if (isOffice) {
            setPortalOpen(true);
        } else {
            setNavbarOpen(true);
        }
    };

    const closeDrawers = () => {
        setNavbarOpen(false);
        setPortalOpen(false);
    };

    // Auto close drawer saat pindah halaman
    useEffect(() => {
        closeDrawers();
    }, [url]);

    // Auto close drawer saat layar membesar
    useEffect(() => {
        if (!isMobile) {
            closeDrawers();
        }
    }, [isMobile]);

    return (
        <>
            {contextHolder}
            <Layout style={{ minHeight: "100vh" }}>
                {loading && (
                    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-9999">
                        <SyncLoader color={Colors.primary} />
                    </div>
                )}
                {!isLogin && (
                    <>
                        <Navbar
                            isMobile={isMobile}
                            onHamburgerClick={handleHamburgerClick}
                        />
                        <DrawerHome
                            open={navbarOpen}
                            onClose={() => setNavbarOpen(false)}
                            isAuthenticated={false}
                        />
                        <DrawerPortal
                            open={portalOpen}
                            onClose={() => setPortalOpen(false)}
                        />
                    </>
                )}

                <Content
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        padding: !isOffice ? (isMobile ? 16 : 24) : 0,
                        backgroundColor: "white",
                    }}
                >
                    <ScrollToTop />
                    <AppContext.Provider value={{ isMobile }}>
                        {children}
                    </AppContext.Provider>
                </Content>
                {!isOffice && !isLogin && <Footer />}
            </Layout>
        </>
    );
}
