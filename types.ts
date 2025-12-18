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