import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import "../css/app.css";
import MainLayout from "./Layouts/MainLayout";
import OfficeLayout from "./Layouts/OfficeLayout";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        const page = pages[`./Pages/${name}.jsx`];

        if (name.startsWith("Office/")) {
            page.default.layout =
                page.default.layout ||
                ((page) => (
                    <MainLayout>
                        <OfficeLayout>{page}</OfficeLayout>
                    </MainLayout>
                ));
        } else {
            page.default.layout =
                page.default.layout ||
                ((page) => <MainLayout>{page}</MainLayout>);
        }
        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    title: (title) => (title ? `${title} | Company` : "Company"),
    progress: false,
});
