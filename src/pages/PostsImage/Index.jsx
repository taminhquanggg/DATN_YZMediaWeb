import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Breadcrumb, Button, List, Modal, Radio } from "antd";
import { useSearchParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faTrash,
  faUpload
} from "@fortawesome/free-solid-svg-icons";

import { Content } from "antd/lib/layout/layout";

import "./Component/mouse-select.css";
import { FormUpload } from "./Component/FormUpload";

import ImagePreview from "./Component/ImagePreview";

import FormPopup from "../../components/controls/FormPopup";
import { useImageApi } from "../../apiHelper/api/ImageApi";
import PaginationV2 from "../../components/controls/PaginationV2";

import { get_User_Name } from "../../store/actions/sharedActions";


const options = [
  {
    label: "Ngày tải lên",
    value: "InTime",
  },
  {
    label: "Tên",
    value: "ImageName",
  },
  {
    label: "Trạng thái",
    value: "StatusTrain",
    title: "Trạng thái xử lý của hình ảnh",
  },
];

const Index = () => {
  const apiClient = useImageApi();

  const [searchParams] = useSearchParams();
  const [postsId, setPostsId] = useState(0);
  const [postName, setPostName] = useState("");
  const [orderBy, setOrderBy] = useState("InTime");

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalRecord, setTotalRecord] = useState(0);
  const [recordOnPage, setRecordOnPage] = useState(10);

  useEffect(() => {
    var _id = parseInt(searchParams.get("id") ?? "-1");
    setPostsId(_id);
    setPostName(searchParams.get("name") ?? "");
  }, [searchParams]);

  useEffect(() => {
    searchData(1);
  }, [postsId, orderBy]);

  useEffect(() => {
    searchData(currentPage);
  }, [recordOnPage]);

  const DeleteFile = () => {
    var message = "Bạn có chắc chắn muốn xóa danh sách ảnh được chọn?";
    const filesDelete = files.filter((e) => e.isSelected === true) || [];

    if (filesDelete.length > 1) {
      message = "Bạn có chắc chắn muốn xóa những file đã chọn?";
    }

    Modal.confirm({
      title: "Xác nhận",
      content: message,
      okText: "Xác nhận",
      cancelText: "Đóng",
      centered: true,
      onOk: () => {
        if (filesDelete.length > 1) {
          const ids = [];
          filesDelete.map((x) => ids.push(x.File_Id));

          apiClient.Delete_Multiple(ids).then((data) => {
            if (data?.code > 0) {
              toast.success(data.message);
              searchData(currentPage);
            } else {
              toast.error(data.message);
            }
          });
        } else {
          apiClient.Delete(filesDelete[0].File_Id).then((data) => {
            if (data?.code > 0) {
              toast.success(data.message);
              searchData(currentPage);
            } else {
              toast.error(data.message);
            }
          });
        }
      },
    });
  };

  const searchData = (p_curentPage) => {

    let fromRecord = recordOnPage * (p_curentPage - 1) + 1;

    setCurrentPage(p_curentPage);

    let param = {
      postID: postsId,
      orderBy: orderBy,
      offset: fromRecord,
      pageSize: recordOnPage
    }

    if (postsId > 0) {
      apiClient
        .GetImageByPostID(param)
        .then((data) => {
          if (data && data.jsondata) {
            const _lst = JSON.parse(data.jsondata);
            // console.log(_lst);
            setTotalRecord(data.totalrows);
            setTotalPages(Math.ceil(data.totalrows / recordOnPage));
            setFiles(_lst);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  };

  const [files, setFiles] = useState([]);
  const [indexFirstSelect, setIndexFirstSelect] = useState(0);
  const countFileSelected = React.useMemo(
    () => files.filter((e) => e.isSelected === true).length || 0,
    [files]
  );
  const [fileIdSelected, setFileIdSelected] = useState(0);
  // useEffect(() => {
  //   console.log(files);
  // }, [files]);
  useEffect(() => {
    if (countFileSelected <= 1) {
      const _index = files.findIndex((x) => x.ImageID === fileIdSelected);
      if (_index >= 0) {
        setIndexFirstSelect(_index);
      }
    }
  }, [countFileSelected]);

  const handleClearSelect = (e) => {
    setFiles([
      ...files.map((e, i) => {
        return { ...e, isSelected: false };
      }),
    ]);
  };

  const cardClick = (e, data) => {
    e.stopPropagation();
    setFileIdSelected(data?.ImageID);

    if (e.ctrlKey) {

      if (data?.ImageID > 0) {
        setFiles([
          ...files.map((e, i) => {
            if (e.ImageID === data?.ImageID) {
              return { ...e, isSelected: true };
            } else {
              return e;
            }
          }),
        ]);
      }
    } else {
      if (data?.ImageID > 0) {
        setFiles([
          ...files.map((e, i) => {
            if (e.ImageID === data?.ImageID) {
              return { ...e, isSelected: true };
            } else {
              return { ...e, isSelected: false };
            }
          }),
        ]);
      }
    }
  };

  const FormItem = ({ form, action, rowSelected }) => {
    return <FormUpload form={form} />;
  };
  const refs = useRef({
    refForm: useRef(null),
  });
  const onEvent = (data) => {
    return {
      Form: refs.current.refForm?.current?.onEvent(data),
    };
  };
  const ShowModal = () => {
    onEvent({
      type: "OPEN_POPUP",
      data: { action: "insert" },
    });
  };

  const [listFileUploading, setListFileUploading] = useState([]);

  const [firstUpload, setFirstUpload] = useState(true);

  const OnSubmit = async (values, action) => {
    setListFileUploading(values.ListFile || []);
    setFirstUpload(true);
    return "";
  };

  const GetPresignedUrl = async () => {
    try {
      return apiClient.GetPresignedUrl();
    } catch (err) {
      console.log(err)
      toast.error(err);
    }
  }

  const HandleBeforeUpload = async (file) => {
    try {
      const presignedUrl = await GetPresignedUrl();
      const resultUpload = await apiClient.UploadPresignedUrl(presignedUrl.jsondata, file)

      if (resultUpload.success) {

        const resultImage = await apiClient.Insert({
          imageCloudID: resultUpload.result.id,
          imageName: resultUpload.result.filename,
          imagePath: resultUpload.result.variants[0],
          userI: get_User_Name(),
        })

        if (resultImage.code) {
          const resultPostImage = await apiClient.InsertPostImage({
            postID: postsId,
            imageID: resultImage.jsondata
          })

          if (resultPostImage.code) {
            toast.success(`Ảnh ${file.name} được tải lên thành công.`);
          }
          else {
            throw resultPostImage.message
          }

        }
        else {
          throw resultImage.message
        }
      }
      else {
        throw resultUpload.errors.message
      }


    } catch (error) {
      toast.error(`${file.name} tải lên thất bại.`);
      console.log(error)
    }
  };

  useEffect(() => {
    if (listFileUploading.length > 0 && firstUpload) {
      setFirstUpload(false);
      listFileUploading.forEach((item) => {
        HandleBeforeUpload(item.originFileObj)
      });
      setListFileUploading(listFileUploading);
    }
  }, [listFileUploading]);

  return (
    <>
      <div className="content-scroll" id="portal">
        <Content className="main-layout-content">
          <Breadcrumb
            className="main-layout-breadcrumb"
            items={[{ title: <a href="/">Quản lý sự kiện</a> }, { title: "Quản lý ảnh" }]}
          />

          <div className="flex-content card-content">
            <div className="flex justify-between item-start">
              <div className="flex flex-col items-start gap-3">
                <div className="text-xl font-bold">Danh sách ảnh của sự kiện: {postName}</div>
                {countFileSelected > 0 ? (
                  <>
                    <div className="flex flex-nowrap bg-[#dbdee3] py-1 pr-5 rounded-full">
                      <div className="flex flex-nowrap justify-start pl-5 pr-24">
                        <Button
                          type="text"
                          className="text-xs"
                          onClick={DeleteFile}
                          icon={<FontAwesomeIcon icon={faTrash}
                          />}>
                          Xóa ảnh được chọn
                        </Button>
                      </div>
                      <Button type="text" shape="circle" className="" onClick={handleClearSelect}>
                        <FontAwesomeIcon className="text-xs" icon={faClose} />
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex gap-2 items-center">
                      <label>Sắp xếp:</label>
                      <Radio.Group
                        onChange={(e) => setOrderBy(e.target.value)}
                        value={orderBy}
                        optionType="button"
                        options={options}
                      />
                    </div>
                  </>
                )}
              </div>
              <div>
                <Button
                  icon={<FontAwesomeIcon icon={faUpload} />}
                  onClick={() => {
                    ShowModal();
                  }}
                  type="primary"
                >
                  Tải ảnh lên
                </Button>
              </div>
            </div>
            <div>
              <div onClick={handleClearSelect} className="not_allow_hightlight">
                <List
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 1,
                    md: 2,
                    lg: 2,
                    xl: 3,
                    xxl: 4,
                  }}
                  dataSource={files}
                  renderItem={(item) => (
                    <List.Item>
                      <ImagePreview image={item} onClick={cardClick} />
                    </List.Item>
                  )}
                />
              </div>
              <PaginationV2
                totalPages={totalPages}
                currentPage={currentPage}
                totalRecord={totalRecord}
                recordOnPage={recordOnPage}
                setRecordOnPage={setRecordOnPage}
                searchData={searchData}
              />
            </div>
          </div>
        </Content>
      </div>

      <FormPopup
        formTitle={() => "Tải ảnh"}
        formContent={FormItem}
        submit={OnSubmit}
        ref={refs.current.refForm}
      />
    </>
  );
};

export default Index;
