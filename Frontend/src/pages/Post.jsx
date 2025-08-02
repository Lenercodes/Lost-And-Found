import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { api } from "../config";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Post() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    title: "",
    desc: "",
  });
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [btn, setBtn] = useState(true);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    setFilePreview(null);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.desc.trim()) newErrors.desc = "Description is required";
    if (!file) newErrors.file = "Please select an image";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitData = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      enqueueSnackbar("Please fill all required fields correctly", { variant: "error" });
      return;
    }

    setBtn(false);
    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.name);
    formDataToSend.append("phoneno", formData.phone);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.desc);
    formDataToSend.append("file", file);

    try {
      await axios.post(`${api}/item`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      enqueueSnackbar("Item Posted Successfully!", { variant: "success" });
      navigate("/find");
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Error posting item. Please try again.", { variant: "error" });
      setBtn(true);
    }
  };

  return (
    <main id="postItem">
      <Navbar />
      <section>
        <div className="page-header">
          <h1 className="lfh1">Report Found Item</h1>
          <p className="page-subtitle">
            Help someone find their lost item by reporting what you found
          </p>
        </div>

        <div className="form-container">
          <h2>Item Details</h2>
          <p className="form-subtitle">Please provide accurate information to help the owner find their item</p>
          
          <form className="form" encType="multipart/form-data" onSubmit={submitData}>
            <div className="form-grid">
              <div className="input-container">
                <label htmlFor="name">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={errors.name ? "error" : ""}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="input-container">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className={errors.email ? "error" : ""}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="input-container">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className={errors.phone ? "error" : ""}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="input-container full-width">
                <label htmlFor="title">Item Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Brief description of the found item"
                  className={errors.title ? "error" : ""}
                />
                {errors.title && <span className="error-message">{errors.title}</span>}
              </div>

              <div className="input-container full-width">
                <label htmlFor="desc">Description *</label>
                <textarea
                  id="desc"
                  name="desc"
                  value={formData.desc}
                  onChange={handleInputChange}
                  placeholder="Provide detailed description of the item (color, brand, size, unique features, etc.)"
                  rows="4"
                  className={errors.desc ? "error" : ""}
                />
                {errors.desc && <span className="error-message">{errors.desc}</span>}
              </div>

              <div className="input-container full-width">
                <label htmlFor="file">Item Image *</label>
                <div className="file-upload-container">
                  {!filePreview ? (
                    <div className="file-upload-area">
                      <input
                        type="file"
                        id="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        name="file"
                        className="file-input"
                      />
                      <div className="upload-placeholder">
                        <CloudUploadIcon className="upload-icon" />
                        <p>Click to upload image or drag and drop</p>
                        <span>Supports: JPG, PNG, GIF (Max 5MB)</span>
                      </div>
                    </div>
                  ) : (
                    <div className="file-preview">
                      <img src={filePreview} alt="Preview" className="preview-image" />
                      <button
                        type="button"
                        onClick={removeFile}
                        className="remove-file-btn"
                      >
                        <DeleteIcon />
                        Remove
                      </button>
                    </div>
                  )}
                </div>
                {errors.file && <span className="error-message">{errors.file}</span>}
              </div>
            </div>

            <div className="form-actions">
              {btn ? (
                <button type="submit" className="submitbtn">
                  Report Found Item
                </button>
              ) : (
                <button type="button" className="submitbtn loading" disabled>
                  <div className="spinner"></div>
                  Posting...
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
