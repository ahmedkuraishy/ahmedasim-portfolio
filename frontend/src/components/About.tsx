import React from 'react';
import { AboutData } from '../types/portfolio';

interface AboutProps {
  data: AboutData;
}

const About: React.FC<AboutProps> = ({ data }) => {
  return (
    <section className="ftco-about ftco-section ftco-no-pt ftco-no-pb" id="about-section">
      <div className="container">
        <div className="row d-flex no-gutters">
          <div className="col-md-6 col-lg-5 d-flex">
            <div className="img-about img d-flex align-items-stretch">
              <div className="overlay"></div>
              <div className="img d-flex align-self-stretch align-items-center" style={{backgroundImage:`url(/images/about-1.jpg)`}}>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-7 pl-md-4 pl-lg-5 py-5">
            <div className="py-md-5">
              <div className="row justify-content-start pb-3">
                <div className="col-md-12 heading-section ftco-animate">
                  <span className="subheading">My Intro</span>
                  <h2 className="mb-4" style={{fontSize: '34px', textTransform: 'capitalize'}}>About Me</h2>
                  <p>{data.description}</p>
                  <ul className="about-info mt-4 px-md-0 px-2">
                    <li className="d-flex"><span>Name:</span> <span>{data.name}</span></li>
                    <li className="d-flex"><span>Date of birth:</span> <span>{data.dob}</span></li>
                    <li className="d-flex"><span>Address:</span> <span>{data.address}</span></li>
                    <li className="d-flex"><span>Zip code:</span> <span>{data.zip}</span></li>
                    <li className="d-flex"><span>Email:</span> <span>{data.email}</span></li>
                    <li className="d-flex"><span>Phone: </span> <span>{data.phone}</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
