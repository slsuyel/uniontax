import type React from "react"
import { format } from "date-fns"
import Pagination from "../components/reusable/Pagination"

interface EkpayReport {
  id: number
  union: string
  start_date: string
  end_date: string
  ekpay_amount: string
  server_amount: string
  difference_amount: string
  created_at: string
  updated_at: string
}

interface PaginationLink {
  url: string | null
  label: string
  active: boolean
}

interface PaginationData {
  current_page: number
  data: EkpayReport[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: PaginationLink[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

interface EkpayReportTableProps {
  data: PaginationData
  onPageChange: (page: number) => void
}

const EkpayReportTable: React.FC<EkpayReportTableProps> = ({ data, onPageChange }) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy")
    } catch (error) {
      return dateString
    }
  }

  return (
    <div className="card mt-4">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">EkPay পেমেন্ট রিপোর্ট</h5>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="bg-light">
              <tr>
                <th>তারিখ সীমা</th>
                <th>আমার প্রতিবদনের টাকার পরিমাণ</th>
                <th>ইকপে এর টাকার পরিমাণ</th>
                <th>পার্থক্য</th>
                {/* <th>তৈরির তারিখ</th> */}
              </tr>
            </thead>
            <tbody>
              {data.data.map((report) => (
                <tr key={report.id}>
                  <td>
                    {formatDate(report.start_date)} - {formatDate(report.end_date)}
                  </td>
                  <td>{Number.parseFloat(report.server_amount).toFixed(2)} ৳</td>
                  <td>{Number.parseFloat(report.ekpay_amount).toFixed(2)} ৳</td>
                  <td className={Number.parseFloat(report.difference_amount) !== 0 ? "text-danger" : ""}>
                    {Number.parseFloat(report.difference_amount).toFixed(2)} ৳
                  </td>
                  {/* <td>{formatDate(report.created_at)}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.last_page > 1 && (
          <Pagination currentPage={data.current_page} lastPage={data.last_page} onPageChange={onPageChange} />
        )}
      </div>
    </div>
  )
}

export default EkpayReportTable
