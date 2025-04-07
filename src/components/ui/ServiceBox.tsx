"use client"

import type { RootState } from "@/redux/features/store"
import { useAppSelector } from "@/redux/features/hooks"
import icon2 from "../../assets/icons/trade.png"
import { useNavigate } from "react-router-dom"
import { message, Modal } from "antd"
import { useState } from "react"
import SearchBox from "../reusable/SearchBox"
import './service-box.css'


const ServiceBox = () => {
  const [noUnion, setNoUnion] = useState(false)
  const sonodInfo = useAppSelector((state: RootState) => state.union.sonodList)
  const unionInfo = useAppSelector((state: RootState) => state.union.unionInfo)
    const [selectedService, setSelectedService] = useState<string | null>(null)

  const navigate = useNavigate()

  const handleService = (service: string) => {
    console.log(unionInfo)

    if (unionInfo?.short_name_e === "uniontax") {
      message.warning("অনুগ্রহ করে আপনার ইউনিয়ন নির্বাচন করুন")
      setNoUnion(true)
      setSelectedService(service)
      return
    }
    navigate(`/application/${service}`)
  }

  return (
    <div className="row mx-auto services pt-4">
      <div className="col-md-12 mb-3">
        <h5 className="service-section-title position-relative ps-3 py-2 text-white rounded-2">সেবাসমূহ</h5>
      </div>

      <div className="row g-3">
        {sonodInfo.map((service, index) => (
          <div key={index} className="col-lg-2 col-md-3 col-sm-4 col-6">
            <button
              onClick={() => handleService(service.bnname)}
              className="service-card w-100 h-100 border-0 bg-transparent"
            >
              <div className="service-card-inner p-3 rounded-3 d-flex flex-column align-items-center justify-content-center h-100">
                <div className="service-icon mb-3 d-flex align-items-center justify-content-center rounded-circle">
                  <img loading="lazy" src={icon2 || "/placeholder.svg"} alt="icon2" width={40} height={40} />
                </div>
                <div className="service-title text-center">
                  <h6 className="mb-0 fw-semibold">{service.bnname}</h6>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>

      <div className="col-md-12 mt-5">
        <h5 className="service-section-title position-relative ps-3 py-2 text-white rounded-2">
          ক্যাশলেস ইউনিয়ন পরিষদ সেবা
        </h5>

        <p className="mt-3 lh-base">
          ইউনিয়ন পরিষদ হল বাংলাদেশে পল্লী অঞ্চলের সর্বনিম্ন প্রশাসনিক একক। গ্রাম চৌকিদারি আইনের ১৮৭০ এর অধীনে ইউনিয়ন পরিষদের সৃষ্টি
          হয়। প্রাথমিক পর্যায়ে এর ভূমিকা নিরাপত্তামূলক কর্মকাণ্ডে সীমাবদ্ধ থাকলেও পরবর্তী কালে এটিই স্থানীয় সরকারের প্রাথমিক ইউনিটের ভিত্তিরুপে
          গড়ে উঠে। বর্তমানে ইউনিয়ন পরিষদ থেকে ট্রেড লাইসেন্স, চারিত্রিক সনদপত্র, ভূমিহীন সনদপত্র, ওয়ারিশান সনদপত্র, অবিবাহিত সনদপত্র,
          প্রত্যয়নপত্র, অস্বচ্ছল প্রত্যয়নপত্র, নাগরিক সনদপত্র, উত্তরাধিকার সনদপত্র ইত্যাদি সেবা প্রদান করা হয়। বহুল প্রচলিত এই সকল সেবাকে
          জনবান্ধব করার জন্য একটি ডিজিটাল প্লাটফর্ম অত্যাবশ্যকীয় হয়ে পড়ে। সে লক্ষ্যে ইউনিয়ন পরিষদ থেকে প্রদত্ত সেবাসমূহকে জনগণের কাছে স্বল্প
          খরচে, স্বল্প সময়ে এবং হয়রানিমুক্তভাবে প্রদান নিশ্চিত করার জন্য একটি এ্যাপ্লিকেশন থেকে সকল সেবা প্রদানের নিমিত্ত গত ২০১৯-২০
          অর্থ-বছরে সম্ভব্যতা যাচাইয়ের মাধ্যমে www.uniontax.gov.bd নামক একটি অনলাইন সিস্টেম কার্যক্রম চালু করা হয়। সম্ভব্যতা যাচাইয়ের জন্য
          জিজ্ঞসাবাদের মাধ্যমকে সামনে রেখে প্রথমে একটি ইউনিয়নের সকল ওয়ার্ডের কিছু সংখ্যক মানুষকে দৈব চয়ন ভিত্তিতে চিহ্নিত করে ইউনিয়ন
          পরিষদ প্রদত্ত সেবাসমূহকে ডিজিটালাইজ করার সম্ভবনা যাচাই করা হয়। এই পদ্ধতিতে প্রাপ্ত তথ্যের আলোকে "ইউনিয়ন পরিষদ ডিজিটাল সেবা" নামক
          অনলাইন সফটওয়্যারটি তৈরী করা হয় এবং পরবর্তীতে ২০২০-২০২১ অর্থ বছরে ৩নং তেঁতুলিয়া ইউনিয়ন পরিষদে পাইলটিং হিসেবে চালু করার পর
          সকল ইউনিয়নে বাস্তবায়ন করা হলে আশাব্যঞ্জক সাড়া পাওয়া যায় এবং গত ০৫/১০/২০২১ তারিখে রংপুর বিভাগের মাননীয় বিভাগীয় কমিশনার জনাব মো:
          আব্দুল ওয়াহাব ভূঞা মহোদয় www.uniontax.gov.bd অনলাইন সিস্টেমটির শুভ উদ্বোধন করেন।
        </p>
      </div>

      <Modal
        className="w-100 container mx-auto"
        open={noUnion}
        onCancel={() => setNoUnion(false)}
        footer={null}
        animation="fade-down"
      >
        <div style={{ zIndex: 999 }} className="py-3">
          <h3 className="">ইউনিয়ন নির্বাচন করুন </h3>
          <SearchBox   service={selectedService ?? ""} id={""}  unionname={""}  />
        </div>
      </Modal>
    </div>
  )
}

export default ServiceBox

