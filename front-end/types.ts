export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  isLogo?: boolean;
}

export type Theme = 'light' | 'dark';

export interface ThemeConfig {
  name: string;
  primary: string; // CSS hex code
  secondary: string; // CSS hex code
  icon: string; // Emoji representation
}

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'pending' | 'contacted' | 'customer';
  admin_notes?: string;
  contract_length?: string;
  contract_details?: string;
  additional_terms?: string;
  signed_contract_key?: string;
  signed_contract_url?: string;
  created_at: string;
  updated_at: string;
}