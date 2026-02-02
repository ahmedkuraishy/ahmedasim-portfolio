import React from 'react';
import { ResumeData } from '../../types/portfolio';

interface ResumeProps {
    data: ResumeData;
}

const Resume: React.FC<ResumeProps> = ({ data }) => {
    return (
        <section className="ftco-section ftco-no-pb" id="resume-section">
            <div className="container">
                <div className="row justify-content-center pb-5">
                    <div className="col-md-10 heading-section text-center ftco-animate">
                        <h1 className="big big-2">Resume</h1>
                        <h2 className="mb-4">Resume</h2>
                        <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <h3 className="mb-4" style={{ fontWeight: '700', fontSize: '26px' }}>Education</h3>
                        {data?.education?.map((item, index) => (
                            <div key={index} className="resume-wrap ftco-animate">
                                <span className="date">{item.year}</span>
                                <h2>{item.degree}</h2>
                                <span className="position">{item.institution}</span>
                                <p className="mt-4">{item.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="col-md-6">
                        <h3 className="mb-4" style={{ fontWeight: '700', fontSize: '26px' }}>Experience</h3>
                        {data?.experience?.map((item, index) => (
                            <div key={index} className="resume-wrap ftco-animate">
                                <span className="date">{item.year}</span>
                                <h2>{item.degree}</h2>
                                <span className="position">{item.institution}</span>
                                <p className="mt-4">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6 text-center ftco-animate">
                        <p><a href="#" className="btn btn-primary py-4 px-5">Download CV</a></p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Resume;
