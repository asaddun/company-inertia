import { ConfigProvider, Tabs, Typography } from "antd";
import { Children } from "react";
import PersonalInfo from "./PersonalInfo";
import Security from "./Security";
import { usePage } from "@inertiajs/react";
import { Colors } from "../../../Themes/Colors";

const { Title } = Typography;

function AccountCenter() {
    const { auth } = usePage().props;

    const items = [
        {
            key: "personal",
            label: "Personal Info",
            children: <PersonalInfo user={auth.user} />,
        },
        {
            key: "security",
            label: "Security",
            children: <Security />,
        },
    ];

    return (
        <>
            <Title level={3}>Account Center</Title>
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
                <Tabs defaultActiveKey="personal" items={items} />
            </ConfigProvider>
        </>
    );
}

export default AccountCenter;
