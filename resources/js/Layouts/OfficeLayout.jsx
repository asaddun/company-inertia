import { Layout } from "antd";
import Sidebar from "./Sidebar";
const { Content } = Layout;

export default function OfficeLayout() {
    const { isMobile } = useOutletContext();
    return (
        <Layout>
            {/* SIDEBAR DESKTOP */}
            <Sidebar isMobile={isMobile} />
            <Content style={{ padding: 16 }}>
                <Outlet />
            </Content>
        </Layout>
    );
}
