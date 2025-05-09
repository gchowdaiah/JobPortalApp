import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Jobs = () => {
  const [SearchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (SearchKeyword.trim()) {
      navigate(`/search?keyword=${SearchKeyword}`);
    }
  };

  return (
    <div>
      {/* Main Search Section */}
      <section className="bg-light py-5 text-center">
        <div className="container">
          <h1 className="mb-3 fw-bold">Find your dream job now</h1>
          <p className="text-muted mb-4">5 lakh + jobs for you to explore</p>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter skills, designation, or companies"
                  value={SearchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="container py-5">
        <h2 className="text-center mb-4">Explore job categories</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <h5 className="card-title">Software Development</h5>
                <p className="card-text">Find jobs in software development.</p>
                <Link
                  to="/jobs/software-development"
                  className="btn btn-primary"
                >
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <h5 className="card-title">Marketing</h5>
                <p className="card-text">Find jobs in marketing.</p>
                <Link to="/jobs/marketing" className="btn btn-primary">
                  Explore
                </Link>
              </div>
            </div>
            <div className="card mb-4">
              <div className="card-body text-center">
                <h5 className="card-title">Finance & Banking</h5>
                <p className="card-text">Find jobs in Finance and Banking.</p>
                <Link to="/jobs/marketing" className="btn btn-primary">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <h5 className="card-title">Data Science</h5>
                <p className="card-text">Find jobs in data science.</p>
                <Link to="/jobs/data-science" className="btn btn-primary">
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="container py-5">
        <h2 className="text-center mb-4">Featured Jobs</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Software Engineer</h5>
                <p className="card-text">Company: Tech Innovators</p>
                <p className="card-text">Location: Hyderabad</p>
                <Link to="/jobs/1" className="btn btn-outline-primary btn-sm">
                  View Details
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Marketing Specialist</h5>
                <p className="card-text">Company: Creative Minds</p>
                <p className="card-text">Location: Bangalore</p>
                <Link to="/jobs/2" className="btn btn-outline-primary btn-sm">
                  View Details
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Data Analyst</h5>
                <p className="card-text">Company: Data Wizards</p>
                <p className="card-text">Location: Pune</p>
                <Link to="/jobs/3" className="btn btn-outline-primary btn-sm">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Companies */}
      <section className="container py-5">
        <h2 className="text-center mb-4">Top Companies</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <h5 className="card-title">MNCs</h5>
                <p className="card-text">2k + are actively hiring.</p>
                <Link
                  to="/companies"
                  className="btn btn-outline-primary btn-sm"
                >
                  View Company
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <h5 className="card-title">Startups</h5>
                <p className="card-text">640 are actively hiring.</p>
                <Link
                  to="/companies"
                  className="btn btn-outline-primary btn-sm"
                >
                  View Company
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <h5 className="card-title">Product</h5>
                <p className="card-text">1k + are actively hiring.</p>
                <Link
                  to="/companies"
                  className="btn btn-outline-primary btn-sm"
                >
                  View Company
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="container py-5">
        <h2 className="text-center mb-4">Latest News</h2>
        <div className="card-deck">
          <div className="card">
            <img
              src="https://via.placeholder.com/150"
              className="card-img-top"
              alt="News"
            />
            <div className="card-body">
              <h5 className="card-title">Job Market Trends</h5>
              <p className="card-text">
                Stay updated with the latest trends in the job market.
              </p>
              <Link to="/news/1" className="btn btn-outline-primary btn-sm">
                Read More
              </Link>
            </div>
          </div>
          <div className="card">
            <img
              src="https://via.placeholder.com/150"
              className="card-img-top"
              alt="News"
            />
            <div className="card-body">
              <h5 className="card-title">Career Advice</h5>
              <p className="card-text">
                Get expert advice on how to advance your career.
              </p>
              <Link to="/news/2" className="btn btn-outline-primary btn-sm">
                Read More
              </Link>
            </div>
          </div>
          <div className="card">
            <img
              src="https://via.placeholder.com/150"
              className="card-img-top"
              alt="News"
            />
            <div className="card-body">
              <h5 className="card-title">Success Stories</h5>
              <p className="card-text">
                Read inspiring success stories from our users.
              </p>
              <Link to="/news/3" className="btn btn-outline-primary btn-sm">
                Read More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Jobs;
