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
  heading: string;
  subheading: string;
  image: string;
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

export interface ResumeItemData {
  year: String;
  degree: String;
  institution: String;
  description: String;
}

export interface ResumeData {
  education: ResumeItemData[];
  experience: ResumeItemData[];
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
  navbar: Array<{ name: string; url: string }>;
  hero: HeroData;
  counters: CounterData[];
  about: AboutData;
  skills: SkillData[];
  services: ServiceData[];
  projects: ProjectData[];
  resume: ResumeData;
  footer: FooterData;
  contact: ContactData;
}
