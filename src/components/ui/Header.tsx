import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
const Header = () => {
  const navItems = [
    { title: 'হোম', link: '/' },
    { title: 'ইউপি সেবা পরিচিতি', link: '' },
    {
      title: 'নাগরিক সেবা',
      dropdown: [
        { title: 'নাগরিকত্ব সনদ', link: 'about' },
        { title: 'ট্রেড লাইসেন্স', link: 'about' },
        { title: 'ওয়ারিশান সনদ', link: 'about' },
        { title: 'উত্তরাধিকারী সনদ', link: 'about' },
        { title: 'বিবিধ প্রত্যয়নপত্র', link: 'about' },
        { title: 'চারিত্রিক সনদ', link: 'about' },
        { title: 'ভূমিহীন সনদ', link: 'about' },
        { title: 'পারিবারিক সনদ', link: 'about' },
        { title: 'অবিবাহিত সনদ', link: 'about' },
        { title: 'পুনঃ বিবাহ না হওয়া সনদ', link: 'about' },
        { title: 'বার্ষিক আয়ের প্রত্যয়ন', link: 'about' },
        { title: 'একই নামের প্রত্যয়ন', link: 'about' },
        { title: 'প্রতিবন্ধী সনদপত্র', link: 'about' },
        { title: 'অনাপত্তি সনদপত্র', link: 'about' },
        { title: 'আর্থিক অস্বচ্ছলতার সনদপত্র', link: 'about' },
      ],
    },
    {
      title: 'অন্যান্য',
      dropdown: [
        {
          title: 'জন্ম নিবন্ধন সনদের আবেদন',
          link: 'https://bdris.gov.bd/br/application',
          target: '_blank',
        },
        {
          title: 'মৃত্যু নিবন্ধন সনদের আবেদন',
          link: 'https://bdris.gov.bd/dr/application',
          target: '_blank',
        },
      ],
    },
    { title: 'সনদ যাচাই', link: '/sonod/search' },
    { title: 'নোটিশ', link: '/notice' },
    { title: 'ইজারা', link: '/notice/tenders' },
    { title: 'যোগাযোগ', link: '/contact' },
    { title: 'হোল্ডিং ট্যাক্স', link: '/holding/tax' },
    { title: 'নাগরিক কর্নার', link: '/citizens_corner' },
    { title: 'লগইন', link: '/login' },
  ];

  const handleService = (service: string) => {
    console.log(service);
  };

  return (
    <>
      <div id="mainMenu" className="col-md-12 container mx-auto">
        <Navbar expand="lg" className="py-0" bg="light" variant="light">
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="mr-auto main_nav">
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
