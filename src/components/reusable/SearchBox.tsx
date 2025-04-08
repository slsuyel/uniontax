/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useAppSelector } from "@/redux/features/hooks"
import type { RootState } from "@/redux/features/store"
import PouroLocationSelector from "./Locations/PouroLocationSelector";
import UnionLocationSelector from "./Locations/UnionLocationSelector";
interface SearchBoxProps {
  unionname: string;
  service: string;
  id: string | number;
}



const SearchBox: React.FC<SearchBoxProps> = ({ unionname,service, id }) => {

    const site_settings = useAppSelector((state: RootState) => state.union.site_settings);
    const baseUrl = window.origin;
      const handleUnionSelect = (union: string) => {
    
        if(unionname){
           union = unionname.replace(/\s+/g, "").toLowerCase();
        }else{
           union = union.replace(/\s+/g, "").toLowerCase();
        }
    
        if (service) {
          if (id) {
            if (baseUrl.includes("uniontax")) {
              window.location.href = `https://${union}.uniontax.gov.bd/application/${service}?id=${id}`;
            } else if (baseUrl.includes("unionservices")) {
              window.location.href = `https://${union}.unionservices.gov.bd/application/${service}?id=${id}`;
            } else {
               window.location.href = `http://${union}.${baseUrl.split("//")[1]}/application/${service}?id=${id}`
            }
          } else {
            if (baseUrl.includes("uniontax")) {
              window.location.href = `https://${union}.uniontax.gov.bd/application/${service}`;
            } else if (baseUrl.includes("unionservices")) {
              window.location.href = `https://${union}.unionservices.gov.bd/application/${service}`;
            } else {
              window.location.href = `http://${union}.${baseUrl.split("//")[1]}/application/${service}`
            }
          }
        } else {
          if (baseUrl.includes("uniontax")) {
            window.location.href = `https://${union}.uniontax.gov.bd`;
          } else if (baseUrl.includes("unionservices")) {
            window.location.href = `https://${union}.unionservices.gov.bd`;
          } else {
            window.location.href = `http://${union}.${baseUrl.split("//")[1]}`;
          }
        }
      }

      return (
        <>
            {site_settings?.union === "false" ? (
                <PouroLocationSelector onUnionSelect={handleUnionSelect} />
              ) : (
                <UnionLocationSelector onUnionSelect={handleUnionSelect} />
              )}
        </>

      );
};

export default SearchBox;
