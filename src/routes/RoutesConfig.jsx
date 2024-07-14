import PostsManager from "../pages/PostsManager/Index";
import PostsAction from "../pages/PostsAction/Index"
import PostImage from "../pages/PostsImage/Index"

import LayoutLeftSideBar from "../components/layout/LayoutLeftSideBar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNewspaper
} from "@fortawesome/free-solid-svg-icons";

export const RoutersConfig = [
  {
    Function_Id: "POSTS",
    Function_Name: "Quản lý sự kiện",
    icon: <FontAwesomeIcon icon={faNewspaper} />,
    DisplayOnMenu: 1,
    checkRight: false,
    Function_Url: "/",
    pageLayout: LayoutLeftSideBar,
    pageContent: { component: PostsManager },
  },
  {
    Function_Id: "POSTS_ACTION",
    Function_Name: "Sự kiện",
    DisplayOnMenu: 0,
    checkRight: false,
    Function_Url: "/quan-ly-su-kien/su-kien",
    pageLayout: LayoutLeftSideBar,
    pageContent: { component: PostsAction },
  },
  {
    Function_Id: "POSTS_IMAGE",
    Function_Name: "Quản lý ảnh",
    DisplayOnMenu: 0,
    checkRight: false,
    Function_Url: "/quan-ly-su-kien/quan-ly-anh",
    pageLayout: LayoutLeftSideBar,
    pageContent: { component: PostImage },
  }
];
