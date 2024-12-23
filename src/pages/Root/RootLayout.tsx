import { Outlet } from "react-router-dom";
import css from "./styles.module.scss";
import MainNavigation from "../../components/navigation/MainNavigation";

export default function RootLayout() {
    return (
        <div className={css.appWrapper}>
            <MainNavigation />
            <main className={css.appMain}>
                <Outlet />
            </main>
        </div>
    );
}