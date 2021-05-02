/**
 * This file contains constants for company infomation, including name, address, phone, copyright year, etc.
 */
import COMPANY_INFO from "../../../../constants/company-info.json";
export const COMPANY_NAME = "ClaimFound, Inc.";
export const COMPANY_ADDRESS_LINE_1 =
  COMPANY_INFO.companyAddress["companyAddressLine1"];
export const COMPANY_ADDRESS_LINE_2 =
  COMPANY_INFO.companyAddress["companyAddressLine2"];
export const COMPANY_PHONE = COMPANY_INFO.companyPhone;

export const COMPANY_ADDRESS = `${COMPANY_ADDRESS_LINE_1}, ${COMPANY_ADDRESS_LINE_2}`;
export const COMPANY_NAME_AND_ADDRESS = `${COMPANY_NAME}, ${COMPANY_ADDRESS}`;

export const COPYRIGHT_YEAR = new Date().getFullYear();
