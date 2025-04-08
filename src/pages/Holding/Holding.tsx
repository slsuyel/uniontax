"use client"

import type React from "react"

import RightSidebar from "../Home/RightSidebar"
import { Link } from "react-router-dom"
import { useAllHoldingFrontendQuery } from "@/redux/api/sonod/sonodApi"
import { type ChangeEvent, useState } from "react"
import type { THolding } from "../dashboard/holding/HoldingShow"
import { useAppSelector } from "@/redux/features/hooks"
import type { RootState } from "@/redux/features/store"
import type { TUnion } from "@/types"
import { Pagination, Alert } from "antd"
import Loader from "@/components/reusable/Loader"
import UnionLocationSelector from "../../components/reusable/Locations/UnionLocationSelector"
import PouroLocationSelector from "@/components/reusable/Locations/PouroLocationSelector"

const Holding = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedUnion, setSelectedUnion] = useState<TUnion | null>(null)
  const unionInfo = useAppSelector((state: RootState) => state.union.unionInfo)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedWord, setSelectedWord] = useState("1")
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState("")
  const smallUnion = selectedUnion?.name ? `${selectedUnion.name}`.replace(/\s+/g, "").toLowerCase() : ""


    const site_settings = useAppSelector((state: RootState) => state.union.site_settings);

  const { data, isLoading, isFetching, isError } = useAllHoldingFrontendQuery(
    {
      word: selectedWord,
      search: submittedSearchTerm,
      page: currentPage,
      unioun: unionInfo && unionInfo.short_name_e == "uniontax" ? smallUnion : unionInfo && unionInfo.short_name_e,
    },
    {
      skip: !submittedSearchTerm,
    },
  )

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page)
    setPageSize(pageSize)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1) // Reset to the first page
    setSubmittedSearchTerm(searchTerm) // Trigger API call
  }

  const handleWordChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedWord(event.target.value)
    setCurrentPage(1) // Reset to the first page
  }

  const handleUnionSelect = (union: string) => {
    setSelectedUnion({ name: union } as TUnion)
    setCurrentPage(1) // Reset to the first page
  }

  const holdings = data?.data?.data || []
  const totalItems = data?.data?.total || 0
  const lastPage = data?.data?.last_page || 1 // Use last_page from the API

  // Conditionally render the Pagination component
  const showPagination = totalItems > pageSize && holdings.length > 0

  return (
    <div className="row mx-auto container my-3">
      <div className="mainBody col-md-9 mt-3">
        <div className="card">
          {unionInfo && unionInfo.short_name_e !== "uniontax" ? (
            ""
          ) : (
            <form className="pt-4 border rounded shadow-sm bg-light">
              <h5 className="text-center mb-4 text-primary">{site_settings?.header_union_select_title || ""}</h5>
              <div className="d-flex justify-content-center">
              {site_settings?.union === "false" ? (
                <PouroLocationSelector onUnionSelect={handleUnionSelect} showLabels={true} />
              ) : (
                <UnionLocationSelector onUnionSelect={handleUnionSelect}  showLabels={true}/>
              )}
              </div>
            </form>
          )}

          <div className="card-header">
            <form onSubmit={handleSearch} className="d-flex gap-4 my-4 align-items-center">
              <div className="form-group mt-0 w-25">
                <select className="form-select" value={selectedWord} onChange={handleWordChange}>
                  {[...Array(9).keys()].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group mt-0 w-50">
                <input
                  type="text"
                  id="userdata"
                  placeholder="এখানে আপনার হোল্ডিং নং/নাম/জাতীয় পরিচয় পত্র নম্বর/মোবাইল নম্বর (যে কোন একটি তথ্য) এন্ট্রি করুন"
                  className="form-control"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="form-group text-center mt-0">
                <button
                  type="submit"
                  disabled={isFetching}
                  className="btn btn-info text-center"
                  style={{ fontSize: "20px", padding: "5px 23px" }}
                >
                  {isFetching ? "অপেক্ষা করুন" : "খুঁজুন"}
                </button>
              </div>
            </form>
          </div>
          <div className="card-body">
            {isError ? (
              <Alert message="Error fetching data" type="error" />
            ) : isLoading || isFetching ? (
              <>
                <Loader />
              </>
            ) : (
              <>
                <table className="table">
                  <thead>
                    <tr>
                      <th>হোল্ডিং নাম্বার</th>
                      <th>নাম</th>
                      <th>এন আইডি নাম্বার</th>
                      <th>মোবাইল নাম্বার</th>
                      <th>আরও তথ্য</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holdings.length > 0 ? (
                      holdings.map((item: THolding) => (
                        <tr key={item.id}>
                          <td>{item.holding_no}</td>
                          <td>{item.maliker_name}</td>
                          <td>{item.nid_no}</td>
                          <td>{item.mobile_no}</td>
                          <td>
                            <Link to={`/holding/list/view/${item.id}`} className="btn btn-info">
                              দেখুন
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center">
                          কোন ডেটা পাওয়া যায়নি
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Conditionally render Pagination */}
                {showPagination && (
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={lastPage * pageSize}
                    onChange={handlePageChange}
                    showSizeChanger
                    onShowSizeChange={handlePageChange}
                    pageSizeOptions={[10, 20, 50, 100]}
                    style={{ marginTop: 20, textAlign: "center" }}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <RightSidebar />
    </div>
  )
}

export default Holding
