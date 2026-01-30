import React from 'react';
import { HeroData } from '../../types/portfolio';
import { getSafeImageUrl } from '../../utils/imageUtils';

interface HeroProps {
  data: HeroData;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <section id="home-section" className="hero">
      <div className="home-slider owl-carousel">
        {data.map((slide, index) => (
          <div key={index} className="slider-item">
            <div className="overlay"></div>
            <div className="container-fluid px-md-0">
              <div className="row d-md-flex no-gutters slider-text align-items-end justify-content-end" data-scrollax-parent="true">
                <div className="one-third order-md-last img" style={{backgroundImage:`url(${getSafeImageUrl(slide.bgImage)})`}}>
                  <div className="overlay"></div>
                  <div className="overlay-1"></div>
                </div>
                <div className="one-forth d-flex  align-items-center ftco-animate" data-scrollax=" properties: { translateY: '70%' }">
                  <div className="text">
                    <span className="subheading">{slide.subheading}</span>
                    <h1 className="mb-4 mt-3">{slide.title}</h1>
                    <p><a href="#" className="btn btn-primary">Hire me</a> <a href="#" className="btn btn-primary btn-outline-primary">Download CV</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
