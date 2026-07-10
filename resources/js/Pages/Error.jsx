import { Button, Result } from "antd";
import { router } from "@inertiajs/react";
import { Colors } from "../Themes/Colors";

function Error({ status }) {
    const config = {
        403: {
            status: "403",
            title: "403",
            subTitle: "You are not authorized to access this page.",
        },
        404: {
            status: "404",
            title: "404",
            subTitle: "The page you visited does not exist.",
        },
        429: {
            status: "error",
            title: "429",
            subTitle: "Too many requests. Please try again later.",
        },
        500: {
            status: "500",
            title: "500",
            subTitle: "Something went wrong.",
        },
        503: {
            status: "error",
            title: "503",
            subTitle: "Service unavailable. Please try again later.",
        },
    };

    const current = config[status] || config[500];

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Result
                status={current.status}
                title={current.title}
                subTitle={current.subTitle}
                extra={
                    current.title !== "503" ? (
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
                    ) : null
                }
            />
        </div>
    );
}

export default Error;
