import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { Breadcrumb, Button, Form, Modal } from "antd";

import ItemSearch from "./Component/ItemSearch";

import DataTableV2 from "../../components/controls/DataTableV2";

import { usePostsApi } from "../../apiHelper/api/PostsApi";
import { Content } from "antd/lib/layout/layout";
import { columPostList } from "./Component/Comon";

const Index = () => {
  const apiClient = usePostsApi();
  const [formSearch] = Form.useForm();

  const DeletePost = (id) => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xóa bài viết này?",
      okText: "Xác nhận",
      cancelText: "Đóng",
      centered: true,
      onOk: () => {
        apiClient
          .Delete(id)
          .then((data) => {
            if (data?.code > 0) {
              toast.success(data.message);
              Search();
            } else {
              toast.error(data.message);
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      },
    });
  };

  const columns = columPostList({ DeletePost });

  const refs = useRef({ refDataGrid: useRef(null) });

  const onEvent = (data) => {
    return {
      DataGrid: refs.current.refDataGrid?.current?.onEvent(data),
    };
  };

  const Search = () => {
    formSearch.submit();
    formSearch
      .validateFields()
      .then((values) => {
        onEvent({
          type: "HANDLE_SEARCH",
          data: values,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    return;
  };

  useEffect(() => {
    Search();
  }, []);

  return (
    <>
      <div className="content-scroll">
        <Content className="main-layout-content">
          <Breadcrumb
            className="main-layout-breadcrumb"
            items={[{ title: <a href="/">Quản lý sự kiện</a>}]}
          />

          <div className="flex-content">
            <div className="card-content">
              <Form
                className="form-search"
                form={formSearch}
                onKeyDown={(e) => {
                  if (e.code == "Enter") {
                    Search();
                  }
                }}
              >
                <ItemSearch onSubmit={Search} />
              </Form>
            </div>

            <div className="card-content">
              <DataTableV2
                ref={refs.current.refDataGrid}
                columns={columns}
                SearchData={apiClient?.SearchData}
              />
            </div>
          </div>
        </Content>
      </div>
    </>
  );
};

export default Index;
