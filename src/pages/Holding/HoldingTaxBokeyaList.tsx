"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface TaxpayerData {
  maliker_name: string
  holding_no: string
  word_no: string
  nid_no: string
  mobile_no: string
  total_price: number
}

interface ApiResponse {
  data: {
    word: string
    data: TaxpayerData[]
  }
  isError: boolean
  error: string | null
  status_code: number
}

export default function HoldingTaxBokeyaList() {
  const [searchWord, setSearchWord] = useState("1")
  const [taxpayers, setTaxpayers] = useState<TaxpayerData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedTaxpayers, setSelectedTaxpayers] = useState<Set<number>>(new Set())
  const [sendingSms, setSendingSms] = useState(false)
  const [smsSuccess, setSmsSuccess] = useState<string | null>(null)

  const checkAuthentication = () => {
    const token = localStorage.getItem("token")
    if (!token) {
      setError("অথেন্টিকেশন টোকেন পাওয়া যায়নি। অনুগ্রহ করে প্রথমে লগইন করুন।")
      return false
    }
    return true
  }

  const fetchTaxpayers = async (word: string) => {
    if (!word.trim()) {
      setError("অনুগ্রহ করে ওয়ার্ড নম্বর লিখুন")
      return
    }

    setLoading(true)
    setError(null)
    setHasSearched(true)

    try {
      const apiUrl = import.meta.env.VITE_BASE_API_URL
      if (!apiUrl) {
        throw new Error("API URL কনফিগার করা হয়নি")
      }

      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("অথেন্টিকেশন টোকেন পাওয়া যায়নি। অনুগ্রহ করে আবার লগইন করুন।")
      }

      const headers: HeadersInit = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }

      const response = await fetch(`${apiUrl}/user/holdingtax/bokeya/list?word=${encodeURIComponent(word)}`, {
        method: "GET",
        headers: headers,
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("অথেন্টিকেশন ব্যর্থ। অনুগ্রহ করে আবার লগইন করুন।")
        }
        throw new Error(`HTTP ত্রুটি! স্ট্যাটাস: ${response.status}`)
      }

      const data: ApiResponse = await response.json()

      if (data.isError) {
        throw new Error(data.error || "ডেটা আনতে একটি ত্রুটি হয়েছে")
      }

      setTaxpayers(data.data.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "ডেটা আনতে ব্যর্থ")
      setTaxpayers([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (checkAuthentication()) {
      fetchTaxpayers(searchWord)
    }
  }

  useEffect(() => {
    if (checkAuthentication()) {
      fetchTaxpayers("1")
    }
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const getTotalAmount = () => {
    return taxpayers.reduce((sum, taxpayer) => sum + taxpayer.total_price, 0)
  }

  const handleSelectTaxpayer = (index: number) => {
    const newSelected = new Set(selectedTaxpayers)
    if (newSelected.has(index)) {
      newSelected.delete(index)
    } else {
      newSelected.add(index)
    }
    setSelectedTaxpayers(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedTaxpayers.size === taxpayers.length) {
      setSelectedTaxpayers(new Set())
    } else {
      setSelectedTaxpayers(new Set(taxpayers.map((_, index) => index)))
    }
  }

  const sendSms = async () => {
    if (selectedTaxpayers.size === 0) {
      setError("SMS পাঠানোর জন্য অন্তত একটি রেকর্ড নির্বাচন করুন")
      return
    }

    setSendingSms(true)
    setError(null)
    setSmsSuccess(null)

    try {
      const apiUrl = import.meta.env.VITE_BASE_API_URL
      if (!apiUrl) {
        throw new Error("API URL কনফিগার করা হয়নি")
      }

      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("অথেন্টিকেশন টোকেন পাওয়া যায়নি। অনুগ্রহ করে আবার লগইন করুন।")
      }

      const selectedData = Array.from(selectedTaxpayers).map((index) => taxpayers[index])

      const headers: HeadersInit = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }

      const response = await fetch(`${apiUrl}/user/holdingtax/bokeya/sms/send`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          holdingtax: selectedData,
        }),
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("অথেন্টিকেশন ব্যর্থ। অনুগ্রহ করে আবার লগইন করুন।")
        }
        throw new Error(`HTTP ত্রুটি! স্ট্যাটাস: ${response.status}`)
      }

      const result = await response.json()

      if (result.isError) {
        throw new Error(result.error || "SMS পাঠাতে ব্যর্থ")
      }
      // console.log(result);
      setSmsSuccess(result.data.message)
      setSelectedTaxpayers(new Set())
    } catch (err) {
      setError(err instanceof Error ? err.message : "SMS পাঠাতে ব্যর্থ")
    } finally {
      setSendingSms(false)
    }
  }

  return (
    <div className="bg-light min-vh-100">
      {/* Hero Section */}


      <div className="container">
        {/* Search Section */}
        <div className="row mb-4">
          <div className="col-lg-8 mx-auto">
            <h4 className="mb-3 text-center fw-bold text-primary">
              হোল্ডিং ট্যাক্স বকেয়া তালিকা
            </h4>
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title mb-0">
                  <i className="bi bi-search me-2"></i>
                  অনুসন্ধান প্যারামিটার
                </h5>
              </div>
              <div className="card-body">
                <p className="text-muted mb-4">হোল্ডিং ট্যাক্স বকেয়া রেকর্ড খোঁজার জন্য ওয়ার্ড নম্বর নির্বাচন করুন</p>
                <form onSubmit={handleSearch}>
                  <div className="row g-3">
                    <div className="col-md-8">
                      <div className="input-group">
                        <span className="input-group-text bg-primary text-white">
                          <i className="bi bi-hash"></i>
                        </span>
                        <select
                          className="form-select"
                          value={searchWord}
                          onChange={(e) => setSearchWord(e.target.value)}
                          required
                        >
                          <option value="">ওয়ার্ড নম্বর বাছাই করুন</option>
                          {[...Array(9)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            খোঁজা হচ্ছে...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-search me-2"></i>
                            রেকর্ড খুঁজুন
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>



        {/* Error Alert */}
        {error && (
          <div className="row mb-4">
            <div className="col-lg-8 mx-auto">
              <div className="alert alert-danger d-flex align-items-center" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-3 fs-4"></i>
                <div>{error}</div>
              </div>
            </div>
          </div>
        )}

        {/* Success Alert */}
        {smsSuccess && (
          <div className="row mb-4">
            <div className="col-lg-8 mx-auto">
              <div className="alert alert-success d-flex align-items-center" role="alert">
                <i className="bi bi-check-circle-fill me-3 fs-4"></i>
                <div>{smsSuccess}</div>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {hasSearched && !loading && !error && (
          <div className="row">
            <div className="col-12">
              <div className="card shadow">
                {/* Results Header */}
                <div className="card-header bg-primary text-white">
                  <div className="row align-items-center">
                    <div className="col-md-8">
                      <h5 className="card-title mb-1">
                        <i className="bi bi-list-ul me-2"></i>
                        বকেয়া রেকর্ড
                      </h5>
                      <p className="card-text mb-0">
                        {taxpayers.length > 0
                          ? `ওয়ার্ড "${searchWord}" এর জন্য ${taxpayers.length} টি রেকর্ড পাওয়া গেছে`
                          : `ওয়ার্ড "${searchWord}" এর জন্য কোন রেকর্ড পাওয়া যায়নি`}
                      </p>
                    </div>
                    {taxpayers.length > 0 && (
                      <div className="col-md-4 text-end">
                        <div className="bg-light text-dark p-3 rounded">
                          <div className="small text-muted">মোট বকেয়া</div>
                          <div className="h5 mb-0 text-danger fw-bold">
                            <i className="bi bi-currency-exchange me-1"></i>
                            {formatCurrency(getTotalAmount())}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {taxpayers.length > 0 && (
                  <div className="card-header bg-light border-top">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <div className="d-flex align-items-center">
                          <span className="text-primary me-3 fw-bold">
                            <i className="bi bi-check-square me-2"></i>
                            {taxpayers.length} এর মধ্যে {selectedTaxpayers.size} টি নির্বাচিত
                          </span>
                          {selectedTaxpayers.size > 0 && (
                            <button
                              type="button"
                              className="btn btn-outline-secondary btn-sm me-2"
                              onClick={() => setSelectedTaxpayers(new Set())}
                            >
                              <i className="bi bi-x-circle me-1"></i>
                              নির্বাচন মুছুন
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 text-md-end">
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={sendSms}
                          disabled={selectedTaxpayers.size === 0 || sendingSms}
                        >
                          {sendingSms ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              SMS পাঠানো হচ্ছে...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-chat-text me-2"></i>
                              SMS পাঠান ({selectedTaxpayers.size})
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="card-body p-0">
                  {taxpayers.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="">
                          <tr>
                            <th scope="col" style={{ width: "50px" }}>
                              <div className="form-check">
                                <input
                                  className="form-check-input border-primary"
                                  type="checkbox"
                                  id="selectAll"
                                  checked={taxpayers.length > 0 && selectedTaxpayers.size === taxpayers.length}
                                  onChange={handleSelectAll}
                                />
                                <label className="form-check-label" htmlFor="selectAll">
                                  <span className="visually-hidden">সব নির্বাচন করুন</span>
                                </label>
                              </div>
                            </th>
                            <th scope="col" style={{ width: "80px" }}>
                              ক্রমিক
                            </th>
                            <th scope="col">মালিকের নাম</th>
                            <th scope="col" style={{ width: "120px" }}>
                              হোল্ডিং নং
                            </th>
                            <th scope="col" style={{ width: "100px" }}>
                              ওয়ার্ড নং
                            </th>
                            <th scope="col">জাতীয় পরিচয়পত্র নং</th>
                            <th scope="col">মোবাইল নং</th>
                            <th scope="col" className="text-end" style={{ width: "150px" }}>
                              বকেয়া পরিমাণ
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {taxpayers.map((taxpayer, index) => (
                            <tr
                              key={index}
                              className={`${selectedTaxpayers.has(index) ? "table-active" : ""} cursor-pointer`}
                              onClick={() => handleSelectTaxpayer(index)}
                              style={{ cursor: "pointer" }}
                            >
                              <td onClick={(e) => e.stopPropagation()}>
                                <div className="form-check">
                                  <input
                                    className="form-check-input border-primary"
                                    type="checkbox"
                                    id={`taxpayer-${index}`}
                                    checked={selectedTaxpayers.has(index)}
                                    onChange={() => handleSelectTaxpayer(index)}
                                  />
                                  <label className="form-check-label" htmlFor={`taxpayer-${index}`}>
                                    <span className="visually-hidden">সারি {index + 1} নির্বাচন করুন</span>
                                  </label>
                                </div>
                              </td>
                              <td className="fw-bold text-center">{index + 1}</td>
                              <td className="fw-semibold">{taxpayer.maliker_name}</td>
                              <td className="text-center">
                                <span className="badge bg-secondary">{taxpayer.holding_no}</span>
                              </td>
                              <td className="text-center">
                                <span className="badge bg-info">{taxpayer.word_no}</span>
                              </td>
                              <td className="font-monospace">{taxpayer.nid_no}</td>
                              <td className="font-monospace">{taxpayer.mobile_no}</td>
                              <td className="text-end">
                                <span className="text-danger fw-bold">{formatCurrency(taxpayer.total_price)}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-5">
                      <i className="bi bi-search display-1 text-muted mb-4"></i>
                      <h3 className="text-muted mb-3">কোন বকেয়া রেকর্ড পাওয়া যায়নি</h3>
                      <p className="text-muted">
                        ওয়ার্ড নম্বর "{searchWord}" এর জন্য কোন বকেয়া ট্যাক্স রেকর্ড পাওয়া যায়নি।
                        <br />
                        অন্য ওয়ার্ড নম্বর দিয়ে খোঁজার চেষ্টা করুন।
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="row">
            <div className="col-12">
              <div className="card shadow">
                <div className="card-body text-center py-5">
                  <div
                    className="spinner-border text-primary mb-4"
                    style={{ width: "3rem", height: "3rem" }}
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <h4 className="mb-3">বকেয়া রেকর্ড লোড হচ্ছে...</h4>

                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="card bg-light">
              <div className="card-body text-center">
                <p className="mb-0 text-muted">
                  <i className="bi bi-info-circle me-2"></i>
                  হোল্ডিং ট্যাক্স বকেয়া তালিকা ব্যবস্থাপনা সিস্টেম
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
