import React from 'react';
import { BlogPostData } from '../../types/portfolio';
import { getSafeImageUrl } from '../../utils/imageUtils';

interface BlogProps {
  data: BlogPostData[];
}

const Blog: React.FC<BlogProps> = ({ data }) => {
  return (
    <section className="ftco-section bg-light" id="blog-section">
      <div className="container">
        <div className="row justify-content-center mb-5 pb-5">
          <div className="col-md-7 heading-section text-center ftco-animate">
            <span className="subheading">Blog</span>
            <h2 className="mb-4">Our Blog</h2>
          </div>
        </div>
        <div className="row d-flex">
          {data.map((post, index) => (
            <div key={index} className="col-md-4 d-flex ftco-animate">
              <div className="blog-entry justify-content-end">
                <a href="#" className="block-20" style={{backgroundImage: `url(${getSafeImageUrl(post.image)})`}}>
                </a>
                <div className="text mt-3 float-right d-block">
                  <div className="d-flex align-items-center mb-3 meta">
                    <p className="mb-0">
                      <span className="mr-2">{post.date}</span>
                      <a href="#" className="mr-2">{post.author}</a>
                    </p>
                  </div>
                  <h3 className="heading"><a href="#">{post.title}</a></h3>
                  <p>{post.excerpt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
