import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { FileText, ArrowLeft } from "lucide-react"
import RightSidebar from "../Home/RightSidebar"
import type { RootState } from "@/redux/features/store"
import { useAppSelector } from "@/redux/features/hooks"
import { Modal } from "antd"
import icon2 from "../../assets/icons/trade.png"
import SearchBox from "../../components/reusable/SearchBox" //../reusable/SearchBox
// import CitizenSearch from "../../components/CitizenSearch"

interface SonodData {
  id: number
  sonod_name: string
  applicant_name: string
  applicant_father_name: string
  unioun_name: string
  applicant_present_word_number: string
  created_at: string
  stutus: string
  payment_status: string
  sonod_Id: string
  prottoyon: string | null
}

const SonodDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [sonod, setSonod] = useState<SonodData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  
  const apiUrl = import.meta.env.VITE_BASE_DOC_URL;

 const [noUnion, setNoUnion] = useState(false)

 // Define the baseUrl variable

 const baseUrl = window.origin;
  const sonodInfo = useAppSelector((state: RootState) => state.union.sonodList)
  // Removed unused unionInfo variable

  // Removed unused navigate declaration


      const handleService = (service: string, unionName?: string) => {
    

        
        if (service) {
      setSelectedService(service)
      const domain = baseUrl.includes("uniontax")
        ? "uniontax.gov.bd"
        : baseUrl.includes("unionservices")
        ? "unionservices.gov.bd"
        : baseUrl.split("//")[1].split(".").slice(-2).join(".");
      window.location.href = `http://${unionName}.${domain}/application/${service}${id ? `?id=${id}` : ""}`;
    } else {
      const domain = baseUrl.includes("uniontax")
        ? "uniontax.gov.bd"
        : baseUrl.includes("unionservices")
        ? "unionservices.gov.bd"
        : baseUrl.split("//")[1];
      window.location.href = `http://${unionName}.${domain}`;
    }


    
        // if (unionInfo?.short_name_e === "uniontax") {
        //   message.warning("অনুগ্রহ করে আপনার ইউনিয়ন নির্বাচন করুন")
        //   setNoUnion(true)
        //   setSelectedService(service)
        //   return
        // }
        // navigate(`/application/${service}?id=${id}`)
      }






  useEffect(() => {
    const fetchSonod = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/sonod/search?uniqeKey=${id}`)
        if (!response.ok) throw new Error("Failed to fetch sonod details")
        const res = await response.json()
        console.log(res)
        if (res.data && res.status_code === 200) {
          setSonod(res.data)
        } else {
          throw new Error("Invalid response format")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchSonod()
  }, [id])

  return (
    <div className="row mx-auto container my-3">
      <div className="col-md-9">
        {/* <CitizenSearch /> */}

        {loading && <p className="text-center my-4">লোড হচ্ছে...</p>}
        {error && <p className="text-danger text-center my-4">ভুল হয়েছে: {error}</p>}
        {!sonod && !loading && !error && (
          <p className="text-center my-4">সনদ পাওয়া যায়নি</p>
        )}

        {sonod && (
          <div className="card mt-3">
            <div className="card-header d-flex justify-content-between align-items-center bg-success text-white">
              <h4 className="mb-0">সনদ বিস্তারিত</h4>
              <Link to="/" className="btn btn-light btn-sm">
                <ArrowLeft size={16} className="me-1" />
                ফিরে যান
              </Link>
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th>সনদ নাম্বার</th>
                    <td>{sonod.sonod_Id}</td>
                  </tr>
                  <tr>
                    <th>সনদের ধরন</th>
                    <td>{sonod.sonod_name}</td>
                  </tr>
                  <tr>
                    <th>আবেদনকারীর নাম</th>
                    <td>{sonod.applicant_name}</td>
                  </tr>
                  <tr>
                    <th>পিতার নাম</th>
                    <td>{sonod.applicant_father_name}</td>
                  </tr>
                  <tr>
                    <th>ইউনিয়ন</th>
                    <td>{sonod.unioun_name}</td>
                  </tr>
                  <tr>
                    <th>ওয়ার্ড</th>
                    <td>{sonod.applicant_present_word_number}</td>
                  </tr>
                  <tr>
                    <th>আবেদনের তারিখ</th>
                    <td>{new Date(sonod.created_at).toLocaleDateString("bn-BD")}</td>
                  </tr>
                  <tr>
                    <th>স্টেটাস</th>
                    <td>
                      <span className={`badge ${sonod.stutus === "approved" ? "bg-success" : "bg-warning"}`}>
                        {sonod.stutus}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>পেমেন্ট</th>
                    <td>
                      <span className={`badge ${sonod.payment_status === "Paid" ? "bg-success" : "bg-danger"}`}>
                        {sonod.payment_status}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              {sonod.prottoyon && (
                <a
                  href={`${apiUrl}/prottoyon/${sonod.prottoyon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-3"
                >
                  <FileText size={16} className="me-1" />
                  প্রিন্ট করুন
                </a>
              )}
            </div>
          </div>
        )}



<div className="row mx-auto services pt-4">
      <div className="col-md-12 mb-3">
        <h5 className="service-section-title position-relative ps-3 py-2 text-white rounded-2">সেবাসমূহ</h5>
      </div>

      <div className="row g-3">
        {sonodInfo.map((service, index) => (
          <div key={index} className="col-lg-2 col-md-3 col-sm-4 col-6">
            <button
              onClick={() => handleService(service.bnname,sonod?.unioun_name)}
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
      </div>












      </div>

      <RightSidebar />

        <Modal
          className="w-100 container mx-auto"
          open={noUnion}
          onCancel={() => setNoUnion(false)}
          footer={null}
          animation="fade-down"
        >
          <div style={{ zIndex: 999 }} className="py-3">
            <h3 className="">ইউনিয়ন নির্বাচন করুন </h3>
            <SearchBox unionname={sonod?.unioun_name ?? ""} service={selectedService ?? ""} id={id ?? ""}  />
          </div>
        </Modal>
    </div>
  )
}

export default SonodDetails
