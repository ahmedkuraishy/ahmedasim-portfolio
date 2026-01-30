import React from 'react';
import { SkillData } from '../../types/portfolio';

interface SkillsProps {
  data: SkillData[];
}

const Skills: React.FC<SkillsProps> = ({ data }) => {
  return (
    <section className="ftco-section bg-light" id="skills-section">
      <div className="container">
        <div className="row justify-content-center pb-5">
          <div className="col-md-12 heading-section text-center ftco-animate">
            <span className="subheading">Skills</span>
            <h2 className="mb-4">My Skills</h2>
          </div>
        </div>
        <div className="row">
          {data.map((skill, index) => (
            <div key={index} className="col-md-6 animate-box">
              <div className="progress-wrap ftco-animate">
                <h3>{skill.name}</h3>
                <div className="progress">
                  <div className="progress-bar color-1" role="progressbar" aria-valuenow={skill.value}
                    aria-valuemin={0} aria-valuemax={100} style={{width:`${skill.value}%`}}>
                    <span>{skill.value}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
