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
import { ReactNode } from 'react';

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
