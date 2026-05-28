import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function AppLayout() {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith("/questionset/");

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <Header />
      <main className="place-self-start w-full min-h-0 overflow-hidden">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}
export default AppLayout;
