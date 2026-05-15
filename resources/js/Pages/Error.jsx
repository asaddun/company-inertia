import { Button, Result } from "antd";
import { router } from "@inertiajs/react";
import { Colors } from "../Themes/Colors";

function Error({ status }) {
    const config = {
        403: {
            title: "403",
            subTitle: "You are not authorized to access this page.",
        },
        404: {
            title: "404",
            subTitle: "The page you visited does not exist.",
        },
        500: {
            title: "500",
            subTitle: "Something went wrong.",
        },
    };

    const current = config[status] || config[500];

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Result
                status={String(status)}
                title={current.title}
                subTitle={current.subTitle}
                extra={
                    <Button
                        type="primary"
                        style={{
                            backgroundColor: Colors.primary,
                            color: "white",
                        }}
                        onClick={() => router.get("/")}
                    >
                        Back Home
                    </Button>
                }
            />
        </div>
    );
}

export default Error;
