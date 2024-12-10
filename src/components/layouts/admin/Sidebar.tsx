/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "@/redux/features/store";
import { useAppSelector } from "@/redux/features/hooks";
import { Badge, Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

const theme = false;

// Define the type for sidebar items
type SidebarItemBase = {
  key: string;
  title: string;
  slug?: string;
  pendingCount?: string | number;
};

type SidebarItemWithSubmenu = SidebarItemBase & {
  submenu: SidebarItem[];
  new_sonod?: number;
};

type SidebarItemWithoutSubmenu = SidebarItemBase & {
  submenu?: never;
};

type SidebarItem = SidebarItemWithSubmenu | SidebarItemWithoutSubmenu;

const Sidebar = () => {
  const sonodInfo = useAppSelector((state: RootState) => state.union.sonodList);

  const sidebarItems: SidebarItem[] = [
    {
      key: "dashboard",
      title: "ড্যাশবোর্ড",
      slug: "",
      pendingCount: 0,
    },
    { key: "reports", title: "সকল প্রতিবেদন", slug: "/reports" },
    {
      key: "profile",
      title: "ইউনিয়ন প্রোফাইল",
      slug: "/union/profile",
    },
    { key: "tax", title: "হোল্ডিং ট্যাক্স", slug: "/holding/tax/" },
    { key: "fee", title: "সনদ ফি", slug: "/sonod/fee" },
    ...sonodInfo.map((sonod) => ({
      key: sonod.id.toString(),
      title: sonod.bnname,
      pendingCount: sonod.pendingCount,
      submenu: [
        {
          key: `${sonod.id}-1`,
          title: "নতুন আবেদন",
          new_sonod: sonod.id,
          slug: `/sonod/${sonod.bnname}/Pending`,
        },
        {
          key: `${sonod.id}-2`,
          title: "অনুমোদিত আবেদন",
          slug: `/sonod/${sonod.bnname}/approved`,
        },
        {
          key: `${sonod.id}-3`,
          title: "বাতিল আবেদন",
          slug: `/sonod/${sonod.bnname}/cancel`,
        },
      ],
    })),
  ];

  return (
    <Sider theme={theme ? "light" : "dark"} breakpoint="lg" collapsedWidth="0">
      <div
        className="border-bottom "
        style={{
          height: "65px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={"https://school-suyel.netlify.app/assets/dblogo-ixqnXm-n.png"}
          alt=""
          width={150}
        />
      </div>
      <Menu
        theme={theme ? "light" : "dark"}
        mode="inline"
        defaultSelectedKeys={["4"]}
      >
        {sidebarItems.map((item) =>
          item.submenu ? (
            <SubMenu
              key={item.key}
              title={
                <>
                  {item.title}{" "}
                  <Badge className="bg-danger rounded-circle p-2">
                    {item.pendingCount}
                  </Badge>
                </>
              }
            >
              {item.submenu.map((subItem) => (
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
                {item.title}{" "}
              </Link>
            </Menu.Item>
          )
        )}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
