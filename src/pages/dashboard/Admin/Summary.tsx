"use client"

import allApplications from "/images/all-application.png"
import approvedApplications from "/images/approved-application.png"
import canceledApplications from "/images/cancel-application.png"
import newApplications from "/images/new-application.png"
import totalFees from "/images/total-fees.png"
import "@/assets/styles/summary.css"

const SummaryItem = ({
  icon,
  title,
  value,
}: {
  icon: string
  title: string
  value: number
}) => {
  return (
    <div className="col-lg-4 col-md-6 my-2">
      <div className="summary-card">
        <div className="summary-card-body">
          <div className="summary-icon-container">
            <img src={icon || "/placeholder.svg"} alt={title} className="summary-icon" />
          </div>
          <div className="summary-text">
            <h6 className="summary-title">{title}</h6>
            <p className="summary-value">{value}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const Summary = ({ data }: any) => {
  const summaryItems = [
    { icon: allApplications, title: "মোট আবেদন", value: data?.totalSonod },
    { icon: newApplications, title: "নতুন আবেদন", value: data?.pendingSonod },
    {
      icon: approvedApplications,
      title: "ইস্যুকৃত সনদ",
      value: data?.approvedSonod,
    },
    {
      icon: canceledApplications,
      title: "বাতিলকৃত আবেদন",
      value: data?.cancelSonod,
    },
    {
      icon: totalFees,
      title: "মোট আদায়কৃত ফি'র পরিমাণ",
      value: (data?.totalRevenue).toFixed(2),
    },
    {
      icon: "/images/sms.webp",
      title: "SMS Balance",
      value: data?.sms_balance,
    },
  ]

  return (
    <div className="row">
      {summaryItems.map((item, index) => (
        <SummaryItem key={index} icon={item.icon} title={item.title} value={item.value} />
      ))}
    </div>
  )
}

export default Summary
