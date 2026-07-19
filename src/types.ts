// Shared Type Definitions for Nuvo Peptide Labs

import { Product, BlogPost, FAQItem } from "./site.config";

export type { Product, BlogPost, FAQItem };

export type ActivePage =
  | "home"
  | "shop"
  | "blog"
  | "about"
  | "contact"
  | "faq"
  | "wholesale"
  | "shipping"
  | "refund"
  | "privacy"
  | "terms";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
  botcheck?: boolean;
}

export interface OrderFormData {
  fullName: string;
  email: string;
  phone: string;
  deliveryAddress: string;
  city: string;
  postalCode: string;
  specialInstructions?: string;
  botcheck?: boolean;
}
