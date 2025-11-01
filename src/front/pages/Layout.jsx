import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    return (
        <ScrollToTop>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Outlet />
            </div>
        </ScrollToTop>
    )
}