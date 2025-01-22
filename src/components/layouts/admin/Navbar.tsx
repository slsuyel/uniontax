import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import { RootState } from "@/redux/features/store";
// import { clearSonodList } from "@/redux/features/union/unionSlice";
import { setUser } from "@/redux/features/user/userSlice";
import { HomeOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, message } from "antd";
import { useNavigate } from "react-router-dom";

// Define the onClick handler for Profile click

// Define the onClick handler for Logout click

const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const items = [
    {
      label: `${user?.designation} প্রোফাইল`,
      key: "1",
      icon: <UserOutlined />,
      onClick: handleProfileClick,
    },
    {
      label: "লগ আউট",
      key: "2",
      icon: <LogoutOutlined />,
      onClick: handleLogoutClick,
    },
    {
      label: "মেইন সাইট",
      key: "",
      icon: <HomeOutlined />,
      onClick: handleback,
    },
  ];
  const menuProps = {
    items,
  };
  async function handleLogoutClick() {
    localStorage.removeItem("token");
    navigate("/");
    dispatch(setUser(null));
    // dispatch(clearSonodList());
    message.success("Logout successfully");
  }
  function handleProfileClick() {
    navigate("/dashboard/profile");
    // Add your logic here
  }
  function handleback() {
    navigate("/");
    // Add your logic here
  }

  return (
    <div className="d-flex gap-3 align-item-center ">
      <Dropdown.Button
        menu={menuProps}
        placement="bottom"
        icon={<UserOutlined />}
      >
        {user?.designation}
      </Dropdown.Button>
    </div>
  );
};

export default Navbar;
