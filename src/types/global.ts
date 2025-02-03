export type TDivision = {
  id: string;
  name: string;
  bn_name: string;
};
export type TDistrict = {
  id: string;
  division_id: string;
  name: string;
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

export type TService = {
  title: string;
  link: string;
};

export interface TApplicantData {
  unioun_name?: string;
  hasEnData?: 0 | 1;
  applicant_name?: string;
  applicant_gender?: string;
  applicant_father_name?: string;
  applicant_mother_name?: string;
  applicant_birth_certificate_number?: string | null | undefined;
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
  image?: any;
  same_address?: boolean;
  applicant_religion?: string;
  id: number;
  year: string | null;
  sonod_Id: string;
  uniqeKey: string;

  english_prottoyon: string;
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

  successor_list: any;
  khat: string;
  last_years_money: number;
  currently_paid_money: string | undefined;
  total_amount: string | null;
  amount_deails: string | null;
  the_amount_of_money_in_words: string | null;

  applicant_phone: string | null;

  applicant_birth_certificate_attachment?: any;
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
  full_name: string;
  full_name_en: string;
  short_name_b: string;
  thana: string;
  thana_en: string;
  district: string;
  district_en: string;

  c_name: string;
  c_name_en: string;
  c_type: string;
  c_type_en: string;

  c_email: string;
  socib_name: string;
  socib_name_en: string;
  socib_email: string;
  u_description: string;
  u_notice: string;
  google_map: string;
  defaultColor: string;
  web_logo: any;
  sonod_logo: any;
  c_signture: any;
  socib_signture: any;
  u_image: any;
  [key: string]: string | File | null;
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

export interface TSonod {
  id: number;
  bnname: string;
  enname: string;
  fees: any;
  icon: string;
  sonod_fees: number;
  pendingCount?: number;
}

export interface THoldingTax {
  id: number;
  maliker_name: string;
  gramer_name: string;
  mobile_no: string;
  holding_no: string;
}

export interface TTax {
  id: number;
  holdingTax_id: string;
  year: string;
  price: string;
  payYear: string | null;
  payOB: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface TPaymentFailed {
  id: number;
  sonodId: string;
  union: string;
  trxId: string;
  sonod_type: string;
  date: string;
  method: string;
  sonods: any;
  holding_tax: THoldingTax;
  tax: TTax;
}

export interface TAddress {
  holding: string;
  village: string;
  union: string;
  post: string;
  postCode: string;
  thana: string;
  district: string;
}

export interface TPersonalInformation {
  id: number;
  fullNameEN: string;
  fathersNameEN: string;
  mothersNameEN: string;
  spouseNameEN: string | null;
  presentAddressEN: string;
  permenantAddressEN: string;
  fullNameBN: string;
  fathersNameBN: string;
  mothersNameBN: string;
  spouseNameBN: string;
  presentAddressBN: string;
  presentHolding: string;
  presentVillage: string;
  presentUnion: string;
  presentPost: string;
  presentPostCode: string;
  presentThana: string;
  presentDistrict: string;
  permanentAddressBN: string;
  permanentHolding: string;
  permanentVillage: string;
  permanentUnion: string;
  permanentPost: string;
  permanentPostCode: string;
  permanentThana: string;
  permanentDistrict: string;
  gender: string;
  profession: string;
  dateOfBirth: string;
  birthPlaceBN: string | null;
  mothersNationalityBN: string | null;
  mothersNationalityEN: string | null;
  fathersNationalityBN: string | null;
  fathersNationalityEN: string | null;
  birthRegistrationNumber: string | null;
  nationalIdNumber: string;
  oldNationalIdNumber: string;
  photoUrl: string | null;
  createdAt: string;
  updatedAt: string;
  presentHolding_en: string;
  presentVillage_en: string;
  presentUnion_en: string;
  presentPost_en: string;
  presentPostCode_en: string;
  presentThana_en: string;
  presentDistrict_en: string;
  permanentHolding_en: string;
  permanentVillage_en: string;
  permanentUnion_en: string;
  permanentPost_en: string;
  permanentPostCode_en: string;
  permanentThana_en: string;
}

export interface TIpnResposne {
  data: Data;
  isError: boolean;
  error: null;
  status_code: number;
}

export interface Data {
  myserver: Myserver;
  akpay: Akpay;
}

export interface Akpay {
  secure_token: string;
  msg_code: string;
  msg_det: string;
  req_timestamp: string;
  basic_Info: BasicInfo;
  cust_info: CustInfo;
  scroll_no: null;
  trnx_info: TrnxInfo;
  pi_det_info: PiDetInfo;
}

export interface BasicInfo {
  mer_reg_id: string;
  ipn_info: string;
  redirect_to: string;
  dgtl_sign: string;
  ord_desc: string;
  remarks: null | string;
}

export interface CustInfo {
  cust_id: string;
  cust_name: string;
  cust_mobo_no: string;
  cust_email: null | string;
  cust_mail_addr: string;
}

export interface PiDetInfo {
  pay_timestamp: string;
  pi_name: string;
  pi_type: string;
  pi_number: string;
  pi_gateway: string;
  card_holder_name: null | string;
}

export interface TrnxInfo {
  trnx_amt: string;
  trnx_id: string;
  mer_trnx_id: string;
  curr: string;
  pi_trnx_id: string;
  pi_charge: string;
  ekpay_charge: string;
  pi_discount: string;
  discount: string;
  promo_discount: string;
  total_ser_chrg: string;
  total_pabl_amt: string;
}

export interface Myserver {
  id: number;
  union: string;
  trxId: string;
  sonodId: string;
  sonod_type: string;
  amount: string;
  applicant_mobile: null;
  status: string;
  payable_type: null;
  payable_id: null;
  coupon_id: null;
  date: string;
  month: string;
  year: string;
  paymentUrl: string;
  ipnResponse: Akpay;
  method: string;
  payment_type: string;
  balance: null;
  hasEnData: number;
  uddoktaId: null;
  created_at: string;
  updated_at: string;
  sonods: null;
  holding_tax: HoldingTax;
  tax: Tax;
}

export interface HoldingTax {
  id: number;
  maliker_name: string;
  gramer_name: string;
  mobile_no: string;
  holding_no: string;
}

export interface Tax {
  id: number;
  holdingTax_id: string;
  year: string;
  price: string;
  payYear: string;
  payOB: string;
  status: string;
  created_at: string;
  updated_at: string;
}
