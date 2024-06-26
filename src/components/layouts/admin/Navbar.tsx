import { callApi } from '@/utilities/functions';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, message } from 'antd';

const items = [
  {
    label: 'Profile',
    key: '1',
    icon: <UserOutlined />,
    onClick: handleProfileClick,
  },
  {
    label: 'Log Out',
    key: '2', // Use a unique key for each menu item
    icon: <LogoutOutlined />,
    onClick: handleLogoutClick,
  },
];

const menuProps = {
  items,
};

// Define the onClick handler for Profile click
function handleProfileClick() {
  console.log('Profile clicked');
  // Add your logic here
}

// Define the onClick handler for Logout click
async function handleLogoutClick() {
  const res = await callApi('post', '/api/admin/logout');
  if (res.status == 200) {
    window.location.replace('/');
    localStorage.removeItem('token');
    message.success('Logout successfully');
  } else message.error('log out Failed');
}

const Navbar = () => {
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
