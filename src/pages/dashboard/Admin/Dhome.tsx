"use client"

import { useDbMetricsQuery } from "@/redux/api/user/userApi"
import Summary from "./Summary"
import Loader from "@/components/reusable/Loader"
import { useAppSelector } from "@/redux/features/hooks"
import type { RootState } from "@/redux/features/store"
import Breadcrumbs from "@/components/reusable/Breadcrumbs"
import { Link } from "react-router-dom"
import EkpayReportTable from "../../../components/EkpayReportTable"
import { useEffect, useState } from "react"
import MaintanceFeesTable from "@/components/ui/MaintenanceFeeTable"
import "@/assets/styles/dashboard.css"
import "@/assets/styles/dashboard-header.css"
import "@/assets/styles/table-sections.css"

// Add this to your userApi.ts file
interface EkpayReport {
  data: any // Replace 'any' with the actual structure of your data if known
}

const useEkpayReportsQuery = (arg: { token: string | null; page?: number }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<EkpayReport | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const apiUrl = import.meta.env.VITE_BASE_API_URL

  const fetchData = async (page = 1) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${apiUrl}/user/ekpay-reports/get/by/union?page=${page}`, {
        headers: {
          Authorization: `Bearer ${arg.token}`,
          "Content-Type": "application/json",
        },
      })
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchData(arg.page || 1)
  }, [arg.token, arg.page])

  return { data, isLoading, error, refetch: fetchData }
}

const Dhome = () => {
  const user = useAppSelector((state: RootState) => state.user.user)
  const token = localStorage.getItem(`token`)
  const [currentPage, setCurrentPage] = useState(1)

  const { data: metricsData, isLoading: metricsLoading } = useDbMetricsQuery({ token })
  const { data: ekpayData, refetch: refetchEkpay } = useEkpayReportsQuery({ token, page: currentPage })

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    refetchEkpay(page)
  }

  if (metricsLoading) {
    return <Loader />
  }

  return (
    <div className="dashboard-container">
      {/* Enhanced Header */}
      <div className="dashboard-header-content">
        <div className="d-flex justify-content-between align-items-center">
          <div className="breadcrumb-container">
            <Breadcrumbs current={`${user?.dashboard_title}`} page={`${user?.designation}`} />
          </div>
          <Link className="sms-panel-btn" to={`/dashboard/sms`}>
            <i className="bi bi-chat-text me-2"></i>
            SMS প্যানেল
          </Link>
        </div>
      </div>


      {/* Enhanced Summary Section */}
      <div className="summary-section">
        <Summary data={metricsData?.data} />
      </div>

      {/* Enhanced Maintenance Fees Table */}
      <div className="table-section">
        <div className="ekpay-header">
          <h5 className="ekpay-title">
            <i className="bi bi-credit-card-2-front"></i>
            রক্ষণাবেক্ষণ ফি টেবিল
          </h5>
        </div>
        <div className="table-content">
          <MaintanceFeesTable />
        </div>
      </div>

      {/* Enhanced Ekpay Report Table */}
      {ekpayData && ekpayData.data && (
        <div className="table-section">
          <div className="ekpay-header">
            <h5 className="ekpay-title">
              <i className="bi bi-credit-card-2-front"></i>
              EkPay পেমেন্ট রিপোর্ট
            </h5>
          </div>
          <div className="table-content">
            <EkpayReportTable data={ekpayData.data} onPageChange={handlePageChange} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Dhome
