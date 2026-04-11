import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import "../css/app.css";
import MainLayout from "./Layouts/MainLayout";
import PortalLayout from "./Layouts/PortalLayout";

createInertiaApp({
    resolve: async (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx");
        const importPage = pages[`./Pages/${name}.jsx`];

        // 1. Jalankan fungsinya untuk mendapatkan modul (Promise)
        const page = await importPage();

        // 2. Sekarang page.default sudah bisa diakses karena sudah di-await
        if (name.startsWith("Portal/")) {
            page.default.layout =
                page.default.layout ||
                ((page) => (
                    <MainLayout>
                        <PortalLayout>{page}</PortalLayout>
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
