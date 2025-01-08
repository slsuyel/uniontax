/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "@/redux/features/store";
import { useAppSelector } from "@/redux/features/hooks";
import { Badge, Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import mainLogo from "/main_logo.png";
const { Sider } = Layout;

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

export type SidebarItem = SidebarItemWithSubmenu | SidebarItemWithoutSubmenu;

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
    { key: "failed", title: "পেমেন্ট ফেইল্ড ", slug: "/payment-failed" },
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

  // Map sidebarItems to Ant Design Menu items format
  const menuItems = sidebarItems.map((item) => {
    if (item.submenu) {
      return {
        key: item.key,
        label: (
          <>
            <span className="text-white">{item.title}</span>{" "}
            <Badge className="bg-danger rounded-circle p-2 p-auto text-white">
              {item.pendingCount}
            </Badge>
          </>
        ),
        children: item.submenu.map((subItem) => ({
          key: subItem.key,
          label: (
            <Link
              className="text-decoration-none text-white"
              to={`/dashboard${subItem.slug}`}
            >
              {subItem.title}
            </Link>
          ),
        })),
      };
    }

    return {
      key: item.key,
      label: (
        <Link
          className="text-decoration-none text-white"
          to={`/dashboard${item.slug}`}
        >
          {item.title}
        </Link>
      ),
    };
  });

  return (
    <Sider
      theme={theme ? "light" : "dark"}
      breakpoint="lg"
      collapsedWidth="0"
      style={{ background: "#00b7b7" }}
    >
      <div
        className="border-bottom "
        style={{
          height: "65px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={mainLogo} alt="" width={160} />
      </div>
      <Menu
        style={{ background: "#191f25" }}
        theme={theme ? "light" : "dark"}
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={menuItems} // Use items prop
      />
    </Sider>
  );
};

export default Sidebar;
