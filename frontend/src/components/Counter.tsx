import React from 'react';
import { CounterData } from '../types/portfolio';

interface CounterProps {
  data: CounterData[];
}

const Counter: React.FC<CounterProps> = ({ data }) => {
  return (
    <section className="ftco-counter img bg-light" id="section-counter">
      <div className="container">
        <div className="row">
          {data.map((counter, index) => (
            <div key={index} className="col-md-3 justify-content-center counter-wrap ftco-animate">
              <div className="block-18 d-flex">
                <div className="icon d-flex justify-content-center align-items-center">
                  <span className={counter.icon}></span>
                </div>
                <div className="text">
                  <strong className="number" data-number={counter.number}>0</strong>
                  <span>{counter.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Counter;
