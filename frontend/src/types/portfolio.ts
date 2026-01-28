export interface HeroSlide {
  subheading: string;
  title: string;
  bgImage: string;
}

export type HeroData = HeroSlide[];

export interface CounterData {
  label: string;
  number: number;
  icon: string;
}

export interface AboutData {
  name: string;
  dob: string;
  address: string;
  zip: string;
  email: string;
  phone: string;
  description: string;
}

export interface SkillData {
  name: string;
  value: number;
}

export interface ServiceData {
  title: string;
  icon: string;
  description: string;
}

export interface ProjectData {
  title: string;
  category: string;
  image: string;
}

export interface BlogPostData {
  title: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
}

export interface FooterData {
  about: {
    title: string;
    text: string;
  };
  links: Array<{ name: string; url: string }>;
  services: Array<{ name: string; url: string }>;
  contact: {
    title: string;
    address: string;
    phone: string;
    email: string;
  };
  social: Array<{ name: string; icon: string; url: string }>;
  copyright: string;
}

export interface ContactData {
  subheading: string;
  title: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

export interface PortfolioData {
  hero: HeroData;
  counters: CounterData[];
  about: AboutData;
  skills: SkillData[];
  services: ServiceData[];
  projects: ProjectData[];
  blog: BlogPostData[];
  footer: FooterData;
  contact: ContactData;
}
