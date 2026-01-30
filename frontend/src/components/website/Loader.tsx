import React from 'react';

const Loader: React.FC = () => {
  return (
    <div id="ftco-loader" className="show">
      <svg className="circular" width="48px" height="48px">
        <circle className="path-bg" cx="24" cy="24" r="22" fill="none" strokeWidth="4" stroke="#eeeeee" />
        <circle className="path" cx="24" cy="24" r="22" fill="none" strokeWidth="4" strokeLinecap="round" stroke="#F96D00" />
      </svg>
    </div>
  );
};

export default Loader;
