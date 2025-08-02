import { useState } from "react";
import Navbar from "../components/Navbar";

function Profile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data - in real app this would come from authentication context
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "2024-01-15",
    avatar: null,
    isAdmin: false
  });

  const [userReports] = useState([
    {
      id: 1,
      type: "lost",
      title: "Lost iPhone 13",
      status: "active",
      date: "2024-01-20",
      category: "Electronics"
    },
    {
      id: 2,
      type: "found",
      title: "Found Keys",
      status: "claimed",
      date: "2024-01-18",
      category: "Keys & Personal Items"
    }
  ]);

  const [userClaims] = useState([
    {
      id: 1,
      itemTitle: "Found Wallet",
      status: "pending",
      date: "2024-01-22",
      itemId: 123
    }
  ]);

  const handleSave = () => {
    setIsEditing(false);
    // In real app, save to backend
    console.log("Saving user data:", userData);
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData({
        ...userData,
        avatar: URL.createObjectURL(file)
      });
    }
  };

  return (
    <main>
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>Manage your account and view your activity</p>
        </div>
        
        <div className="profile-content">
          <div className="profile-sidebar">
            <div className="profile-tabs">
              <button
                className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                Profile Info
              </button>
              <button
                className={`tab-btn ${activeTab === "reports" ? "active" : ""}`}
                onClick={() => setActiveTab("reports")}
              >
                My Reports
              </button>
              <button
                className={`tab-btn ${activeTab === "claims" ? "active" : ""}`}
                onClick={() => setActiveTab("claims")}
              >
                My Claims
              </button>
              {userData.isAdmin && (
                <button
                  className={`tab-btn ${activeTab === "admin" ? "active" : ""}`}
                  onClick={() => setActiveTab("admin")}
                >
                  Admin Panel
                </button>
              )}
            </div>
          </div>
          
          <div className="profile-main">
            {activeTab === "profile" && (
              <div className="profile-info">
                <div className="avatar-section">
                  <div className="avatar-container">
                    <img
                      src={userData.avatar || "https://via.placeholder.com/150"}
                      alt="Profile"
                      className="avatar"
                    />
                    {isEditing && (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="avatar-upload"
                      />
                    )}
                  </div>
                  <div className="user-basic-info">
                    <h2>{userData.name}</h2>
                    <p className="user-email">{userData.email}</p>
                    <p className="user-join-date">Member since {userData.joinDate}</p>
                    {userData.isAdmin && <span className="admin-badge">Admin</span>}
                  </div>
                </div>
                
                <div className="profile-form">
                  <h3>Personal Information</h3>
                  <div className="form-row">
                    <div className="input-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="input-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="input-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  <div className="form-actions">
                    {isEditing ? (
                      <>
                        <button onClick={handleSave} className="save-btn">
                          Save Changes
                        </button>
                        <button onClick={() => setIsEditing(false)} className="cancel-btn">
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button onClick={() => setIsEditing(true)} className="edit-btn">
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "reports" && (
              <div className="reports-section">
                <h3>My Reports</h3>
                <div className="reports-list">
                  {userReports.map(report => (
                    <div key={report.id} className="report-item">
                      <div className="report-header">
                        <span className={`status-badge ${report.status}`}>
                          {report.status}
                        </span>
                        <span className="report-date">{report.date}</span>
                      </div>
                      <h4>{report.title}</h4>
                      <p className="report-category">{report.category}</p>
                      <div className="report-actions">
                        <button className="view-btn">View Details</button>
                        {report.status === "active" && (
                          <button className="edit-btn">Edit</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === "claims" && (
              <div className="claims-section">
                <h3>My Claims</h3>
                <div className="claims-list">
                  {userClaims.map(claim => (
                    <div key={claim.id} className="claim-item">
                      <div className="claim-header">
                        <span className={`status-badge ${claim.status}`}>
                          {claim.status}
                        </span>
                        <span className="claim-date">{claim.date}</span>
                      </div>
                      <h4>{claim.itemTitle}</h4>
                      <div className="claim-actions">
                        <button className="view-btn">View Details</button>
                        {claim.status === "pending" && (
                          <button className="cancel-btn">Cancel Claim</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === "admin" && userData.isAdmin && (
              <div className="admin-section">
                <h3>Admin Panel</h3>
                <div className="admin-stats">
                  <div className="stat-card">
                    <h4>Total Reports</h4>
                    <p className="stat-number">1,234</p>
                  </div>
                  <div className="stat-card">
                    <h4>Pending Claims</h4>
                    <p className="stat-number">56</p>
                  </div>
                  <div className="stat-card">
                    <h4>Active Users</h4>
                    <p className="stat-number">789</p>
                  </div>
                  <div className="stat-card">
                    <h4>Success Rate</h4>
                    <p className="stat-number">87%</p>
                  </div>
                </div>
                
                <div className="admin-actions">
                  <button className="admin-btn">Manage Reports</button>
                  <button className="admin-btn">Review Claims</button>
                  <button className="admin-btn">User Management</button>
                  <button className="admin-btn">System Settings</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile; 