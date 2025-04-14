"use client"

import type React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { Search, AlertCircle, FileText } from "lucide-react"

// Interface for the sonod data
interface SonodData {
  id: number
  sonod_name: string
  unioun_name: string
  applicant_name: string
  applicant_father_name: string | null
  applicant_present_word_number: string
  created_at: string
  stutus: string
  payment_status: string
  sonod_Id: string
  prottoyon: string | null
  hasEnData: number
  updated_at: string
  uniqeKey: string
}

// Interface for the API response
interface ApiResponse {
  data: {
    status: string
    data: {
      current_page: number
      data: SonodData[]
    }
  }
}

export default function CitizenSearch() {
  const navigate = useNavigate()
  const location = useLocation()

  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<SonodData[]>([])
  const [error, setError] = useState<string | null>(null)

  
  const apiUrl = import.meta.env.VITE_BASE_API_URL;
    


  // Get query from URL and search
  useEffect(() => {
    const queryParam = new URLSearchParams(location.search).get("q")
    if (queryParam) {
      setSearchQuery(queryParam)
      searchSonod(queryParam)
    }
  }, [location.search])

  const handleSearch = () => {
    if (!searchQuery.trim()) return

    // Update URL
    navigate(`?q=${encodeURIComponent(searchQuery.trim())}`)

    // Search will trigger from useEffect above
  }

  const searchSonod = async (query: string) => {
    setIsSearching(true)
    setError(null)

    try {
      const response = await fetch(`${apiUrl}/my/sonod/search?query=${encodeURIComponent(query)}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Search failed with status: ${response.status}`)
      }

      const responseData: ApiResponse = await response.json()

      if (responseData.data.status === "success" && responseData.data.data.data) {
        setResults(responseData.data.data.data)
      } else {
        setResults([])
      }
    } catch (err) {
      console.error("Search error:", err)
      setError(`সার্চ করার সময় একটি সমস্যা হয়েছে: ${err instanceof Error ? err.message : "Unknown error"}`)
    } finally {
      setIsSearching(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch {
      return dateString
    }
  }

  return (
    <div className="card">
      <div className="card-header bg-danger bg-gradient text-white">
        <h2 className="fs-4 fw-bold mb-0">সনদ অনুসন্ধান</h2>
      </div>

      <div className="card-body">
        {/* Search Box */}
        <div className="row mb-4">
          <div className="col-md-9 mb-3 mb-md-0">
            <div className="input-group">
              <span className="input-group-text">
                <Search size={18} />
              </span>
              <input
                type="text"
                className="form-control"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="সনদ নম্বর, নাম, জাতীয় পরিচয়পত্র নম্বর, জন্ম সনদ নম্বর, পাসপোর্ট নম্বর, বা মোবাইল নম্বর দিয়ে অনুসন্ধান করুন"
              />
            </div>
          </div>
          <div className="col-md-3">
            <button
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="btn btn-danger w-100 d-flex align-items-center justify-content-center"
            >
              {isSearching ? (
                <div className="spinner-border spinner-border-sm me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <Search size={18} className="me-2" />
              )}
              অনুসন্ধান
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="alert alert-danger d-flex align-items-start" role="alert">
            <AlertCircle size={20} className="me-2 mt-1 flex-shrink-0" />
            <div>
              <p className="fw-medium mb-1">{error}</p>
              <p className="small mb-0">সম্ভাব্য কারণ: API সার্ভার অনুপলব্ধ বা CORS সমস্যা।</p>
            </div>
          </div>
        )}

        {/* Results Table */}
        {results.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>সনদ নম্বর</th>
                  <th>সনদের ধরন</th>
                  <th>আবেদনকারীর নাম</th>
                  <th>পিতার নাম</th>
                  <th>ইউনিয়ন</th>
                  <th>ওয়ার্ড নং</th>
                  <th>আবেদনের তারিখ</th>
                  <th>স্টেটাস</th>
                  <th>পেমেন্ট স্টেটাস</th>
                  <th>অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {results.map((item) => (
                  <tr key={item.id}>
                    <td>{item.sonod_Id}</td>
                    <td>{item.sonod_name}</td>
                    <td className="fw-medium">{item.applicant_name}</td>
                    <td>{item.applicant_father_name || "-"}</td>
                    <td>{item.unioun_name}</td>
                    <td>{item.applicant_present_word_number}</td>
                    <td>{formatDate(item.created_at)}</td>
                    <td>
                      <span
                        className={`badge ${
                          item.stutus.toLowerCase() === "approved"
                            ? "bg-success"
                            : item.stutus.toLowerCase() === "pending"
                            ? "bg-warning"
                            : item.stutus.toLowerCase() === "cancel"
                            ? "bg-danger"
                            : "bg-secondary"
                        }`}
                      >
                        {item.stutus}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${item.payment_status === "Paid" ? "bg-success" : "bg-danger"}`}>
                        {item.payment_status}
                      </span>
                    </td>
                    <td>
                      {item.stutus === "Pepaid" && item.payment_status === "Unpaid" ? (
                        <a
                          href={`${apiUrl}/create/payment?sonod_id=${item.id}&s_uri=${window.location.origin}/payment-success&f_uri=${window.location.origin}/payment-failed&c_uri=${window.location.origin}/payment-cancel&hasEnData=${item.hasEnData}`}
                          className="btn btn-sm btn-primary d-flex align-items-center"
                        >
                          <FileText size={14} className="me-1" />
                          পেমেন্ট করুন
                        </a>
                      ) : (
                        <button
                          className="btn btn-sm btn-danger d-flex align-items-center"
                          onClick={() => navigate(`/sonod-details/${item.uniqeKey}`)}
                        >
                          <FileText size={14} className="me-1" />
                          বিস্তারিত
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : !isSearching && searchQuery.trim() !== "" ? (
          <div className="text-center py-4 bg-light rounded border">
            <p className="text-secondary mb-0">কোন ফলাফল পাওয়া যায়নি</p>
          </div>
        ) : null}

        {/* Initial empty state */}
        {!isSearching && results.length === 0 && !error && searchQuery.trim() === "" && (
          <div className="text-center py-5 bg-light rounded border border-dashed">
            <div className="d-flex align-items-center justify-content-center mb-3">
              <div className="bg-danger bg-opacity-10 rounded-circle p-3">
                <Search size={32} className="text-danger" />
              </div>
            </div>
            <h3 className="fs-5 fw-medium mb-2">সনদ অনুসন্ধান করুন</h3>
            <p className="text-secondary mx-auto" style={{ maxWidth: "500px" }}>
              সনদ নম্বর, নাম, বা মোবাইল নম্বর দিয়ে আপনার সনদ সম্পর্কিত তথ্য অনুসন্ধান করুন
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
