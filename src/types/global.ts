export type TDivision = {
  id: string;
  naem: string;
  bn_name: string;
};
export type TDistrict = {
  id: string;
  division_id: string;
  naem: string;
  bn_name: string;
};
export type TUpazila = {
  district_id: string;
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
};
export type TUnion = {
  id: string;
  upazilla_id: string;
  name: string;
  bn_name: string;
  url: string;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

export interface ScrollToTopProps {
  children?: ReactNode;
}

export interface TypeDataForm {
  id?: number;
  name?: string;
  role_id?: number;
  adult_family_members?: string;
  applicant_name?: string;
  applicant_signature?: string;
  application_preparer_name?: string;
  arrival_legality?: string;
  arriving_date?: string;
  category?: string;
  country_of_birth?: string;
  country_of_conflict?: string;
  current_address?: string;
  current_institution?: string;
  current_living?: string;
  dob?: any;
  education_level?: string;
  father_name?: string;
  gender?: string;
  head_name?: string;
  head_phone?: string;
  highest_education?: string;
  institution_address?: string;
  marital_status?: string;
  minor_family_members?: string;
  mother_name?: string;
  national_id_or_ssn?: string;
  nationality?: string;
  perjury_declaration?: string;
  permanent_address?: string;
  phone?: string;
  preparer_address?: string;
  preparer_email?: string;
  preparer_phone?: string;
  race?: string;
  recent_exam_grade?: string;
  reference1_address?: string;
  reference1_email?: string;
  reference1_name?: string;
  reference1_phone?: string;
  reference1_relationship?: string;
  reference2_address?: string;
  reference2_email?: string;
  reference2_name?: string;
  reference2_phone?: string;
  reference2_relationship?: string;
  religion?: string;
  sheltering_country?: string;
  situation?: string;
  terms_agreement?: string;
  total_family_members?: string;
  email: string;
  status: string;
}

export type TService = {
  title: string;
  link: string;
};

export interface TApplicantData {
  unioun_name?: string;
  applicant_name?: string;
  applicant_gender?: string;
  applicant_father_name?: string;
  applicant_mother_name?: string;
  applicant_birth_certificate_number?: string;
  applicant_date_of_birth?: string;
  applicant_email?: string;
  applicant_holding_tax_number?: string;
  applicant_mobile?: string;
  applicant_national_id_number?: string;
  applicant_national_id_front_attachment?: string;
  applicant_national_id_back_attachment?: string;
  applicant_permanent_district?: string;
  applicant_permanent_Upazila?: string;
  applicant_permanent_village?: string;
  applicant_permanent_post_office?: string;
  applicant_permanent_word_number?: string;
  applicant_present_district?: string;
  applicant_present_Upazila?: string;
  applicant_present_village?: string;
  applicant_present_post_office?: string;
  applicant_present_word_number?: string;
  applicant_resident_status?: string;
  attachment_type?: string;
  current_division?: string;
  image?: string;
  same_address?: boolean;
  applicant_religion?: string;
}

export interface TUnionInfo {
  id: number;
  short_name_e: string;
  short_name_b: string;
  thana: string;
  district: string;
  web_logo: string;
  format: string;
  google_map: string | null;
  defaultColor: string;
  payment_type: string;
  nidServicestatus: number;
  nidService: string;
}

export interface TTradeResponse {
  data: TKhats[];
  isError: boolean;
  error?: any;
  status_code: number;
}
export interface TKhats {
  name: string;
  khat_id: string;
  khat_fees: TKhatfee[];
}
export interface TKhatfee {
  name?: string;
  applicant_type_of_businessKhat: string;
  applicant_type_of_businessKhatAmount: string;
  fee: string;
}
