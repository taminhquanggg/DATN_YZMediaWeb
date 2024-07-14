import { Button, Checkbox, Form, Input } from "antd";

import { useLoginApi } from "../../apiHelper/api/login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import md5 from "md5";
import { saveUserToStorage, getUserFromStorage } from "../../store/actions/sharedActions";

const Index = () => {
  const [form] = Form.useForm();
  const apiClient = useLoginApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    let param = {
      UserName: values?.UserName,
      Password: md5(values?.Password),
      Type: "password",
    };

    apiClient
      .Login(param)
      .then((res) => {
        if (res != undefined && res.status === 200 && res.data.UserID > 0) {
          saveUserToStorage(res.data);
          dispatch({ type: "SET_USER", payload: res.data });

          if (values.remember === true) {
            localStorage.setItem(
              "userRemember",
              JSON.stringify({
                UserName: values?.txtUsername,
                Password: values?.pwbPassword,
                Remember: values?.remember,
              })
            );
          }

          toast.success("Đăng nhập thành công");
          navigate("/");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Đăng nhập thất bại, vui lòng kiểm tra máy chủ !");
      });
  };
  return (
    <>
      <div className="w-screen h-screen flex bg-blue-500 overflow-auto">
        <div className="m-auto rounded-xl py-20 px-6 bg-white shadow-lg shadow-indigo-500/40 w-96">
          <div className="font-bold text-2xl mb-10 uppercase">Đăng nhập</div>
          <Form
            form={form}
            onFinish={onFinish}
            className="login-form"
            initialValues={{
              remember: true,
            }}
          >
            <div className="flex flex-col gap-3">
              <Form.Item
                label="Tài khoản"
                name={"UserName"}
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống",
                  },
                ]}
              >
                <Input placeholder="Username" className="h-10 rounded-3xl" />
              </Form.Item>
              <Form.Item
                label="Mật khẩu"
                name={"Password"}
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống",
                  },
                ]}
              >
                <Input type="password" placeholder="Password" className="h-10  rounded-3xl" />
              </Form.Item>

              <div className="ant-form-remember flex ">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Nhớ mật khẩu</Checkbox>
                </Form.Item>
              </div>
              <div className="login_footer w-full">
                <Button type="primary" className="w-full h-12  rounded-3xl" htmlType="submit">
                  Đăng nhập
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Index;
