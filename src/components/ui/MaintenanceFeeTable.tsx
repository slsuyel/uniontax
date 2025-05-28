"use client"

import React, { useEffect, useState } from "react"
import { format } from "date-fns"
import Loader from "@/components/reusable/Loader"

interface MaintanceFee {
  id: number
  union: string
  amount: string
  transaction_fee: string
  status: string
  payment_date: string
  type: string
  period: string
  trx_id: string
  created_at: string
  updated_at: string
}

const MaintanceFeesTable: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<MaintanceFee[]>([])
  const [error, setError] = useState<Error | null>(null)

  const token = localStorage.getItem("token")
  const apiUrl = import.meta.env.VITE_BASE_API_URL






  const fetchMaintanceFees = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${apiUrl}/user/maintance-fees`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      const result = await response.json()
      console.log("Maintance Fees Data:", result)
      setData(result?.data || [])
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMaintanceFees()
  }, [])

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy")
    } catch {
      return dateString
    }
  }

  if (isLoading) return <Loader />
  if (error) return <div className="alert alert-danger">Error: {error.message}</div>
  if (!data || data.length === 0) return <div className="alert alert-warning">No maintenance fee data found.</div>

  return (
    <div className="card mt-4">
      <div className="card-header bg-info text-white">
        <h5 className="mb-0">মেইনটেনেন্স ফি রিপোর্ট</h5>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="bg-light">
              <tr>
                <th>পেমেন্টের তারিখ</th>
                <th>মোট পরিমাণ (৳)</th>
                <th>লেনদেন ফি (৳)</th>
                <th>অবস্থা</th>
                <th>ফি ধরণ</th>
                <th>অর্থবছর/পিরিয়ড</th>
                <th>লেনদেন নম্বর</th>
                <th>ইনভয়েস</th>
              </tr>
            </thead>
            <tbody>
              {data.map((fee) => (
                <tr key={fee.id}>
                  <td>{formatDate(fee.payment_date)}</td>
                  <td>{Number.parseFloat(fee.amount).toFixed(2)} ৳</td>
                  <td>{Number.parseFloat(fee.transaction_fee).toFixed(2)} ৳</td>
                  <td className={fee.status === "paid" ? "text-success" : "text-danger"}>
                    {fee.status === "paid" ? "পরিশোধিত" : "অপরিশোধিত"}
                  </td>
                  <td>{fee.type === "yearly" ? "বাৎসরিক" : fee.type}</td>
                  <td>{fee.period}</td>
                  <td>{fee.trx_id}</td>
                  <td>
                    <a
                      href={`${apiUrl}/maintance-fee/${fee.id}/invoice`}
                      className="btn btn-sm btn-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ডাউনলোড
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MaintanceFeesTable
