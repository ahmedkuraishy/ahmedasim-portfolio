require('dotenv').config();
const mongoose = require('mongoose');
const Portfolio = require('./models/Portfolio');

const portfolioData = {
  navbar: [
    { name: "Home", url: "#home-section" },
    { name: "About", url: "#about-section" },
    { name: "Skills", url: "#skills-section" },
    { name: "Services", url: "#services-section" },
    { name: "Projects", url: "#projects-section" },
    { name: "Resume", url: "#resume-section" },
    { name: "Contact", url: "#contact-section" },
  ],
  hero: [
    {
      subheading: "Hello! This is Clyde",
      title: "Creative UI/UX Designer & Developer",
      bgImage: "/images/bg_1.jpg",
    },
    {
      subheading: "We Design & Build Brands",
      title: "Hi, I am Clyde This is my favorite work.",
      bgImage: "/images/bg_2.jpg",
    },
  ],
  counters: [
    { label: "Project Complete", number: 750, icon: "flaticon-suitcase" },
    { label: "Happy Clients", number: 568, icon: "flaticon-loyalty" },
    { label: "Cup of Coffee", number: 478, icon: "flaticon-loyalty" },
    { label: "Real Professionals", number: 780, icon: "flaticon-loyalty" },
  ],
  about: {
    heading: "About Me",
    subheading: "My Story",
    image: "/images/about-1.jpg",
    name: "Clyde Nowitzki",
    dob: "January 01, 1990",
    address: "San Francisco CA 97987 USA",
    zip: "1000",
    email: "cydenowitzki@gmail.com",
    phone: "+1-2234-5678-9-0",
    description: "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.",
  },
  skills: [
    { name: "Photoshop", value: 90 },
    { name: "jQuery", value: 85 },
    { name: "HTML5", value: 95 },
    { name: "CSS3", value: 90 },
    { name: "WordPress", value: 70 },
    { name: "SEO", value: 80 },
  ],
  services: [
    {
      title: "Web Design",
      icon: "flaticon-analysis",
      description: "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
    },
    {
      title: "Photography",
      icon: "flaticon-flasks",
      description: "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
    },
    {
      title: "Web Development",
      icon: "flaticon-ideas",
      description: "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
    },
    {
      title: "App Design",
      icon: "flaticon-analysis",
      description: "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
    },
  ],
  projects: [
    {
      title: "Branding & Illustration Design",
      category: "Web Design",
      image: "/images/work-1.jpg",
    },
    {
      title: "Branding & Illustration Design",
      category: "Web Design",
      image: "/images/work-2.jpg",
    },
    {
      title: "Branding & Illustration Design",
      category: "Web Design",
      image: "/images/work-3.jpg",
    },
    {
      title: "Branding & Illustration Design",
      category: "Web Design",
      image: "/images/work-4.jpg",
    },
    {
      title: "Branding & Illustration Design",
      category: "Web Design",
      image: "/images/work-5.jpg",
    },
    {
      title: "Branding & Illustration Design",
      category: "Web Design",
      image: "/images/work-6.jpg",
    },
    {
      title: "Branding & Illustration Design",
      category: "Web Design",
      image: "/images/work-7.jpg",
    },
    {
      title: "Branding & Illustration Design",
      category: "Web Design",
      image: "/images/work-8.jpg",
    },
  ],
  resume: {
    education: [
      {
        year: "2014-2015",
        degree: "Master of Science in Computer Engineering",
        institution: "Harvard University",
        description: "A small river named Duden flows by their place and supplies it with the necessary regelialia."
      },
      {
        year: "2010-2014",
        degree: "Bachelor of Science in Computer Science",
        institution: "Stanford University",
        description: "A small river named Duden flows by their place and supplies it with the necessary regelialia."
      }
    ],
    experience: [
      {
        year: "2019-Present",
        degree: "Senior Software Engineer",
        institution: "Google Inc.",
        description: "A small river named Duden flows by their place and supplies it with the necessary regelialia."
      },
      {
        year: "2015-2019",
        degree: "Software Engineer",
        institution: "Facebook Inc.",
        description: "A small river named Duden flows by their place and supplies it with the necessary regelialia."
      }
    ]
  },
  footer: {
    about: {
      title: "Lets talk about",
      text: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts."
    },
    links: [
      { name: "Home", url: "#" },
      { name: "About", url: "#" },
      { name: "Services", url: "#" },
      { name: "Projects", url: "#" },
      { name: "Contact", url: "#" }
    ],
    services: [
      { name: "Web Design", url: "#" },
      { name: "Web Development", url: "#" },
      { name: "Business Strategy", url: "#" },
      { name: "Data Analysis", url: "#" },
      { name: "Graphic Design", url: "#" }
    ],
    contact: {
      title: "Have a Questions?",
      address: "203 Fake St. Mountain View, San Francisco, California, USA",
      phone: "+2 392 3929 210",
      email: "info@yourdomain.com"
    },
    social: [
      { name: "twitter", icon: "fa-twitter", url: "#" },
      { name: "facebook", icon: "fa-facebook", url: "#" },
      { name: "instagram", icon: "fa-instagram", url: "#" }
    ],
    copyright: "All rights reserved | This template is made with by Colorlib"
  },
  contact: {
    subheading: "Contact us",
    title: "Have a Project?",
    description: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia",
    address: "198 West 21th Street, Suite 721 New York NY 10016",
    phone: "+ 1235 2355 98",
    email: "info@yoursite.com",
    website: "yoursite.com"
  }
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    await Portfolio.deleteMany({});
    console.log('Cleared existing portfolio data.');

    await Portfolio.create(portfolioData);
    console.log('Seeded portfolio data successfully!');

    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
