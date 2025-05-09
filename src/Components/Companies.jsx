import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Companies() {
  const [categories, setCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    axios.get("https://localhost:7125/api/Company") 
      .then((res) => {
        const grouped = {};
        res.data.forEach((company) => {
        
          const name = company.name;
          if (["TCS", "Capgemini", "Tech Mahindra", "Cognizant", "Mindtree", "L&T", "HCL", "Accenture", "Infosys", "Wipro"].includes(name)) {
            grouped["MNCs"] = [...(grouped["MNCs"] || []), company];
          } else if (["Zerodha", "CRED", "Razorpay","Meesho", "Groww","Swiggy","Upstox","Slice","Instamojo","UrbanClap (now Urban Company)","Notion","Figma",].includes(name)) {
            grouped["Startups"] = [...(grouped["Startups"] || []), company];
          } else if (["Google", "Microsoft", "Adobe", "Oracle", "Ford"].includes(name)) {
            grouped["Product"] = [...(grouped["Product"] || []), company];
          } else if (["Apollo", "Fortis", "Sun Pharma"].includes(name)) {
            grouped["Healthcare"] = [...(grouped["Healthcare"] || []), company];
          } else if (["Tata Steel", "JSW", "L&T"].includes(name)) {
            grouped["Manufacturing"] = [...(grouped["Manufacturing"] || []), company];
          } else {
            grouped["Finance & Banking"] = [...(grouped["Finance & Banking"] || []), company];
          }
        });

        setCategories(grouped);
      })
      .catch((error) => console.error("Error fetching companies", error));
  }, []);

  const handleViewCompanies = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");
  };

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 250, behavior: "smooth" });
  };

  return (
    <div>
      <section className="container bg-light py-5 text-center">
        <h2 className="text-center mb-4">Top companies hiring now</h2>
        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-outline-primary" onClick={scrollLeft}>&lt;</button>

          <div className="top-companies-scroll d-flex overflow-auto gap-3 px-2 py-2" ref={scrollContainerRef}>
            {Object.keys(categories).map((category) => (
              <div key={category} className="card flex-shrink-0" style={{ width: "250px" }}>
                <div className="card-body text-center">
                  <h5 className="card-title">{category}</h5>
                  <p className="card-text">
                    {categories[category].length} companies listed
                  </p>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleViewCompanies(category)}
                  >
                    View Companies
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="btn btn-outline-primary" onClick={scrollRight}>&gt;</button>
        </div>
      </section>

      {selectedCategory && (
        <div className="container mt-5 text-center">
          <h4>{selectedCategory} Companies</h4>
          <div className="mb-3 mt-3">
            <input
              type="text"
              className="form-control w-50 mx-auto"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
            {categories[selectedCategory]
              .filter((company) =>
                company.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((company, index) => (
                <div key={index} className="card p-3" style={{ width: "200px" }}>
                  <h6>{company.name}</h6>
                  <Link to={`/companydetails/${company.name}`}>
                    <button className="btn btn-sm btn-primary mt-2">
                      View Details
                    </button>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Companies;
