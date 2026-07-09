import { ConfigProvider, Tabs, Typography } from "antd";
import { Children } from "react";
import CompanyProfile from "./CompanyProfile";
import Security from "./Security";
import { Colors } from "../../../Themes/Colors";

const { Title } = Typography;

function Global({ settings }) {
    const items = [
        {
            key: "profile",
            label: "Company Profile",
            children: <CompanyProfile settings={settings} />,
        },
        {
            key: "security",
            label: "Security",
            children: <Security settings={settings} />,
        },
    ];

    return (
        <>
            <Title level={3}>Global Configuration</Title>
            <ConfigProvider
                theme={{
                    components: {
                        Tabs: {
                            itemActiveColor: Colors.primary,
                            itemSelectedColor: Colors.primary,
                            inkBarColor: Colors.primary,
                        },
                    },
                }}
            >
                <Tabs defaultActiveKey="profile" items={items} />
            </ConfigProvider>
        </>
    );
}

export default Global;
