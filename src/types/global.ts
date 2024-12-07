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
  id: number;
  year: string | null;
  sonod_Id: string;
  uniqeKey: string;

  sonod_name: string;
  successor_father_name: string | null;
  successor_mother_name: string | null;
  ut_father_name: string | null;
  ut_mother_name: string | null;
  ut_grame: string | null;
  ut_post: string | null;
  ut_thana: string | null;
  ut_district: string | null;
  ut_word: string | null;
  successor_father_alive_status: number;
  successor_mother_alive_status: number;

  applicant_passport_number: string | null;

  family_name: string | null;
  Annual_income: string | null;
  Annual_income_text: string | null;
  Subject_to_permission: string | null;
  disabled: number;
  The_subject_of_the_certificate: string | null;
  Name_of_the_transferred_area: string | null;
  applicant_second_name: string | null;
  applicant_owner_type: string | null;
  applicant_name_of_the_organization: string | null;
  organization_address: string | null;

  utname: string | null;
  ut_religion: string | null;
  alive_status: number;

  applicant_marriage_status: string | null;
  applicant_vat_id_number: string | null;
  applicant_tax_id_number: string | null;
  applicant_type_of_business: string | null;
  applicant_type_of_businessKhat: string | null;
  applicant_type_of_businessKhatAmount: string;

  applicant_occupation: string | null;
  applicant_education: string | null;

  applicant_present_road_block_sector: string | null;

  applicant_permanent_road_block_sector: string | null;

  successor_list: string | undefined;
  khat: string;
  last_years_money: string | undefined;
  currently_paid_money: string | undefined;
  total_amount: string | null;
  amount_deails: string | null;
  the_amount_of_money_in_words: string | null;

  applicant_phone: string | null;

  applicant_birth_certificate_attachment: string | null;
  prottoyon: string | null;
  sec_prottoyon: string | null;
  stutus: string;
  payment_status: string;
  chaireman_name: string;
  chaireman_type: string;
  c_email: string | null;
  chaireman_sign: string;
  socib_name: string | null;
  socib_signture: string;
  socib_email: string | null;
  cancedby: string | null;
  cancedbyUserid: string | null;
  pBy: string | null;
  sameNameNew: number;
  orthoBchor: string;
  renewed: number;
  renewed_id: string | null;
  format: string | null;
  created_at: string;
  updated_at: string;
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

export interface TSonodSearchRes {
  data: {
    sonods: {
      current_page: number;
      data: TApplicantData[];
      first_page_url: string;
      from: number | null;
      last_page: number;
      last_page_url: string;
      links: PaginationLink[];
      next_page_url: string | null;
      path: string;
      per_page: number;
      prev_page_url: string | null;
      to: number | null;
      total: number;
    };
    sonod_name: TSonodName;
  };
  isError: boolean;
  error: any;
  status_code: number;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface TSonodName {
  id: number;
  service_id: number;
  bnname: string;
  enname: string;
  icon: string;
  template: string;
  sonod_fee: number;
  created_at: string | null;
  updated_at: string | null;
}
