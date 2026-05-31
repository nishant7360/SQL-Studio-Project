import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useGetMe } from "@/features/auth/useGetMe";
import { Spinner } from "./ui/spinner";

function AppLayout() {
  const location = useLocation();
  const { isLoading, user, isAuthenticated } = useGetMe();
  if (isLoading) {
    <Spinner />;
  }
  const hideFooter = location.pathname.startsWith("/questionset/");

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <Header user={user} isAuthenticated={isAuthenticated} />
      <main className="place-self-start w-full min-h-0 overflow-hidden">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}
export default AppLayout;
