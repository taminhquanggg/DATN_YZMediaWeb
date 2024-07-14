import React from "react";
import { useSelector } from "react-redux";

import { Form, Input, DatePicker, Button, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const { RangePicker } = DatePicker;

const ItemSearch = React.forwardRef(({ formInstance, onSubmit }, ref) => {
  const navigate = useNavigate();

  return (
    <div className="flex-controls">
      <div className="ant-form-control ant-form-input">
        <label>Tên sự kiện</label>
        <Form.Item name={"Name"}>
          <Input placeholder="Tên sự kiện cần tìm kiếm"/>
        </Form.Item>
      </div>
      <div className="ant-form-control ant-form-item-date w-fit">
        <label>Ngày đăng</label>
        <Form.Item name={"Created_RANGE"}>
          <RangePicker format={"DD/MM/YYYY"} placeholder={["Từ ngày", "Đến ngày"]} />
        </Form.Item>
      </div>

      <div className="ant-form-control">
        <Button
          onClick={() => {
            onSubmit();
          }}
        >
          <FontAwesomeIcon icon={faSearch} />
          Tìm kiếm
        </Button>
      </div>
      <div className="ant-form-control">
        <Button
          type="primary"
          className="light-orange"
          onClick={() => {
            navigate("/quan-ly-su-kien/su-kien");
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Thêm mới</span>
        </Button>
      </div>
    </div>
  );
});

export default ItemSearch;
