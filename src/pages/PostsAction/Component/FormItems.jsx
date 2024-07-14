import React, { useEffect, useState } from "react";
import { Button, Form, Image, Input, Upload } from "antd";
import { useGlobalConst } from "../../../utils/constData";
import TextArea from "antd/es/input/TextArea";
import { getBase64 } from "../../../utils/convertData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const FormItems = React.forwardRef(({ formInstance, action, data }, ref) => {
  const globalConst = useGlobalConst();

  const [previewImageLogo, setPreviewImageLogo] = useState("");
  const [previewImageCover, setPreviewImageCover] = useState("");

  const [fileListLogo, setFileListLogo] = useState([]);
  const [fileListCover, setFileListCover] = useState([]);


  useEffect(() => {
    if (data) {

      if (data?.PostLogoImagePath) {
        setPreviewImageLogo(data.PostLogoImagePath);
      }
      if (data?.PostCoverImagePath) {
        setPreviewImageCover(data.PostCoverImagePath);
      }
    }
  }, [data]);

  const handleChangeListLogo = ({ file: newFile, fileList: newFileList }) => {
    formInstance.setFieldValue("PostLogoImage", newFile);
    setFileListLogo([newFile]);
  };

  const handleChangeListCover = ({ file: newFile, fileList: newFileList }) => {
    formInstance.setFieldValue("PostCoverImage", newFile);
    setFileListCover([newFile]);
  };

  const customRequestLogo = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    getBase64(file, (data) => {
      if (data) {
        file.preview = data;
        setPreviewImageLogo(data);
        onSuccess("Ok");
      } else {
        onError();
      }
    });
  };

  const customRequestCover = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    getBase64(file, (data) => {
      if (data) {
        file.preview = data;
        setPreviewImageCover(data);
        onSuccess("Ok");
      } else {
        onError();
      }
    });
  };

  const prop_btn_upload = (fileList, customRequest, onChange) => {
    return {
      fileList: fileList,
      accept: "image/png, image/jpeg",
      showUploadList: true,
      customRequest: customRequest,
      onChange: onChange,
      listType: "picture",

    }
  }

  return (
    <div className="field-list">
      <Form.Item
        label={`Tên sự kiện`}
        name={"PostTitle"}
        rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        label={`Mô tả`}
        name={"PostDescription"}
        rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label={`Ảnh logo sự kiện`}
        name={"PostLogoImage"}
        rules={[globalConst.ANT.FORM.RULES.yeuCauTaiAnh]}
      >
        <Upload {...prop_btn_upload(fileListLogo, customRequestLogo, handleChangeListLogo)}>
          <Button icon={<FontAwesomeIcon icon={faUpload} />} hidden={action === "detail"}>Tải ảnh lên</Button>
        </Upload>

        {previewImageLogo && (
          <div className="mt-3 overflow-hidden">
            <Image src={previewImageLogo} />
          </div>
        )}

      </Form.Item>

      <Form.Item
        label={`Ảnh bìa sự kiện`}
        name={"PostCoverImage"}
        rules={[globalConst.ANT.FORM.RULES.yeuCauTaiAnh]}
      >

        <Upload {...prop_btn_upload(fileListCover, customRequestCover, handleChangeListCover)}>
          <Button icon={<FontAwesomeIcon icon={faUpload} />} hidden={action === "detail"}>Tải ảnh lên</Button>
        </Upload>

        {previewImageCover && (
          <div className="mt-3 overflow-hidden">
            <Image src={previewImageCover} />
          </div>
        )}
      </Form.Item>
    </div>
  );
});

export default FormItems;
