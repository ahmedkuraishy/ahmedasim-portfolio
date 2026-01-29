const mongoose = require('mongoose');

const HeroSlideSchema = new mongoose.Schema({
  subheading: String,
  title: String,
  bgImage: String
});

const CounterSchema = new mongoose.Schema({
  label: String,
  number: Number,
  icon: String
});

const AboutSchema = new mongoose.Schema({
  heading: String,
  subheading: String,
  image: String,
  name: String,
  dob: String,
  address: String,
  zip: String,
  email: String,
  phone: String,
  description: String
});

const SkillSchema = new mongoose.Schema({
  name: String,
  value: Number
});

const ServiceSchema = new mongoose.Schema({
  title: String,
  icon: String,
  description: String
});

const ProjectSchema = new mongoose.Schema({
  title: String,
  category: String,
  image: String
});

const BlogPostSchema = new mongoose.Schema({
  title: String,
  date: String,
  author: String,
  image: String,
  excerpt: String
});

const FooterSchema = new mongoose.Schema({
  about: {
    title: String,
    text: String
  },
  links: [{ name: String, url: String }],
  services: [{ name: String, url: String }],
  contact: {
    title: String,
    address: String,
    phone: String,
    email: String
  },
  social: [{ name: String, icon: String, url: String }],
  copyright: String
});

const ContactSchema = new mongoose.Schema({
  subheading: String,
  title: String,
  description: String,
  address: String,
  phone: String,
  email: String,
  website: String
});

const PortfolioSchema = new mongoose.Schema({
  navbar: [{ name: String, url: String }],
  hero: [HeroSlideSchema],
  counters: [CounterSchema],
  about: AboutSchema,
  skills: [SkillSchema],
  services: [ServiceSchema],
  projects: [ProjectSchema],
  blog: [BlogPostSchema],
  footer: FooterSchema,
  contact: ContactSchema
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', PortfolioSchema);
