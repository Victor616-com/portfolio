import { Outlet } from "react-router-dom";
import ScrollToTop from "./src/components/ScrollToTop";

function Layout() {
    return (
        <>
            <main>
                <ScrollToTop />
                <Outlet />
            </main>
        </>
    );
}

export default Layout;