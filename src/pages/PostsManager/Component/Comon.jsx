import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/convertData";
import { Button, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFile, faFolder, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

export const StatusPost = {
  PENDING: 0,
  DONE: 1
};

export const columPostList = ({ DeletePost }) => {
  const navigate = useNavigate();
  return [
    {
      field: "PostTitle",
      headerName: "Tên sự kiện",
      cellRenderer: (e) => {
        return (
          <Link
            to={`/quan-ly-su-kien/quan-ly-anh?id=${e.data.PostID}&name=${encodeURIComponent(e.data.PostTitle)}`}
          >
            {e.value}
          </Link>
        );
      },
      width: 300,
    },
    {
      field: "StatusTrain",
      headerName: "Trạng thái",
      cellRenderer: (e) => {
        if (!e.data.StatusTrain) {
          return (
            <div>
              <span className="rounded-pill text-light-yellow">Đang đào tạo</span>
            </div>
          );
        } else {
          return (
            <div>
              <span className="rounded-pill text-light-green">Sẵn sàng</span>
            </div>
          );
        }
      },
      width: 180,
      alignedGrids: "left",
    },
    {
      field: "InTime",
      headerName: "Ngày đăng",
      width: 250,
      cellRenderer: (data) => {
        return formatDate(data.value, "dd/MM/yyyy");
      },
    },
    {
      field: "UserI",
      headerName: "Người đăng",
      width: 250,
    },
    {
      field: "UpdateTime",
      headerName: "Ngày cập nhật cuối cùng",
      width: 250,
      cellRenderer: (data) => {
        return data.value ? formatDate(data.value, "dd/MM/yyyy")  : "";
      },
    },
    {
      field: "UserU",
      headerName: "Người cập nhật cuối cùng",
      width: 250
    },
    {
      headerName: "Chức năng",
      pinned: "right",
      width: 200,
      suppressSizeToFit: true,
      resizable: false,
      cellRenderer: (e) => {
        return (
          <>
            <div className="ag-cell-actions">
              <Tooltip placement="top" title="Quản lý ảnh">
                <Button
                  type="actions"
                  onClick={() => {
                    navigate(
                      `/quan-ly-su-kien/quan-ly-anh?id=${e.data.PostID}&name=${encodeURIComponent(e.data.PostTitle)}`
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faFolder} color="#999" />
                </Button>
              </Tooltip>
              <Tooltip placement="top" title="Xem chi tiết">
                <Button
                  type="actions"
                  onClick={() => {
                    navigate(`/quan-ly-su-kien/su-kien?id=${e.data.PostID}&action=detail`);
                  }}
                >
                  <FontAwesomeIcon icon={faEye} color="#999" />
                </Button>
              </Tooltip>
              <Tooltip placement="top" title="Chỉnh sửa">
                <Button
                  type="actions"
                  onClick={() => {
                    navigate(`/quan-ly-su-kien/su-kien?id=${e.data.PostID}&action=update`);
                  }}
                >
                  <FontAwesomeIcon icon={faPencil} color="#999" />
                </Button>
              </Tooltip>
              <Tooltip placement="top" title="Xóa">
                <Button
                  type="actions"
                  onClick={() => {
                    DeletePost(e.data.PostID);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} color="#999" />
                </Button>
              </Tooltip>
            </div>
          </>
        );
      },
    },

    
  ];
};
