import React from "react";
import { Layout } from "antd";

import LeftMenu from "../header/LeftMenu";
import TopControls from "../header/TopControls";

const LayoutLeftSideBar = (props) => {
  return (
    // <div className="relative">
    <Layout className="main-layout h-screen">
      <LeftMenu />

      <Layout>
        <TopControls />
        <props.component />
      </Layout>
    </Layout>
    // </div>
  );
};
export default LayoutLeftSideBar;
