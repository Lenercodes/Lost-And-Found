import { useState } from "react";
import Navbar from "../components/Navbar";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login logic
      console.log("Login:", { email: formData.email, password: formData.password });
    } else {
      // Handle register logic
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!");
        return;
      }
      console.log("Register:", formData);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main>
      <Navbar />
      <div className="auth-container">
        <div className="auth-card">
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p className="auth-subtitle">
            {isLogin ? "Sign in to your account" : "Join our community to help find lost items"}
          </p>
          
          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            {!isLogin && (
              <div className="input-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            {!isLogin && (
              <div className="input-group">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            
            <button type="submit" className="auth-btn">
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>
          
          <div className="auth-switch">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                className="switch-btn"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login; 