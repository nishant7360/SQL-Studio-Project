import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function AppLayout() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <Header />
      <main className="place-self-start w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
