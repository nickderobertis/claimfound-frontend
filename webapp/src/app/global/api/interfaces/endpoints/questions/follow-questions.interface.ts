export interface FollowUpQuestionsGETAPIArgs {
  items: FollowUpQuestion[];
  isEmpty: boolean;
  unique_list_of_WP_id: string[];
}

export interface FollowUpQuestion {
  value: string;
  id: string;
}

export interface AssociatesFollowUpQuestionsGETAPIArgs {
  items: FollowUpQuestion[];
  isEmpty: boolean;
  unique_list_of_WP_id: string[];
  categories: string[];
}

export interface AssociateFollowUpQuestionsPOSTAPIArgs {
  data_type: string;
  ids: WhitePagesPersonData;
  noAnswer: boolean;
  unique_list_of_WP_id: string[];
}

export interface WhitePagesPersonData {
  [whitePageId: string]: WhitePagesPerson;
}

export interface WhitePagesPerson {
  response: boolean;
  associate: string;
  category: string;
  isDeceased: boolean;
  deceasedConfirmed: boolean;
  userIsHeir: string;
}

export interface PhoneFollowUpQuestionsPOSTAPIArgs {
  data_type: string;
  ids: WhitePagesPhoneData;
  noAnswer: boolean;
  unique_list_of_WP_id: string[];
}

export interface WhitePagesPhoneData {
  [whitePageId: string]: WhitePagesPhone;
}

export interface WhitePagesPhone {
  response: boolean;
  phone: string;
  isCurrent: boolean;
}

export interface AddressFollowUpQuestionsPOSTAPIArgs {
  data_type: string;
  ids: WhitePagesAddressData;
  noAnswer: boolean;
  unique_list_of_WP_id: string[];
}

export interface WhitePagesAddressData {
  [whitePageId: string]: WhitePagesAddress;
}

export interface WhitePagesAddress {
  response: boolean;
  address: string;
  isCurrentAddress: boolean;
}

export interface FollowUpQuestionsPOSTResponseArgs {
  add_type: string;
  added: string[];
  remaining_questions: number;
}

export interface FollowUpQuestionsGETRequestArgs {
  count: number;
  items_in_view?: string[];
}
