import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function ClaimItem() {
  const { id } = useParams();
  const [claimData, setClaimData] = useState({
    fullName: "",
    email: "",
    phone: "",
    proofOfOwnership: "",
    additionalDetails: "",
    preferredContact: "email"
  });

  const handleChange = (e) => {
    setClaimData({
      ...claimData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Claim submitted:", { itemId: id, ...claimData });
    alert("Your claim has been submitted! We'll review and contact you within 24 hours.");
  };

  return (
    <main>
      <Navbar />
      <div className="claim-container">
        <div className="claim-card">
          <h2>Claim Item</h2>
          <p className="claim-subtitle">
            Please provide your details and proof of ownership to claim this item
          </p>
          
          <form onSubmit={handleSubmit} className="claim-form">
            <div className="form-section">
              <h3>Personal Information</h3>
              
              <div className="input-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={claimData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="input-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={claimData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                />
              </div>
              
              <div className="input-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={claimData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div className="input-group">
                <label>Preferred Contact Method</label>
                <select
                  name="preferredContact"
                  value={claimData.preferredContact}
                  onChange={handleChange}
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>
            
            <div className="form-section">
              <h3>Proof of Ownership</h3>
              <p className="section-description">
                Please provide details that prove this item belongs to you
              </p>
              
              <div className="input-group">
                <label>Proof of Ownership *</label>
                <textarea
                  name="proofOfOwnership"
                  value={claimData.proofOfOwnership}
                  onChange={handleChange}
                  required
                  placeholder="Describe how you can prove this item is yours (e.g., unique marks, serial numbers, purchase receipts, etc.)"
                  rows="4"
                />
              </div>
              
              <div className="input-group">
                <label>Additional Details</label>
                <textarea
                  name="additionalDetails"
                  value={claimData.additionalDetails}
                  onChange={handleChange}
                  placeholder="Any additional information that might help verify your claim"
                  rows="3"
                />
              </div>
            </div>
            
            <div className="form-section">
              <h3>Verification Process</h3>
              <div className="verification-steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Submit Claim</h4>
                    <p>Your claim will be reviewed by our team</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Verification</h4>
                    <p>We'll verify your proof of ownership</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Contact</h4>
                    <p>We'll contact you within 24 hours</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Arrangement</h4>
                    <p>We'll help arrange the item return</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="claim-btn">
                Submit Claim
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

export default ClaimItem; 