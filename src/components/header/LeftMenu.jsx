import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/image/logo-white.png";
import { RoutersConfig } from "../../routes/RoutesConfig";
import { color } from "d3";
const LeftMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const getListItemMenu = () => {
    const currentUrl = location.pathname.split("/")[1];
    const _lstItems =
      RoutersConfig?.filter((x) => x.DisplayOnMenu === 1)?.map((item, k) => {
        const funtionUrlActive = item.Function_Url.split("/")[1];
        return {
          ...item,
          key: item.Function_Id,
          label: item.Function_Name,
          className:
            currentUrl === funtionUrlActive ? "ant-menu-item-selected" : "",
          onClick: () => {
            navigate(item.Function_Url);
          },
        };
      }) || [];
    return _lstItems;
  };

  return (
    <Sider
      width={250}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="demo-logo-vertical h-[59.48px]">
        {collapsed ? (
          <a className="" href="/">
            <img className="w-full h-full object-cover" src={logo} />
          </a>
        ) : (
          <a className="" href="/">
            <div className="flex w-full h-full items-center">
              <img className="h-full object-cover" src={logo} />{" "}
              <span className="font-bold text-white px-2">YZ MEDIA MANAGER</span>
            </div>
          </a>
        )}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        items={getListItemMenu()}
      />
    </Sider>
  );
};

export default LeftMenu;
