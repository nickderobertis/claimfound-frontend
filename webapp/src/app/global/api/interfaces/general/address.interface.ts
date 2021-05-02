export interface AddressArgs {
  city?: string;
  county?: string;
  state?: string;
  street_address?: string;
  zip_code?: string;
  latitude?: string | number;
  longitude?: string | number;
  latlong_c_score?: string | number;
}

export interface AddressArrayArgs {
  city?: string[];
  county?: string[];
  state?: string[];
  street_address?: string[];
  zip_code?: string[];
  latitude?: string[] | number[];
  longitude?: string[] | number[];
  latlong_c_score?: string[] | number[];
}
