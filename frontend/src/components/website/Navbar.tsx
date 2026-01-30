import React from 'react';

interface NavbarProps {
  data: Array<{ name: string; url: string; status?: string }>;
}

const Navbar: React.FC<NavbarProps> = ({ data }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light site-navbar-target" id="ftco-navbar">
      <div className="container">
        <a className="navbar-brand" href="/">Clyde<span>.</span></a>
        <button className="navbar-toggler js-fh5co-nav-toggle fh5co-nav-toggle" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="oi oi-menu"></span> Menu
        </button>

        <div className="collapse navbar-collapse" id="ftco-nav">
          <ul className="navbar-nav nav ml-auto">
            {data && data.filter(item => item.status !== 'inactive').map((item, index) => (
              <li key={index} className="nav-item">
                <a href={item.url} className="nav-link"><span>{item.name}</span></a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
