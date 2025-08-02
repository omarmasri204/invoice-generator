export interface CompanyInfo {
  name: string;
  manager: string;
  logo: string | null;
  stamp: string | null;
}

export interface InvoiceInfo {
  number: string;
  date: string;
}

export interface ClientInfo {
  name: string;
}

export interface ServiceEntry {
  date: string;
  breakfastMeals: number;
  lunchMeals: number;
  price: number;
}

export interface SummaryInfo {
  discount: number;
  exchangeRate: number;
  currency: string;
  breakfastPrice: number; // price per breakfast meal
  lunchPrice: number;     // price per lunch meal
}

export interface InvoiceData {
  companyInfo: CompanyInfo;
  invoiceInfo: InvoiceInfo;
  clientInfo: ClientInfo;
  services: ServiceEntry[];
  summary: SummaryInfo;
}

export interface ContactInfo {
  phone: string;
  socialMedia: string;
  website?: string;
} 