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
