const footerLinks = [
  {
    title: "গুরুত্বপূর্ণ লিংক",
    links: [
      { text: "রাষ্ট্রপতির কার্যালয়", url: "http://www.bangabhaban.gov.bd/" },
      { text: "প্রধানমন্ত্রীর কার্যালয়", url: "http://www.pmo.gov.bd" },
      { text: "জাতীয় সংসদ", url: "http://www.parliament.gov.bd/" },
      { text: "জনপ্রশাসন মন্ত্রণালয়", url: "http://mopa.gov.bd" },
      { text: "জাতীয় তথ্য বাতায়ন", url: "http://www.bangladesh.gov.bd" },
      { text: "পঞ্চগড় জেলা", url: "http://www.panchagarh.gov.bd/" },
      { text: "তেঁতুলিয়া উপজেলা", url: "http://tetulia.panchagarh.gov.bd/" },
    ],
  },
  {
    title: "অন্যান্য",
    links: [
      { text: "বাংলাদেশ ফরম", url: "http://forms.mygov.bd/" },
      { text: "ই-বুক", url: "http://www.ebook.gov.bd/" },
      { text: "সকল ই-সেবা", url: "https://www.mygov.bd/" },
      { text: "পাসপোর্টের আবেদন", url: "http://mopa.gov.bd" },
      { text: "ই-চালান", url: "http://echallan.gov.bd/" },
      { text: "ভূমি সেবা", url: "https://ldtax.gov.bd/" },
      { text: "এটুআই", url: "https://a2i.gov.bd/" },
    ],
  },
  {
    title: "ইজারা নোটিশ বোর্ড",
    links: [
      { text: "৭নং দেবনগড় ইউনিয়নের পাথরবালি ইজারা", url: "/tenderview/9" },
      { text: "“বিবিধ পণ্য পরিবহনের উপর পারমিট ফিস”", url: "/tenderview/8" },
      { text: "“পশু জবাই ফিস”", url: "/tenderview/7" },
      { text: "বিবিধ পণ্য পরিবহন পারমটি ফিস", url: "/tenderview/4" },
      { text: "0৭নং দেবনগড় ইউনিয়নের পাথরবালি ইজারা", url: "/tenderview/3" },
      { text: "তেতুলিয়া মহানন্দা নদীর পাথরঘাট ইজারা", url: "/tenderview/2" },
    ],
  },
];
import sos from "../../assets/icons/sos.png";
import ekpay from "../../assets/images/ekpay.webp";
import { CheckCircleOutlined } from "@ant-design/icons";

const Footer = () => {
  const baseUrl = window.origin;
  return (
    <>
      <div className="row mx-auto container">
        {footerLinks.map((section, index) => (
          <div key={index} className="col-md-4">
            <div className="imbox">
              <div className="sidebarTitle mb-3 defaltColor">
                <h4 className="text-center">{section.title}</h4>
              </div>
              <ul
                className="list-unstyled importantLInk"
                style={{ padding: "0px 11px" }}
              >
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <CheckCircleOutlined className="defaltTextColor me-1" />
                    <a
                      href={link.url}
                      title={link.text}
                      className="defaltTextColor text-decoration-none"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <footer className="container">
        <div className="footer_top_bg" />{" "}
        <div className="footerBottom">
          <div className="row">
            <div className="col-md-4">
              <ul className="footerList">
                <b> পরিকল্পনা ও বাস্তবায়নে:</b> <br />
                সোহাগ চন্দ্র সাহা
                <br />
                সিনিয়র সহকারী সচিব (ওএসডি) <br /> জনপ্রশাসন মন্ত্রণালয়
              </ul>
            </div>{" "}
            <div className="col-md-4">
              <ul className="footerList">
                <li
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    loading="lazy"
                    src="/bangladesh-govt.png"
                    alt="bangladesh"
                    height={"auto"}
                    width={50}
                  />{" "}
                  <span style={{ padding: "0px 15px" }}>
                    <b> ব্যবস্থাপনা ও তত্ত্বাবধানে:</b> <br />
                    {baseUrl.includes("unionservices")
                      ? "বিভাগীয় কমিশনারের কার্যালয়, রংপুর"
                      : " জেলা প্রশাসন,পঞ্চগড়। "}
                  </span>
                </li>
              </ul>
            </div>{" "}
            <div className="col-md-4">
              <ul className="footerList">
                <li
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img loading="lazy" src={sos} alt="sys" width={40}  height={"auto"} />{" "}
                  <span style={{ padding: "0px 15px" }}>
                    <b> কারিগরি সহায়তায়:</b> <br />{" "}
                    <a
                      target="_blank"
                      className="text-decoration-none text-black"
                      href="https://softwebsys.com/"
                    >
                      {" "}
                      সফটওয়েব সিস্টেম সল্যুশন
                    </a>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>{" "}
        <div className="footerpayment row">
          <div className="col-md-2" />{" "}
          <div className="col-md-8">
            <img loading="lazy" src={ekpay} width="100%"  height={"auto"} alt="sys" />
          </div>{" "}
          <div className="col-md-2" />
        </div>
      </footer>
    </>
  );
};
export default Footer;
