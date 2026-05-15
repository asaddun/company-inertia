import { Button, Form, Input, Typography } from "antd";
import { useApp } from "../../../Context/AppContext";
import { Colors } from "../../../Themes/Colors";
import { usePage } from "@inertiajs/react";
import FormChangePassword from "../../../Components/Form/FormChangePassword";
import FormChangeUsername from "../../../Components/Form/FormChangeUsername";

function Security() {
    const { isMobile } = useApp();
    const { auth } = usePage().props;

    return (
        <div className="flex flex-col gap-2">
            <FormChangeUsername user={auth.user} />
            <FormChangePassword />
        </div>
    );
}

export default Security;
