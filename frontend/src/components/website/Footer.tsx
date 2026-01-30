import React from 'react';
import { FooterData } from '../../types/portfolio';

interface FooterProps {
  data: FooterData;
}

const Footer: React.FC<FooterProps> = ({ data }) => {
  return (
    <footer className="ftco-footer ftco-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">{data.about.title}</h2>
              <p>{data.about.text}</p>
              <p><a href="#" className="btn btn-primary">Learn more</a></p>
            </div>
          </div>
          <div className="col-md">
            <div className="ftco-footer-widget mb-4 ml-md-4">
              <h2 className="ftco-heading-2">Links</h2>
              <ul className="list-unstyled">
                {data.links.map((link, index) => (
                  <li key={index}><a href={link.url}><span className="fa fa-chevron-right mr-2"></span>{link.name}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-md">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Services</h2>
              <ul className="list-unstyled">
                {data.services.map((service, index) => (
                  <li key={index}><a href={service.url}><span className="fa fa-chevron-right mr-2"></span>{service.name}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-md">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">{data.contact.title}</h2>
              <div className="block-23 mb-3">
                <ul>
                  <li><span className="icon fa fa-map marker"></span><span className="text">{data.contact.address}</span></li>
                  <li><a href="#"><span className="icon fa fa-phone"></span><span className="text">{data.contact.phone}</span></a></li>
                  <li><a href="#"><span className="icon fa fa-paper-plane pr-4"></span><span className="text">{data.contact.email}</span></a></li>
                </ul>
              </div>
              <ul className="ftco-footer-social list-unstyled mt-2">
                {data.social.map((soc, index) => (
                  <li key={index} className="ftco-animate"><a href={soc.url}><span className={`fa ${soc.icon}`}></span></a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <p>Copyright &copy; {new Date().getFullYear()} {data.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
