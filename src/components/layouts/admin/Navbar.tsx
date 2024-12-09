import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, message } from "antd";
import { useNavigate } from "react-router-dom";

// Define the onClick handler for Profile click
function handleProfileClick() {
  console.log("Profile clicked");
  // Add your logic here
}

// Define the onClick handler for Logout click

const Navbar = () => {
  const items = [
    {
      label: "Profile",
      key: "1",
      icon: <UserOutlined />,
      onClick: handleProfileClick,
    },
    {
      label: "Log Out",
      key: "2", // Use a unique key for each menu item
      icon: <LogoutOutlined />,
      onClick: handleLogoutClick,
    },
  ];

  const navigate = useNavigate();

  const menuProps = {
    items,
  };
  async function handleLogoutClick() {
    localStorage.removeItem("token");
    navigate("/");
    message.success("Logout successfully");
  }

  return (
    <div className="d-flex gap-3 align-item-center ">
      <Dropdown.Button
        menu={menuProps}
        placement="bottom"
        icon={<UserOutlined />}
      >
        Admin
      </Dropdown.Button>
    </div>
  );
};

export default Navbar;
