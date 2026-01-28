import React from 'react';
import { ProjectData } from '../types/portfolio';

interface ProjectsProps {
  data: ProjectData[];
}

const Projects: React.FC<ProjectsProps> = ({ data }) => {
  return (
    <section className="ftco-section ftco-project" id="projects-section">
      <div className="container-fluid px-md-4">
        <div className="row justify-content-center pb-5">
          <div className="col-md-12 heading-section text-center ftco-animate">
            <span className="subheading">Accomplishments</span>
            <h2 className="mb-4">Our Projects</h2>
          </div>
        </div>
        <div className="row">
          {data.map((project, index) => (
            <div key={index} className="col-md-3">
              <div className="project img shadow ftco-animate d-flex justify-content-center align-items-center" style={{backgroundImage: `url(${project.image})`}}>
                <div className="overlay"></div>
                <div className="text text-center p-4">
                  <h3><a href="#">{project.title}</a></h3>
                  <span>{project.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
