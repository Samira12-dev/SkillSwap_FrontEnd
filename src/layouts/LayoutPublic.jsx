
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function LayoutPublic() {
    return (
        <>
            <Header />

            <main>
                <Outlet />
            </main>
        </>
    );
}

