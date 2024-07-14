import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  Button,
  Form,
  Input,
  Breadcrumb,
} from "antd";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import { toast } from "react-toastify";
import { usePostsApi } from "../../apiHelper/api/PostsApi";
import { useGlobalConst } from "../../utils/constData";
import { Content } from "antd/lib/layout/layout";
import FormItems from "./Component/FormItems";
import { faAngleLeft, faSave } from "@fortawesome/free-solid-svg-icons";

const { TextArea } = Input;

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    toast.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    toast.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const Index = () => {
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();

  const globalConst = useGlobalConst();

  const apiClient = usePostsApi();

  const [postId, setPostId] = useState(0);
  const [post, setPost] = useState();
  const [action, setAction] = useState("create");
  const [actionTitle, setActionTitle] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (action === "create") {
      setActionTitle("Thêm mới");
    } else if (action === "update") {
      setActionTitle("Chỉnh sửa");
    } else if (action === "detail") {
      setActionTitle("Xem chi tiết");
    }
  }, [action]);

  useEffect(() => {
    var _id = parseInt(searchParams.get("id") ?? "-1");
    setPostId(_id);
  }, [searchParams]);

  useEffect(() => {
    if (postId != undefined && postId > 0) {
      //load post
      setAction(searchParams.get("action").trim());
      apiClient
        .GetById(postId)
        .then((data) => {
          if (data && data?.jsondata) {
            var obj = JSON.parse(data.jsondata);
            setPost(obj);
            form.setFieldsValue(obj);
          }
        })
        .catch((e) => {
          console.log(e);
          toast.error("Không tìm thấy dữ liệu !")
        });
    }
  }, [postId]);

  const OnSubmit = () => {
    form.submit();
    form
      .validateFields()
      .then((values) => {
        if (action == "create") {
          apiClient
            .Insert(values)
            .then((res) => {
              if (res && res.code > 0) {
                toast.success(res.message);
                navigate("/");
              } else {
                toast.error(res.message);
              }
            })
            .catch((e) => {
              console.log(e);
            });
        } else if (action == "update") {
          apiClient
            .Update(values)
            .then((res) => {
              if (res && res.code > 0) {
                toast.success(res.message);
                location.reload();
              } else {
                toast.error(res.message);
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="content-scroll">
        <Content className="main-layout-content">
          <Breadcrumb
            className="main-layout-breadcrumb"
            items={[{ title: <a href="/">Quản lý sự kiện</a> }, { title: actionTitle }]}
          />
          <div className="card-content">
            <Form form={form} disabled={action === "detail"}>
              <FormItems formInstance={form} action={action} data={post} />
            </Form>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <NavLink to={`/`}>
                <Button 
                icon={<FontAwesomeIcon icon={faAngleLeft} />}
                style={{ marginRight: "8px" }}
                >Quay lại</Button>
              </NavLink>
              <Button
                type={"primary"}
                onClick={OnSubmit}
                disabled={action === "detail"}
                icon={<FontAwesomeIcon icon={faSave} />}>
                Lưu
              </Button>
            </div>
          </div>
        </Content>
      </div>
    </>
  );
};

export default Index;
