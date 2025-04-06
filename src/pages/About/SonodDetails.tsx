import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { FileText, ArrowLeft } from "lucide-react"
import RightSidebar from "../Home/RightSidebar"
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

  const apiUrl = "https://api.uniontax.gov.bd"

  useEffect(() => {
    const fetchSonod = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/sonod/search?id=${id}`)
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
      </div>

      <RightSidebar />
    </div>
  )
}

export default SonodDetails
