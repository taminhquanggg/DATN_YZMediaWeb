import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Space, Avatar } from "antd";

import { UserOutlined } from '@ant-design/icons';

import { getUserFromStorage, removeUserFromStorage } from "../../store/actions/sharedActions";
import { faArrowRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLoginApi } from "../../apiHelper/api/login";
import { User_Type_Enum } from "../../utils/constData";
import { useNavigate } from "react-router-dom";


const TopControls = () => {
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.authReducer);
  const loginApi = useLoginApi();
  const dispatch = useDispatch();

  const Logout = (e) => {
    const userLocal = getUserFromStorage();

    loginApi
      .Logout(userLocal?.Refresh_Token)
      .then((res) => {
        removeUserFromStorage();
        dispatch({ type: "CLEAR_USER" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const gotoProfile = () => {
    try {
      const userLocal = getUserFromStorage();
      if (userLocal.User_Type == User_Type_Enum.Company) {
        navigate("/company-profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const items = [
    {
      label: "Đăng xuất",
      icon: <FontAwesomeIcon icon={faArrowRightFromBracket} color="red" />,
      key: "1",
      onClick: Logout,
    },
  ];

  return (
    <div className="w-full h-16 bg-white flex flex-nowrap justify-between items-center px-12 shadow-md border-b">
      <div></div>
      <div className="app__top-controls cursor-pointer hover:bg-sky-200 p-2 rounded-lg">
        <Dropdown
          className="user_option"
          menu={{
            items,
          }}
          trigger={["click"]}
        >
          <Space wrap size={16}>
            <div>
              <Avatar size="large" style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>{userLogin.UserName ? userLogin.UserName.charAt(0).toUpperCase() : ''}</Avatar>
            </div>
            <div className="user_name">
              <span>{userLogin.UserName}</span>
            </div>
          </Space>
        </Dropdown>
      </div>
    </div>
  );
};

export default TopControls;
