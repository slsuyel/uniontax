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
  // const [isAuthenticated, setIsAuthenticated] = useState(false)
  // const [userInfo, setUserInfo] = useState<string | null>(null)
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
  // useEffect(() => {
  //   const token = localStorage.getItem("token")
  //   const user = localStorage.getItem("user") // assuming user info is stored
  //   setIsAuthenticated(!!token)
  //   setUserInfo(user)
  // }, [])

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
      <style>{`
        :root {
          --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          --success-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          --danger-gradient: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
          --dark-gradient: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          --glass-bg: rgba(255, 255, 255, 0.15);
          --glass-border: rgba(255, 255, 255, 0.2);
          --shadow-light: 0 8px 32px rgba(31, 38, 135, 0.37);
          --shadow-heavy: 0 15px 35px rgba(31, 38, 135, 0.5);
        }

        * {
          box-sizing: border-box;
        }

        body {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          background-attachment: fixed;
          font-family: "Inter", sans-serif;
          min-height: 100vh;
          margin: 0;
          padding: 0;
        }

        /* Animated Background Pattern */
        body::before {
          content: "";
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
          animation: float 20s ease-in-out infinite;
          z-index: -1;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        /* Enhanced Card Styling */
        .card {
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          box-shadow: var(--shadow-light);
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-heavy);
        }

        /* Enhanced Hero Section */
        .hero-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 3rem 0;
          margin-bottom: 3rem;
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%), 
              linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%), 
              linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.1) 75%), 
              linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.1) 75%);
          background-size: 30px 30px;
          background-position: 0 0, 0 15px, 15px -15px, -15px 0px;
          opacity: 0.3;
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .hero-title {
          font-size: 2.8rem;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          margin-bottom: 1rem;
          animation: slideInDown 1s ease-out;
        }

        .hero-subtitle {
          font-size: 1.1rem;
          font-weight: 400;
          opacity: 0.95;
          animation: slideInUp 1s ease-out 0.3s both;
          max-width: 600px;
          margin: 0 auto;
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Enhanced Search Section */
        .search-card {
          background: var(--glass-bg);
          backdrop-filter: blur(25px);
          border: 2px solid var(--glass-border);
          border-radius: 25px;
          box-shadow: var(--shadow-light);
          overflow: hidden;
          animation: fadeInUp 0.8s ease-out 0.5s both;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .search-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 1.5rem;
          position: relative;
        }

        .search-header::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E") repeat;
        }

        .search-title {
          color: white;
          font-size: 1.4rem;
          font-weight: 700;
          margin: 0;
          position: relative;
          z-index: 2;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .search-body {
          padding: 2rem;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
        }

        .form-control {
          border: 2px solid rgba(102, 126, 234, 0.2);
          border-radius: 15px;
          padding: 0.8rem 1.2rem;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.9);
        }

        .form-control:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
          background: white;
          transform: translateY(-2px);
        }

        .input-group-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
          border-radius: 15px 0 0 15px;
          font-weight: 600;
        }

        .btn {
          border-radius: 15px;
          font-weight: 600;
          padding: 0.8rem 2rem;
          transition: all 0.3s ease;
          border: none;
          position: relative;
          overflow: hidden;
        }

        .btn::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .btn:hover::before {
          left: 100%;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
        }

        .btn-success {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          box-shadow: 0 4px 15px rgba(79, 172, 254, 0.4);
        }

        .btn-success:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(79, 172, 254, 0.6);
        }

        /* Enhanced Alert Styling */
        .alert {
          border: none;
          border-radius: 20px;
          padding: 1.5rem;
          font-weight: 500;
          box-shadow: var(--shadow-light);
          animation: slideInRight 0.5s ease-out;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .alert-danger {
          background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
          color: white;
        }

        .alert-success {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          color: white;
        }

        /* Enhanced Results Header */
        .results-header {
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #667eea 100%);
          border-radius: 20px 20px 0 0;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .results-header::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
          opacity: 0.3;
          animation: float 15s ease-in-out infinite;
        }

        .results-header-content {
          position: relative;
          z-index: 2;
        }

        .results-title {
          color: #ffffff;
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
        }

        .results-title i {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.7rem;
          border-radius: 12px;
          margin-right: 1rem;
          font-size: 1.3rem;
          backdrop-filter: blur(10px);
        }

        .results-subtitle {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.1rem;
          margin-bottom: 0;
          font-weight: 500;
        }

        .results-stats {
          background: var(--glass-bg);
          backdrop-filter: blur(15px);
          border-radius: 15px;
          padding: 1.5rem;
          border: 1px solid var(--glass-border);
          animation: pulse 2s infinite;
        }

        .stats-label {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .stats-value {
          color: #ffffff;
          font-size: 1.6rem;
          font-weight: 800;
          font-family: "Courier New", monospace;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
        }

        .stats-value i {
          margin-right: 0.7rem;
          font-size: 1.4rem;
          opacity: 0.9;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        /* Enhanced Selection Counter */
        .selection-counter {
          background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
          border-radius: 0;
          padding: 1.5rem;
          border: none;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Enhanced Table Styling */
        .table-responsive {
          border-radius: 0 0 20px 20px;
          overflow: hidden;
        }

        .table {
          margin: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
        }

        .table th {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          font-weight: 700;
          border: none;
          padding: 1.2rem 1rem;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #495057;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .table tbody tr {
          cursor: pointer;
          transition: all 0.3s ease;
          border-left: 4px solid transparent;
          position: relative;
          background: rgba(255, 255, 255, 0.8);
        }

        .table tbody tr:hover {
          background: rgba(102, 126, 234, 0.1) !important;
          transform: translateX(5px);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
        }

        .table tbody tr.table-active {
          background: linear-gradient(90deg, #e3f2fd 0%, #f3e5f5 100%) !important;
          border-left: 4px solid #667eea !important;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
          animation: selectRow 0.5s ease-in-out;
        }

        @keyframes selectRow {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }

        .table tbody tr.table-active td {
          color: #1565c0;
          font-weight: 600;
        }

        .badge {
          padding: 0.6em 1em;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.8em;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .bg-secondary {
          background: linear-gradient(135deg, #6c757d 0%, #495057 100%) !important;
        }

        .bg-info {
          background: linear-gradient(135deg, #17a2b8 0%, #138496 100%) !important;
        }

        .currency {
          font-family: "Courier New", monospace;
          font-weight: 700;
          padding: 0.4rem 0.8rem;
          border-radius: 8px;
          background: linear-gradient(135deg, rgba(220, 53, 69, 0.1) 0%, rgba(255, 193, 7, 0.1) 100%);
          border: 1px solid rgba(220, 53, 69, 0.2);
        }

        /* Enhanced Loading State */
        .loading-card {
          background: var(--glass-bg);
          backdrop-filter: blur(25px);
          border: 1px solid var(--glass-border);
          border-radius: 25px;
          box-shadow: var(--shadow-light);
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .loading-spinner {
          width: 3rem;
          height: 3rem;
          border: 4px solid rgba(102, 126, 234, 0.2);
          border-top: 4px solid #667eea;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Enhanced Empty State */
        .empty-state {
          padding: 4rem 2rem;
          text-align: center;
          color: #6c757d;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
        }

        .empty-state i {
          color: #667eea;
          margin-bottom: 2rem;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        /* Enhanced Footer */
        .footer {
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          padding: 2rem;
          margin-top: 3rem;
          box-shadow: var(--shadow-light);
          color: rgba(255, 255, 255, 0.9);
        }

        .footer p {
          margin: 0;
          font-weight: 500;
        }

        .footer i {
          color: #667eea;
          margin-right: 0.5rem;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
          }
          
          .results-title {
            font-size: 1.4rem;
          }
          
          .stats-value {
            font-size: 1.3rem;
          }
          
          .table-responsive {
            font-size: 0.875rem;
          }
        }

        /* Checkbox Enhancement */
        .form-check-input {
          width: 1.3em;
          height: 1.3em;
          border: 2px solid #667eea;
          border-radius: 6px;
          transition: all 0.3s ease;
        }

        .form-check-input:checked {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-color: #667eea;
          transform: scale(1.1);
        }

        /* Smooth Transitions */
        * {
          transition: all 0.3s ease;
        }
      `}</style>

      {/* Enhanced Hero Section */}
      <div className="hero-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto text-center hero-content">
              <h1 className="hero-title">হোল্ডিং ট্যাক্স বকেয়া তালিকা</h1>
              <p className="hero-subtitle">ওয়ার্ড নম্বর অনুযায়ী বকেয়া হোল্ডিং ট্যাক্স রেকর্ড খুঁজুন এবং দেখুন</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Enhanced Search Section */}
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto">
            <div className="card search-card">
              <div className="search-header">
                <h5 className="search-title">
                  <i className="bi bi-search me-2"></i>
                  অনুসন্ধান প্যারামিটার
                </h5>
              </div>
              <div className="search-body">
                <p className="text-muted mb-4 fs-5">হোল্ডিং ট্যাক্স বকেয়া রেকর্ড খোঁজার জন্য ওয়ার্ড নম্বর লিখুন</p>
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

        {/* Enhanced Error Alert */}
        {error && (
          <div className="row mb-4">
            <div className="col-lg-8 mx-auto">
              <div className="alert alert-danger d-flex align-items-center" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-3 fs-4"></i>
                <div className="fs-5">{error}</div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Success Alert */}
        {smsSuccess && (
          <div className="row mb-4">
            <div className="col-lg-8 mx-auto">
              <div className="alert alert-success d-flex align-items-center" role="alert">
                <i className="bi bi-check-circle-fill me-3 fs-4"></i>
                <div className="fs-5">{smsSuccess}</div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Results Section */}
        {hasSearched && !loading && !error && (
          <div className="row">
            <div className="col-12">
              <div className="card">
                {/* Enhanced Results Header */}
                <div className="results-header">
                  <div className="results-header-content">
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <h5 className="results-title">
                          <i className="bi bi-list-ul"></i>
                          বকেয়া রেকর্ড
                        </h5>
                        <p className="results-subtitle">
                          {taxpayers.length > 0
                            ? `ওয়ার্ড "${searchWord}" এর জন্য ${taxpayers.length} টি রেকর্ড পাওয়া গেছে`
                            : `ওয়ার্ড "${searchWord}" এর জন্য কোন রেকর্ড পাওয়া যায়নি`}
                        </p>
                      </div>
                      {taxpayers.length > 0 && (
                        <div className="col-md-4">
                          <div className="results-stats">
                            <div className="stats-label">মোট বকেয়া</div>
                            <div className="stats-value">
                              <i className="bi bi-currency-exchange"></i>
                              {formatCurrency(getTotalAmount())}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {taxpayers.length > 0 && (
                  <div className="selection-counter">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <div className="d-flex align-items-center">
                          <span className="text-primary me-3 fw-bold fs-5">
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
                        <thead>
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
                        <tbody>
                          {taxpayers.map((taxpayer, index) => (
                            <tr
                              key={index}
                              className={selectedTaxpayers.has(index) ? "table-active" : ""}
                              onClick={() => handleSelectTaxpayer(index)}
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
                      <i className="bi bi-search display-1 mb-4"></i>
                      <h3 className="text-muted mb-3">কোন বকেয়া রেকর্ড পাওয়া যায়নি</h3>
                      <p className="text-muted fs-5">
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

        {/* Enhanced Loading State */}
        {loading && (
          <div className="row">
            <div className="col-12">
              <div className="card loading-card">
                <div className="card-body text-center py-5">
                  <div className="loading-spinner rounded-circle mb-4 mx-auto"></div>
                  <h4 className="text-white mb-3">বকেয়া রেকর্ড লোড হচ্ছে...</h4>
                  <p className="text-white-50 mb-0 fs-5">অনুগ্রহ করে অপেক্ষা করুন যখন আমরা ডেটা আনছি</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
