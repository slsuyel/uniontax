import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useState } from "react";
import useAllServices from "@/hooks/useAllServices";
import { useAppSelector } from "@/redux/features/hooks";
import { RootState } from "@/redux/features/store";
const Header = () => {
  const unionData = useAppSelector((state: RootState) => state.union.unionData);
  const services = useAllServices();

  const navItems = [
    { title: "হোম", link: "/" },
    { title: "ইউপি সেবা পরিচিতি", link: "about" },
    {
      title: "নাগরিক সেবা",
      dropdown: services,
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
    { title: "লগইন", link: "/login" },
  ];
  const navigate = useNavigate();
  const handleService = (service: string) => {
    setNavbarExpanded(false);
    navigate(`/application/${service}`);
  };

  const [navbarExpanded, setNavbarExpanded] = useState(false);
  const closeNavbar = () => {
    setNavbarExpanded(false);
  };

  console.log(unionData);

  return (
    <>
      <div id="mainMenu" className="col-md-12 container mx-auto mt-2">
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
            className="bg-primary-subtle border-0  rounded-0"
          />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="mr-auto main_nav ps-2">
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
                          key={subIndex}
                          onClick={() => handleService(dropdownItem.link)}
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
                      onClick={closeNavbar}
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
    </>
  );
};

export default Header;
