import { Layout } from "antd";
import Sidebar from "./Sidebar";
import { useApp } from "../Context/AppContext";
const { Content } = Layout;

export default function PortalLayout({ children }) {
    const { isMobile } = useApp();
    return (
        <Layout>
            {/* SIDEBAR DESKTOP */}
            <Sidebar isMobile={isMobile} />
            <Content style={{ padding: 16 }}>{children}</Content>
        </Layout>
    );
}
