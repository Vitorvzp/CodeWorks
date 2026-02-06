export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  cta: string;
  popular?: boolean;
}