import { useState, useEffect } from "react";
import { Layout, Grid } from "antd";
import Navbar from "./Navbar";
import DrawerOffice from "./DrawerOffice";
import DrawerNavbar from "./DrawerNavbar";
// import { useLoading } from "../contexts/LoadingContext";
import { SyncLoader } from "react-spinners";
import { Colors } from "../Themes/Colors";
import ScrollToTop from "../Configs/ScrollToTop";
import Footer from "./Footer";
import { usePage } from "@inertiajs/react";

const { Content } = Layout;
const { useBreakpoint } = Grid;
const APP_NAME = "Company";

export default function MainLayout({ children }) {
    const screens = useBreakpoint();
    const isMobile = !screens.lg;
    const { url } = usePage();
    const isOffice = url.startsWith("/office");
    const isLogin = url.startsWith("/login");
    const [loading, setLoading] = useState(false);
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [officeOpen, setOfficeOpen] = useState(false);

    // useEffect(() => {
    //     const lastMatch = matches[matches.length - 1];
    //     const pageTitle = lastMatch?.handle?.title;

    //     document.title = pageTitle ? `${pageTitle} | ${APP_NAME}` : APP_NAME;
    // }, [matches]);

    const handleHamburgerClick = () => {
        if (isOffice) {
            setOfficeOpen(true);
        } else {
            setNavbarOpen(true);
        }
    };

    const closeDrawers = () => {
        setNavbarOpen(false);
        setOfficeOpen(false);
    };

    // Auto close drawer saat pindah halaman
    // useEffect(() => {
    //     closeDrawers();
    // }, [location.pathname]);

    // Auto close drawer saat layar membesar
    useEffect(() => {
        if (!isMobile) {
            closeDrawers();
        }
    }, [isMobile]);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            {loading && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <SyncLoader color={Colors.primary} />
                </div>
            )}
            {!isLogin && (
                <>
                    <Navbar
                        isMobile={isMobile}
                        onHamburgerClick={handleHamburgerClick}
                    />
                    <DrawerNavbar
                        open={navbarOpen}
                        onClose={() => setNavbarOpen(false)}
                        isAuthenticated={false}
                    />
                    <DrawerOffice
                        open={officeOpen}
                        onClose={() => setOfficeOpen(false)}
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
                {/* <Outlet context={{ isMobile }} /> */}
                {children}
            </Content>
            {!isOffice && !isLogin && <Footer />}
        </Layout>
    );
}
