export interface FormsAPIGETArgs {
  incomplete_forms: IncompleteForm[];
  complete_forms: CompleteForm[];
  fill_items: FillItem[];
}

export interface FillItem {
  item_type: string;
  table: string | null;
  data: FillItemDatum | null;
}

export interface FillItemDatum {
  street_address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  phone?: string;
}

export interface IncompleteForm {
  url: string;
  id: number;
}

export interface CompleteForm {
  name: string;
  url: string;
  id: number;
}
