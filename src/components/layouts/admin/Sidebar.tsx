import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;
const { SubMenu } = Menu;

const sidebarItems = [
  { key: 'dashboard', title: 'ড্যাশবোর্ড', slug: '' },
  { key: 'reports', title: 'সকল প্রতিবেদন', slug: '/reports' },
  {
    key: 'profile',
    title: 'ইউনিয়ন প্রোফাইল',
    slug: '/union/profile',
  },
  { key: 'tax', title: 'হোল্ডিং ট্যাক্স', slug: '/holding/tax/' },
  { key: 'fee', title: 'সনদ ফি', slug: '/sonod/fee' },

  // {
  //   key: '1',
  //   title: 'ইজারা',
  //   submenu: [
  //     {
  //       key: '1-1',
  //       title: 'নতুন ইজারা',
  //       slug: '/tenders/list/pending',
  //     },
  //     {
  //       key: '1-2',
  //       title: 'চলমান ইজারা',
  //       slug: '/tenders/list/active',
  //     },
  //     {
  //       key: '1-3',
  //       title: 'নির্বাচন প্রক্রিয়াধীন',
  //       slug: '/tenders/list/proccesing',
  //     },
  //     {
  //       key: '1-4',
  //       title: 'কমপ্লিট ইজারা',
  //       slug: '/tenders/list/Completed',
  //     },
  //   ],
  // },
  {
    key: '2',
    title: 'নাগরিকত্ব সনদ',

    submenu: [
      {
        key: '2-1',
        title: 'নতুন আবেদন',
        slug: '/sonod/Citizenship_certificate/new',
      },
      {
        key: '2-2',
        title: 'অনুমোদিত আবেদন',
        slug: '/sonod/Citizenship_certificate/approved',
      },
      {
        key: '2-3',
        title: 'বাতিল আবেদন',
        slug: '/sonod/Citizenship_certificate/cancel',
      },
    ],
  },
  {
    key: '3',
    title: 'ট্রেড লাইসেন্স',
    submenu: [
      {
        key: '3-1',
        title: 'নতুন আবেদন',
        slug: '/sonod/Trade_license/new',
      },
      {
        key: '3-2',
        title: 'অনুমোদিত আবেদন',
        slug: '/sonod/Trade_license/approved',
      },
      {
        key: '3-3',
        title: 'বাতিল আবেদন',
        slug: '/sonod/Trade_license/cancel',
      },
    ],
  },
  {
    key: '4',
    title: 'ওয়ারিশান সনদ',
    submenu: [
      {
        key: '4-1',
        title: 'নতুন আবেদন',
        slug: '/sonod/Certificate_of_Inheritance/new',
      },
      {
        key: '4-2',
        title: 'অনুমোদিত আবেদন',
        slug: '/sonod/Certificate_of_Inheritance/approved',
      },
      {
        key: '4-3',
        title: 'বাতিল আবেদন',
        slug: '/sonod/Certificate_of_Inheritance/cancel',
      },
    ],
  },
  {
    key: '5',
    title: 'উত্তরাধিকারী সনদ',
    submenu: [
      {
        key: '5-1',
        title: 'নতুন আবেদন',
        slug: '/sonod/Inheritance_certificate/new',
      },
      {
        key: '5-2',
        title: 'অনুমোদিত আবেদন',
        slug: '/sonod/Inheritance_certificate/approved',
      },
      {
        key: '5-3',
        title: 'বাতিল আবেদন',
        slug: '/sonod/Inheritance_certificate/cancel',
      },
    ],
  },
  {
    key: '6',
    title: 'বিবিধ প্রত্যয়নপত্র',
    submenu: [
      {
        key: '6-1',
        title: 'নতুন আবেদন',
        slug: '/sonod/Miscellaneous_certificates/new',
      },
      {
        key: '6-2',
        title: 'অনুমোদিত আবেদন',
        slug: '/sonod/Miscellaneous_certificates/approved',
      },
      {
        key: '6-3',
        title: 'বাতিল আবেদন',
        slug: '/sonod/Miscellaneous_certificates/cancel',
      },
    ],
  },
  {
    key: '7',
    title: 'চারিত্রিক সনদ',
    submenu: [
      {
        key: '7-1',
        title: 'নতুন আবেদন',
        slug: '/sonod/Certificate_of_Character/new',
      },
      {
        key: '7-2',
        title: 'অনুমোদিত আবেদন',
        slug: '/sonod/Certificate_of_Character/approved',
      },
      {
        key: '7-3',
        title: 'বাতিল আবেদন',
        slug: '/sonod/Certificate_of_Character/cancel',
      },
    ],
  },
  {
    key: '8',
    title: 'ভূমিহীন সনদ',
    submenu: [
      {
        key: '8-1',
        title: 'নতুন আবেদন',
        slug: '/sonod/Landless_certificate/new',
      },
      {
        key: '8-2',
        title: 'অনুমোদিত আবেদন',
        slug: '/sonod/Landless_certificate/approved',
      },
      {
        key: '8-3',
        title: 'বাতিল আবেদন',
        slug: '/sonod/Landless_certificate/cancel',
      },
    ],
  },
  {
    key: '9',
    title: 'পারিবারিক সনদ',
    submenu: [
      {
        key: '9-1',
        title: 'নতুন আবেদন',
        slug: '/sonod/Family_certificate/new',
      },
      {
        key: '9-2',
        title: 'অনুমোদিত আবেদন',
        slug: '/sonod/Family_certificate/approved',
      },
      {
        key: '9-3',
        title: 'বাতিল আবেদন',
        slug: '/sonod/Family_certificate/cancel',
      },
    ],
  },
  {
    key: '10',
    title: 'অবিবাহিত সনদ',
    submenu: [
      {
        key: '10-1',
        title: 'নতুন আবেদন',
        slug: '/sonod/Unmarried_certificate/new',
      },
      {
        key: '10-2',
        title: 'অনুমোদিত আবেদন',
        slug: '/sonod/Unmarried_certificate/approved',
      },
      {
        key: '10-3',
        title: 'বাতিল আবেদন',
        slug: '/sonod/Unmarried_certificate/cancel',
      },
    ],
  },
  {
    key: '11',
    title: 'পুনঃ বিবাহ না হওয়া সনদ',
    submenu: [
      {
        key: '11-1',
        title: 'নতুন আবেদন',
        slug: '/sonod/Certificate_of_not_remarrying/new',
      },
      {
        key: '11-2',
        title: 'অনুমোদিত আবেদন',
        slug: '/sonod/Certificate_of_not_remarrying/approved',
      },
      {
        key: '11-3',
        title: 'বাতিল আবেদন',
        slug: '/sonod/Certificate_of_not_remarrying/cancel',
      },
    ],
  },
  {
    key: '12',
    title: 'বার্ষিক আয়ের প্রত্যয়ন',
    submenu: [
      {
        key: '12-1',
        title: 'নতুন আবেদন',
        slug: '/sonod/Certificate_of_annual_income/new',
      },
      {
        key: '12-2',
        title: 'অনুমোদিত আবেদন',
        slug: '/sonod/Certificate_of_annual_income/approved',
      },
      {
        key: '12-3',
        title: 'বাতিল আবেদন',
        slug: '/sonod/Certificate_of_annual_income/cancel',
      },
    ],
  },
  {
    key: '13',
    title: 'একই নামের প্রত্যয়ন',
    submenu: [
      {
        key: '13-1',
        title: 'নতুন আবেদন',
        slug: '/sonod/Certification_of_the_same_name/new',
      },
      {
        key: '13-2',
        title: 'অনুমোদিত আবেদন',
        slug: '/sonod/Certification_of_the_same_name/approved',
      },
      {
        key: '13-3',
        title: 'বাতিল আবেদন',
        slug: '/sonod/Certification_of_the_same_name/cancel',
      },
    ],
  },
  {
    key: '14',
    title: 'প্রতিবন্ধী সনদপত্র',
    submenu: [
      {
        key: '14-1',
        title: 'নতুন আবেদন',
        slug: '/sonod/Disability_application/new',
      },
      {
        key: '14-2',
        title: 'অনুমোদিত আবেদন',
        slug: '/sonod/Disability_application/approved',
      },
      {
        key: '14-3',
        title: 'বাতিল আবেদন',
        slug: '/sonod/Disability_application/cancel',
      },
    ],
  },
  {
    key: '15',
    title: 'অনাপত্তি সনদপত্র',
    submenu: [
      {
        key: '15-1',
        title: 'নতুন আবেদন',
        slug: '/sonod/Certificate_of_No_Objection/new',
      },
      {
        key: '15-2',
        title: 'অনুমোদিত আবেদন',
        slug: '/sonod/Certificate_of_No_Objection/approved',
      },
      {
        key: '15-3',
        title: 'বাতিল আবেদন',
        slug: '/sonod/Certificate_of_No_Objection/cancel',
      },
    ],
  },
  {
    key: '16',
    title: 'আর্থিক অস্বচ্ছলতার সনদপত্র',
    submenu: [
      {
        key: '16-1',
        title: 'নতুন আবেদন',
        slug: '/sonod/Certificate_of_Financial_Insolvency/new',
      },
      {
        key: '16-2',
        title: 'অনুমোদিত আবেদন',
        slug: '/sonod/Certificate_of_Financial_Insolvency/approved',
      },
      {
        key: '16-3',
        title: 'বাতিল আবেদন',
        slug: '/sonod/Certificate_of_Financial_Insolvency/cancel',
      },
    ],
  },
  { key: '17', title: 'ক্যাশ বহি', slug: '/cashbook/list' },
  { key: '18', title: 'Settings', slug: '/settings' },
];

const theme = false;

const Sidebar = () => (
  <Sider
    theme={theme ? 'light' : 'dark'}
    breakpoint="lg"
    collapsedWidth="0"
    style={{
      height: '100vh',
      position: 'sticky',
      top: '0',
      left: '0',
    }}
  >
    <div
      className="border-bottom "
      style={{
        height: '65px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src={'https://school-suyel.netlify.app/assets/dblogo-ixqnXm-n.png'}
        alt=""
        width={150}
      />
    </div>
    <Menu
      theme={theme ? 'light' : 'dark'}
      mode="inline"
      defaultSelectedKeys={['4']}
    >
      {sidebarItems.map(item =>
        item.submenu ? (
          <SubMenu key={item.key} title={item.title}>
            {item.submenu.map(subItem => (
              <Menu.Item key={subItem.key}>
                <Link
                  className="text-decoration-none"
                  to={`/dashboard${subItem.slug}`}
                >
                  {subItem.title}
                </Link>
              </Menu.Item>
            ))}
          </SubMenu>
        ) : (
          <Menu.Item key={item.key}>
            <Link
              className="text-decoration-none"
              to={`/dashboard${item.slug}`}
            >
              {item.title}
            </Link>
          </Menu.Item>
        )
      )}
    </Menu>
  </Sider>
);

export default Sidebar;
