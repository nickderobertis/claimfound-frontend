
export interface MapPointGETResponseAPIArgs {
  total_value:   number;
  total_claims:  number;
  average_value: number;
  address:       string;
  top_claims:    TopClaim[];
}

export interface TopClaim {
  name:              string;
  reporting_company: string;
  property_type:     string;
  amount:            string;
  reported_date:     string;
  referral_token:    string;
}

export interface MapPointGETRequestAPIArgs {
  lat: number;
  lng: number;
}
