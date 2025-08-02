import React, { useState, CSSProperties, useEffect } from "react";
import Itemcard from "../components/ItemCard";
import Navbar from "../components/Navbar";
import axios from "axios";
import { api } from "../config";
import HashLoader from "react-spinners/HashLoader";
import AOS from "aos";
import "aos/dist/aos.css";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

function Find() {
  const [item, setItem] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    AOS.init({ duration: 750 });
  }, []);

  const override: CSSProperties = {
    display: "block",
    borderColor: "#007bff",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  };

  useEffect(() => {
    axios
      .get(`${api}/item`)
      .then((res) => {
        const items = res.data.data;
        setItem(items);
        setFilteredItems(items);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = [...item];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort items
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredItems(filtered);
  }, [item, searchTerm, sortBy]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSortBy("newest");
  };

  return (
    <main id="findpage">
      <Navbar />
      <section>
        <div className="page-header">
          <h1 className="lfh1">Find It Back Items</h1>
          <p className="page-subtitle">
            Browse through lost and found items in our community
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-container">
            <div className="search-input-wrapper">
              <SearchIcon className="search-icon" />
              <input
                type="text"
                placeholder="Search items by title, description, or name..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
            </div>
            <button
              className="filter-toggle-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FilterListIcon />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="filters-panel">
              <div className="filter-group">
                <label>Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">Title A-Z</option>
                </select>
              </div>
              <button onClick={clearFilters} className="clear-filters-btn">
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Results Info */}
        <div className="results-info">
          <p>
            Showing {filteredItems.length} of {item.length} items
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        <div className="item-container">
          {loading ? (
            <HashLoader
              color="#007bff"
              loading={loading}
              cssOverride={override}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : filteredItems.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No items found</h3>
              <p>
                {searchTerm
                  ? `No items match your search for "${searchTerm}"`
                  : "No items available at the moment"}
              </p>
              {searchTerm && (
                <button onClick={clearFilters} className="clear-search-btn">
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            filteredItems.map((findItem, index) => {
              return (
                <Itemcard
                  key={findItem._id || index}
                  id={findItem._id}
                  title={findItem.title}
                  description={findItem.description}
                  image={findItem.image}
                />
              );
            })
          )}

          {/* Spacer items for better grid layout */}
          <div className="extraItem"></div>
          <div className="extraItem"></div>
          <div className="extraItem"></div>
        </div>
      </section>
    </main>
  );
}

export default Find;
