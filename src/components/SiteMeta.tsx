import { Helmet } from "react-helmet-async";
import { useAppSelector } from "@/redux/features/hooks";
import type { RootState } from "@/redux/features/store";

const SiteMeta = () => {
  const site_settings = useAppSelector((state: RootState) => state.union.site_settings);

  return (
    <Helmet>
      <title>{site_settings?.title || "ইউনিয়ন পরিষদ ডিজিটাল সেবা সিস্টেম"}</title>
      <meta
        name="description"
        content={site_settings?.description || "ইউনিয়ন পরিষদ ডিজিটাল সেবা পেতে এই ওয়েবসাইট ভিজিট করুন।"}
      />
      <link rel="canonical" href={site_settings?.url || "https://uniontax.gov.bd/"} />
      <meta property="og:title" content={site_settings?.title || "ইউনিয়ন পরিষদ ডিজিটাল সেবা সিস্টেম"} />
      <meta
        property="og:description"
        content={site_settings?.description || "ইউনিয়ন পরিষদ ডিজিটাল সেবা পেতে এই ওয়েবসাইট ভিজিট করুন।"}
      />
      <meta
        property="og:image"
        content={site_settings?.image || "https://uniontax.gov.bd/bangladesh-govt.png"}
      />
      <meta property="og:url" content={site_settings?.url || "https://uniontax.gov.bd/"} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default SiteMeta;
