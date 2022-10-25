import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: any) => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen h-fit w-screen relative">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
