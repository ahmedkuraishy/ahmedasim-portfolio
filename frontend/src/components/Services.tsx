import React from 'react';
import { ServiceData } from '../types/portfolio';

interface ServicesProps {
  data: ServiceData[];
}

const Services: React.FC<ServicesProps> = ({ data }) => {
  return (
    <section className="ftco-section" id="services-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 heading-section text-center ftco-animate mb-5">
            <span className="subheading">I am great at</span>
            <h2 className="mb-4">We do awesome services for our clients</h2>
          </div>
        </div>
        <div className="row">
          {data.map((service, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="media block-6 services d-block bg-white rounded-lg shadow ftco-animate">
                <div className="icon d-flex align-items-center justify-content-center"><span className={service.icon}></span></div>
                <div className="media-body">
                  <h3 className="heading mb-3">{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </div> 
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
