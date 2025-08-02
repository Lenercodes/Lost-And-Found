import { useState } from "react";
import Navbar from "../components/Navbar";

function ReportItem() {
  const [reportData, setReportData] = useState({
    itemType: "lost", // lost or found
    category: "",
    title: "",
    description: "",
    location: "",
    date: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    images: [],
    reward: "",
    isUrgent: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReportData({
      ...reportData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setReportData({
      ...reportData,
      images: [...reportData.images, ...files]
    });
  };

  const removeImage = (index) => {
    const newImages = reportData.images.filter((_, i) => i !== index);
    setReportData({
      ...reportData,
      images: newImages
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Report submitted:", reportData);
    alert("Your report has been submitted successfully! It will be visible to the community shortly.");
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

  return (
    <main>
      <Navbar />
      <div className="report-container">
        <div className="report-card">
          <h2>Report {reportData.itemType === 'lost' ? 'Lost' : 'Found'} Item</h2>
          <p className="report-subtitle">
            Help the community by reporting your {reportData.itemType} item
          </p>
          
          <form onSubmit={handleSubmit} className="report-form">
            <div className="form-section">
              <h3>Item Type</h3>
              <div className="type-selector">
                <label className="type-option">
                  <input
                    type="radio"
                    name="itemType"
                    value="lost"
                    checked={reportData.itemType === 'lost'}
                    onChange={handleChange}
                  />
                  <span className="type-label">Lost Item</span>
                </label>
                <label className="type-option">
                  <input
                    type="radio"
                    name="itemType"
                    value="found"
                    checked={reportData.itemType === 'found'}
                    onChange={handleChange}
                  />
                  <span className="type-label">Found Item</span>
                </label>
              </div>
            </div>
            
            <div className="form-section">
              <h3>Item Details</h3>
              
              <div className="input-group">
                <label>Category *</label>
                <select
                  name="category"
                  value={reportData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="input-group">
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={reportData.title}
                  onChange={handleChange}
                  required
                  placeholder={`Brief description of the ${reportData.itemType} item`}
                />
              </div>
              
              <div className="input-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={reportData.description}
                  onChange={handleChange}
                  required
                  placeholder={`Detailed description of the ${reportData.itemType} item (color, brand, size, unique features, etc.)`}
                  rows="4"
                />
              </div>
              
              <div className="input-group">
                <label>Location *</label>
                <input
                  type="text"
                  name="location"
                  value={reportData.location}
                  onChange={handleChange}
                  required
                  placeholder={reportData.itemType === 'lost' ? 'Where did you lose it?' : 'Where did you find it?'}
                />
              </div>
              
              <div className="input-group">
                <label>Date *</label>
                <input
                  type="date"
                  name="date"
                  value={reportData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {reportData.itemType === 'lost' && (
                <div className="input-group">
                  <label>Reward (Optional)</label>
                  <input
                    type="text"
                    name="reward"
                    value={reportData.reward}
                    onChange={handleChange}
                    placeholder="e.g., $50 reward, free coffee, etc."
                  />
                </div>
              )}
              
              <div className="input-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isUrgent"
                    checked={reportData.isUrgent}
                    onChange={handleChange}
                  />
                  <span>Mark as urgent (medical items, keys, important documents)</span>
                </label>
              </div>
            </div>
            
            <div className="form-section">
              <h3>Images</h3>
              <p className="section-description">
                Upload photos of the item (if found) or similar items (if lost)
              </p>
              
              <div className="image-upload">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input"
                />
                <div className="upload-label">
                  <span>📷 Click to upload images</span>
                  <small>You can upload multiple images</small>
                </div>
              </div>
              
              {reportData.images.length > 0 && (
                <div className="image-preview">
                  <h4>Uploaded Images:</h4>
                  <div className="image-grid">
                    {reportData.images.map((image, index) => (
                      <div key={index} className="image-item">
                        <img src={URL.createObjectURL(image)} alt={`Preview ${index + 1}`} />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="remove-image"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="form-section">
              <h3>Contact Information</h3>
              <p className="section-description">
                This information will be shared with potential claimants/finders
              </p>
              
              <div className="input-group">
                <label>Contact Name *</label>
                <input
                  type="text"
                  name="contactName"
                  value={reportData.contactName}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                />
              </div>
              
              <div className="input-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={reportData.contactEmail}
                  onChange={handleChange}
                  required
                  placeholder="Your email address"
                />
              </div>
              
              <div className="input-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={reportData.contactPhone}
                  onChange={handleChange}
                  placeholder="Your phone number (optional)"
                />
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="report-btn">
                Submit Report
              </button>
              <button type="button" className="cancel-btn" onClick={() => window.history.back()}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default ReportItem; 