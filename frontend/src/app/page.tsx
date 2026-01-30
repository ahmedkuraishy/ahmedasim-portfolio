"use client";
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { PortfolioData } from '../types/portfolio';
import Loader from '../components/website/Loader';
import Navbar from '../components/website/Navbar';
import Hero from '../components/website/Hero';
import Counter from '../components/website/Counter';
import About from '../components/website/About';
import Skills from '../components/website/Skills';
import Services from '../components/website/Services';
import Projects from '../components/website/Projects';
import Blog from '../components/website/Blog';
import Contact from '../components/website/Contact';
import Footer from '../components/website/Footer';

export default function Home() {
  const [data, setData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/portfolio`)
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  return (
    <>
      <link href="https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900" rel="stylesheet" />
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
      <link rel="stylesheet" href="/css/animate.css" />
      <link rel="stylesheet" href="/css/owl.carousel.min.css" />
      <link rel="stylesheet" href="/css/owl.theme.default.min.css" />
      <link rel="stylesheet" href="/css/magnific-popup.css" />
      <link rel="stylesheet" href="/css/flaticon.css" />
      <link rel="stylesheet" href="/css/style.css" />
      <style>{`
        .ftco-animate {
          opacity: 1 !important;
          visibility: visible !important;
        }
      `}</style>

      <Script src="/js/jquery.min.js" strategy="beforeInteractive" />
      <Script src="/js/jquery-migrate-3.0.1.min.js" strategy="beforeInteractive" />
      <Script src="/js/popper.min.js" strategy="beforeInteractive" />
      <Script src="/js/bootstrap.min.js" strategy="beforeInteractive" />
      <Script src="/js/jquery.easing.1.3.js" strategy="lazyOnload" />
      <Script src="/js/jquery.waypoints.min.js" strategy="lazyOnload" />
      <Script src="/js/jquery.stellar.min.js" strategy="lazyOnload" />
      <Script src="/js/owl.carousel.min.js" strategy="lazyOnload" />
      <Script src="/js/jquery.magnific-popup.min.js" strategy="lazyOnload" />
      <Script src="/js/jquery.animateNumber.min.js" strategy="lazyOnload" />
      <Script src="/js/scrollax.min.js" strategy="lazyOnload" />
      <Script src="/js/main.js" strategy="lazyOnload" />

      {!data ? (
        <Loader />
      ) : (
        <>
          <Navbar data={data.navbar || [
            { name: "Home", url: "#home-section" },
            { name: "About", url: "#about-section" },
            { name: "Skills", url: "#skills-section" },
            { name: "Services", url: "#services-section" },
            { name: "Projects", url: "#projects-section" },
            { name: "Blog", url: "#blog-section" },
            { name: "Contact", url: "#contact-section" },
          ]} />
          <Hero data={data.hero} />
          <Counter data={data.counters} />
          <About data={data.about} />
          <Skills data={data.skills} />
          <Services data={data.services} />
          <Projects data={data.projects} />
          <Blog data={data.blog} />
          <Contact data={data.contact} />
          <Footer data={data.footer} />
        </>
      )}
    </>
  );
}
