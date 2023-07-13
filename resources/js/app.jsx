import "./bootstrap";
import "@fontsource/roboto"; // Defaults to weight 400
import "@fontsource/roboto/400.css"; // Specify weight
import "@fontsource/roboto/400-italic.css"; // Specify weight and style
import "@fontsource/roboto/500.css"; // Specify weight
import "@fontsource/roboto/700.css"; // Specify weight and style
import "@fontsource/roboto/700-italic.css"; // Specify weight and style
import "@fontsource/roboto/900.css"; // Specify weight and style
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { Fragment } from "react";
import { SnackbarProvider } from "notistack";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <Fragment>
                <SnackbarProvider
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                />
                <App {...props} />
            </Fragment>
        );
    },
    progress: {
        color: "#FF0000",
    },
});
