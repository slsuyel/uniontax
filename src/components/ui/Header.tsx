import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useState } from "react";

import { useAppSelector } from "@/redux/features/hooks";
import { RootState } from "@/redux/features/store";
import { message, Modal } from "antd";
import SearchBox from "../reusable/SearchBox";


const Header = () => {
  const userInfo = useAppSelector((state: RootState) => state.user.user);
  const [noUnion, setNoUnion] = useState(false);
  const sonodInfo = useAppSelector((state: RootState) => state.union.sonodList);
  const unionInfo = useAppSelector((state: RootState) => state.union.unionInfo);
  const site_settings = useAppSelector((state: RootState) => state.union.site_settings);

  const navItems = [
    { title: "হোম", link: "/" },
    { title:  site_settings?.about_title || "", link: "about" },
    {
      title: "নাগরিক সেবা",
      dropdown: sonodInfo?.map((sonod) => ({
        title: sonod?.bnname,
        link: `/application/${sonod?.bnname}`,
      })),
    },
    {
      title: "অন্যান্য",
      dropdown: [
        {
          title: "জন্ম নিবন্ধন সনদের আবেদন",
          link: "https://bdris.gov.bd/br/application",
          target: "_blank",
        },
        {
          title: "মৃত্যু নিবন্ধন সনদের আবেদন",
          link: "https://bdris.gov.bd/dr/application",
          target: "_blank",
        },
      ],
    },
    { title: "সনদ যাচাই", link: "/sonod/search" },
    { title: "নোটিশ", link: "/notice" },
    { title: "ইজারা", link: "/tenders" },
    { title: "যোগাযোগ", link: "/contact" },
    { title: "হোল্ডিং ট্যাক্স", link: "/holding/tax" },
    { title: "নাগরিক কর্নার", link: "/citizens_corner" },
    {
      title: userInfo ? "ড্যাশবোর্ড" : "লগইন",
      link: "/login",
    },
  ];

  const navigate = useNavigate();

  const handleService = (serviceLink: string) => {
    if (unionInfo?.short_name_e == "uniontax") {
      message.warning(site_settings?.header_union_select_title || "");
      setNoUnion(true);
      return;
    }
    setNavbarExpanded(false);
    navigate(serviceLink);
  };

  const [navbarExpanded, setNavbarExpanded] = useState(false);

  return (
    <>
      <div id="mainMenu" className="container mx-auto mt-2">
        <Navbar
          expand="lg"
          className="py-0"
          bg="light"
          variant="light"
          expanded={navbarExpanded}
        >
          <Navbar.Toggle
            onClick={() => setNavbarExpanded(!navbarExpanded)}
            aria-controls="navbarSupportedContent"
            aria-label="Toggle navigation"
            className="bg-primary-subtle border-0 rounded-0"
          />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="me-auto main_nav ps-2">
              {navItems.map((item, index) => {
                if (item.dropdown) {
                  return (
                    <NavDropdown
                      className="border-end nav_a_color"
                      title={item.title}
                      id={`navbarDropdown${index}`}
                      key={index}
                    >
                      {item.dropdown.map((dropdownItem, subIndex) => (
                        <NavDropdown.Item
                          className="border-top text-white border-danger-subtle"
                          key={`${index}-${subIndex}`}
                          onClick={() => {
                            setNavbarExpanded(false);
                            dropdownItem.link.startsWith("http")
                              ? window.open(dropdownItem.link, "_blank")
                              : handleService(dropdownItem.link);
                          }}
                        >
                          {dropdownItem.title}
                        </NavDropdown.Item>
                      ))}
                    </NavDropdown>
                  );
                } else {
                  return (
                    <Nav.Link
                      key={index}
                      as={Link}
                      to={item.link}
                      className="border-end text-white"
                      onClick={() => setNavbarExpanded(false)}
                    >
                      {item.title}
                    </Nav.Link>
                  );
                }
              })}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

      <div className="container mx-auto row">
        <Marquee className="defaltColor py-1 text-white">
          <span style={{ fontSize: 16 }}>
            ইউনিয়ন পরিষদের ডিজিটাল অনলাইন সেবা সিস্টেম uniontax.gov.bd –তে
            আপনাকে স্বাগতম।
          </span>
        </Marquee>
      </div>

      <Modal
        className="w-100 container mx-auto"
        open={noUnion}
        onCancel={() => setNoUnion(false)}
        footer={null}
        animation="fade-down"
      >
        <div style={{ zIndex: 999 }} className="py-3">
          <h3 className="">{site_settings?.header_union_select_title || ""}</h3>
            <SearchBox service={""} id={""} unionname={""} />
        </div>
      </Modal>
    </>
  );
};

export default Header;
