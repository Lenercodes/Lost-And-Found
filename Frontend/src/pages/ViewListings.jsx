import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function ViewListings() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: "all",
    category: "all",
    status: "all",
    search: ""
  });

  // Mock data - in real app this would come from API
  useEffect(() => {
    const mockItems = [
      {
        id: 1,
        type: "lost",
        title: "Lost iPhone 13 Pro",
        description: "Black iPhone 13 Pro with clear case, lost at Central Park",
        category: "Electronics",
        location: "Central Park, NYC",
        date: "2024-01-20",
        status: "active",
        image: "https://via.placeholder.com/300x200",
        contactName: "John Doe",
        reward: "$100 reward"
      },
      {
        id: 2,
        type: "found",
        title: "Found Keys",
        description: "Set of keys with red keychain, found near Starbucks",
        category: "Keys & Personal Items",
        location: "Starbucks, Downtown",
        date: "2024-01-19",
        status: "active",
        image: "https://via.placeholder.com/300x200",
        contactName: "Jane Smith"
      },
      {
        id: 3,
        type: "lost",
        title: "Lost Wallet",
        description: "Brown leather wallet with ID and credit cards",
        category: "Keys & Personal Items",
        location: "Subway Station",
        date: "2024-01-18",
        status: "claimed",
        image: "https://via.placeholder.com/300x200",
        contactName: "Mike Johnson",
        reward: "$50 reward"
      },
      {
        id: 4,
        type: "found",
        title: "Found Dog",
        description: "Golden retriever with blue collar, very friendly",
        category: "Pets",
        location: "Dog Park",
        date: "2024-01-17",
        status: "active",
        image: "https://via.placeholder.com/300x200",
        contactName: "Sarah Wilson"
      }
    ];
    
    setItems(mockItems);
    setFilteredItems(mockItems);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = items;

    // Filter by type
    if (filters.type !== "all") {
      filtered = filtered.filter(item => item.type === filters.type);
    }

    // Filter by category
    if (filters.category !== "all") {
      filtered = filtered.filter(item => item.category === filters.category);
    }

    // Filter by status
    if (filters.status !== "all") {
      filtered = filtered.filter(item => item.status === filters.status);
    }

    // Filter by search
    if (filters.search) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.location.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [items, filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const categories = [
    "Electronics",
    "Jewelry & Watches",
    "Clothing & Accessories",
    "Books & Documents",
    "Pets",
    "Keys & Personal Items",
    "Sports Equipment",
    "Musical Instruments",
    "Other"
  ];

  if (loading) {
    return (
      <main>
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner">Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <div className="listings-container">
        <div className="listings-header">
          <h1>View All Listings</h1>
          <p>Browse through all lost and found items in the community</p>
        </div>
        
        <div className="filters-section">
          <div className="search-bar">
            <input
              type="text"
              name="search"
              placeholder="Search items..."
              value={filters.search}
              onChange={handleFilterChange}
              className="search-input"
            />
          </div>
          
          <div className="filter-controls">
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="all">All Types</option>
              <option value="lost">Lost Items</option>
              <option value="found">Found Items</option>
            </select>
            
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="claimed">Claimed</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>
        
        <div className="listings-stats">
          <p>Showing {filteredItems.length} of {items.length} items</p>
        </div>
        
        <div className="listings-grid">
          {filteredItems.length === 0 ? (
            <div className="no-results">
              <h3>No items found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          ) : (
            filteredItems.map(item => (
              <div key={item.id} className="listing-card">
                <div className="listing-image">
                  <img src={item.image} alt={item.title} />
                  <div className={`type-badge ${item.type}`}>
                    {item.type === 'lost' ? 'Lost' : 'Found'}
                  </div>
                  <div className={`status-badge ${item.status}`}>
                    {item.status}
                  </div>
                </div>
                
                <div className="listing-content">
                  <h3>{item.title}</h3>
                  <p className="listing-description">{item.description}</p>
                  
                  <div className="listing-details">
                    <div className="detail-item">
                      <span className="detail-label">Category:</span>
                      <span className="detail-value">{item.category}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Location:</span>
                      <span className="detail-value">{item.location}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Date:</span>
                      <span className="detail-value">{item.date}</span>
                    </div>
                    {item.reward && (
                      <div className="detail-item">
                        <span className="detail-label">Reward:</span>
                        <span className="detail-value reward">{item.reward}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="listing-actions">
                    <button className="view-btn">View Details</button>
                    {item.type === 'found' && item.status === 'active' && (
                      <button className="claim-btn">Claim Item</button>
                    )}
                    {item.type === 'lost' && item.status === 'active' && (
                      <button className="contact-btn">Contact Owner</button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="listings-pagination">
          <button className="pagination-btn" disabled>Previous</button>
          <span className="page-info">Page 1 of 1</span>
          <button className="pagination-btn" disabled>Next</button>
        </div>
      </div>
    </main>
  );
}

export default ViewListings; 