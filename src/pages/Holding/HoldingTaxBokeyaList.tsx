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

  // Add these state variables after the existing ones
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userInfo, setUserInfo] = useState<string | null>(null)
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
      // Get base API URL from environment variables
      const apiUrl = import.meta.env.VITE_BASE_API_URL
      if (!apiUrl) {
        throw new Error("API URL কনফিগার করা হয়নি")
      }

      // Get token from localStorage
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("অথেন্টিকেশন টোকেন পাওয়া যায়নি। অনুগ্রহ করে আবার লগইন করুন।")
      }

      // Prepare headers
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

  // Load initial data
  useEffect(() => {
    if (checkAuthentication()) {
      fetchTaxpayers("1")
    }
  }, [])

  // Add this useEffect to check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user") // assuming user info is stored
    setIsAuthenticated(!!token)
    setUserInfo(user)
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

      setSmsSuccess(`${selectedTaxpayers.size} জন প্রাপকের কাছে সফলভাবে SMS পাঠানো হয়েছে`)
      setSelectedTaxpayers(new Set()) // Clear selection after successful send
    } catch (err) {
      setError(err instanceof Error ? err.message : "SMS পাঠাতে ব্যর্থ")
    } finally {
      setSendingSms(false)
    }
  }

  return (
    <>
      <style jsx global>{`
        :root {
          --bs-primary: #0d6efd;
          --bs-success: #198754;
          --bs-danger: #dc3545;
          --bs-warning: #ffc107;
          --bs-info: #0dcaf0;
          --selected-bg: #e3f2fd;
          --selected-border: #2196f3;
          --hover-bg: #f5f5f5;
        }

        body {
          background-color: #f8f9fa;
          font-family: "Inter", sans-serif;
        }

        .navbar-brand {
          font-weight: 700;
        }

        .card {
          box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
          border: 1px solid rgba(0, 0, 0, 0.125);
          border-radius: 12px;
        }

        .table th {
          background-color: #f8f9fa;
          font-weight: 600;
          border-top: none;
          padding: 1rem 0.75rem;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #495057;
        }

        .currency {
          font-family: "Courier New", monospace;
          font-weight: 600;
        }

        .loading-spinner {
          width: 2rem;
          height: 2rem;
        }

        .empty-state {
          padding: 3rem 1rem;
          text-align: center;
          color: #6c757d;
        }

        .search-icon,
        .alert-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .hero-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 2rem 0;
          margin-bottom: 2rem;
        }

        /* Enhanced Table Styling */
        .table {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .table tbody tr {
          cursor: pointer;
          transition: all 0.3s ease;
          border-left: 4px solid transparent;
          position: relative;
        }

        .table tbody tr:hover {
          background-color: var(--hover-bg) !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        /* Selected Row Styling */
        .table tbody tr.table-active {
          background: linear-gradient(90deg, #e3f2fd 0%, #f3e5f5 100%) !important;
          border-left: 4px solid var(--selected-border) !important;
          box-shadow: 0 2px 8px rgba(33, 150, 243, 0.2);
          position: relative;
        }

        .table tbody tr.table-active::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, #2196f3 0%, #9c27b0 100%);
          border-radius: 0 2px 2px 0;
        }

        .table tbody tr.table-active:hover {
          background: linear-gradient(90deg, #bbdefb 0%, #e1bee7 100%) !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(33, 150, 243, 0.3);
        }

        .table tbody tr.table-active td {
          color: #1565c0;
          font-weight: 500;
        }

        .table tbody tr:hover .badge {
          transform: scale(1.05);
          transition: transform 0.2s ease-in-out;
        }

        /* Enhanced Badge Styling */
        .badge {
          padding: 0.5em 0.75em;
          border-radius: 6px;
          font-weight: 500;
          font-size: 0.75em;
        }

        .table tbody tr.table-active .badge.bg-secondary {
          background-color: #1976d2 !important;
          color: white;
        }

        .table tbody tr.table-active .badge.bg-info {
          background-color: #7b1fa2 !important;
          color: white;
        }

        /* Enhanced Currency Display */
        .currency {
          font-family: "Courier New", monospace;
          font-weight: 600;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          background-color: rgba(220, 53, 69, 0.1);
        }

        .table tbody tr.table-active .currency {
          background-color: rgba(21, 101, 192, 0.2);
          color: #1565c0;
        }

        /* Checkbox Styling */
        .form-check-input {
          width: 1.2em;
          height: 1.2em;
          border: 2px solid #dee2e6;
          border-radius: 4px;
        }

        .form-check-input:checked {
          background-color: #2196f3;
          border-color: #2196f3;
        }

        .table tbody tr.table-active .form-check-input:checked {
          background-color: #1565c0;
          border-color: #1565c0;
        }

        /* Row Number Styling */
        .table tbody tr td:nth-child(2) {
          font-weight: 600;
          color: #6c757d;
        }

        .table tbody tr.table-active td:nth-child(2) {
          color: #1565c0;
          background-color: rgba(21, 101, 192, 0.1);
          border-radius: 50%;
          width: 2rem;
          height: 2rem;
          text-align: center;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .table-responsive {
            font-size: 0.875rem;
          }

          .hero-section {
            padding: 1.5rem 0;
          }

          .table tbody tr {
            border-left: 3px solid transparent;
          }

          .table tbody tr.table-active {
            border-left: 3px solid var(--selected-border) !important;
          }
        }

        /* Animation for row selection */
        @keyframes selectRow {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
          100% {
            transform: scale(1);
          }
        }

        .table tbody tr.table-active {
          animation: selectRow 0.3s ease-in-out;
        }

        /* Enhanced Card Header */
        .card-header {
          background: linear-gradient(135deg, #0d6efd 0%, #6610f2 100%) !important;
          border-radius: 12px 12px 0 0 !important;
        }

        /* Selection Counter Styling */
        .selection-counter {
          background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
          border-radius: 8px;
          padding: 1rem;
          border: 1px solid #e1f5fe;
        }

        /* Button Enhancements */
        .btn {
          border-radius: 6px;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
      `}</style>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="display-4 fw-bold mb-3">হোল্ডিং ট্যাক্স বকেয়া তালিকা</h1>
              <p className="lead mb-0">ওয়ার্ড নম্বর অনুযায়ী বকেয়া হোল্ডিং ট্যাক্স রেকর্ড খুঁজুন এবং দেখুন</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Search Section */}
        <div className="row mb-4">
          <div className="col-lg-8 mx-auto">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title mb-0">
                  <i className="bi bi-search me-2"></i>
                  অনুসন্ধান প্যারামিটার
                </h5>
              </div>
              <div className="card-body">
                <p className="card-text text-muted mb-3">হোল্ডিং ট্যাক্স বকেয়া রেকর্ড খোঁজার জন্য ওয়ার্ড নম্বর লিখুন</p>
                <form onSubmit={handleSearch}>
                  <div className="row g-3">
                    <div className="col-md-8">
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-hash"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="ওয়ার্ড নম্বর লিখুন (যেমন: ১)"
                          value={searchWord}
                          onChange={(e) => setSearchWord(e.target.value)}
                          required
                        />
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
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                <div>{error}</div>
              </div>
            </div>
          </div>
        )}

        {smsSuccess && (
          <div className="row mb-4">
            <div className="col-lg-8 mx-auto">
              <div className="alert alert-success d-flex align-items-center" role="alert">
                <i className="bi bi-check-circle-fill me-2"></i>
                <div>{smsSuccess}</div>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {hasSearched && !loading && !error && (
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="card-title mb-0">
                      <i className="bi bi-list-ul me-2"></i>
                      বকেয়া রেকর্ড
                    </h5>
                    <small className="text-white-50">
                      {taxpayers.length > 0
                        ? `ওয়ার্ড "${searchWord}" এর জন্য ${taxpayers.length} টি রেকর্ড পাওয়া গেছে`
                        : `ওয়ার্ড "${searchWord}" এর জন্য কোন রেকর্ড পাওয়া যায়নি`}
                    </small>
                  </div>
                  {taxpayers.length > 0 && (
                    <div className="text-end">
                      <small className="text-white-50 d-block">মোট বকেয়া</small>
                      <span className="badge bg-light text-dark fs-6 currency">{formatCurrency(getTotalAmount())}</span>
                    </div>
                  )}
                </div>
                {taxpayers.length > 0 && (
                  <div className="card-body border-bottom selection-counter">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <div className="d-flex align-items-center">
                          <span className="text-primary me-3 fw-bold">
                            <i className="bi bi-check-square me-1"></i>
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
                        {/* Table Header - 8 columns */}
                        <thead className="table-light">
                          <tr>
                            <th scope="col" style={{ width: "50px" }}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
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
                        {/* Table Body - 8 columns to match header */}
                        <tbody>
                          {taxpayers.map((taxpayer, index) => (
                            <tr
                              key={index}
                              className={selectedTaxpayers.has(index) ? "table-active" : ""}
                              onClick={() => handleSelectTaxpayer(index)}
                              style={{ cursor: "pointer" }}
                            >
                              <td onClick={(e) => e.stopPropagation()}>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
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
                              <td className="fw-medium text-center">{index + 1}</td>
                              <td className="fw-medium">{taxpayer.maliker_name}</td>
                              <td className="text-center">
                                <span className="badge bg-secondary">{taxpayer.holding_no}</span>
                              </td>
                              <td className="text-center">
                                <span className="badge bg-info">{taxpayer.word_no}</span>
                              </td>
                              <td className="font-monospace small">{taxpayer.nid_no}</td>
                              <td className="font-monospace small">{taxpayer.mobile_no}</td>
                              <td className="text-end">
                                <span className="currency text-danger fw-bold">
                                  {formatCurrency(taxpayer.total_price)}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="empty-state">
                      <i className="bi bi-search display-1 text-muted mb-3"></i>
                      <h4 className="text-muted">কোন বকেয়া রেকর্ড পাওয়া যায়নি</h4>
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
              <div className="card">
                <div className="card-body text-center py-5">
                  <div className="spinner-border text-primary loading-spinner mb-3" role="status">
                    <span className="visually-hidden">লোড হচ্ছে...</span>
                  </div>
                  <h5 className="text-muted">বকেয়া রেকর্ড লোড হচ্ছে...</h5>
                  <p className="text-muted mb-0">অনুগ্রহ করে অপেক্ষা করুন যখন আমরা ডেটা আনছি</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-5 py-4 border-top">
          <div className="row">
            <div className="col-md-6">
              <p className="text-muted mb-0">
                <i className="bi bi-building me-1"></i>
                ইউনিয়ন ট্যাক্স ব্যবস্থাপনা সিস্টেম
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="text-muted mb-0">
                <i className="bi bi-calendar me-1"></i>
                {new Date().getFullYear()} - সকল অধিকার সংরক্ষিত
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
