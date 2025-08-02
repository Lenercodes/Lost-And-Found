import { useState, useEffect, CSSProperties } from "react";
import Navbar from "../components/Navbar";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";
import { useParams } from "react-router-dom";
import { api } from "../config";
import HashLoader from "react-spinners/HashLoader";
import noimg from "../assets/no-image.png";

function Details() {
  const [item, setItem] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const { id } = useParams();

  const override: CSSProperties = {
    display: "block",
    borderColor: "#fdf004",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${api}/item/${id}`)
      .then((res) => {
        setItem(res.data);
        console.log(res.data);
        setLoading(false);
        
        // Handle image loading after item data is loaded
        if (res.data.image) {
          setImageLoading(true);
          setImageError(false);
          
          const img = new Image();
          img.onload = () => {
            setImage(`${api}/files/${res.data.image}`);
            setImageLoading(false);
          };
          img.onerror = () => {
            setImage(noimg);
            setImageError(true);
            setImageLoading(false);
          };
          img.src = `${api}/files/${res.data.image}`;
          
          // Fallback timeout
          const timeout = setTimeout(() => {
            if (imageLoading) {
              setImage(noimg);
              setImageError(true);
              setImageLoading(false);
            }
          }, 5000);
          
          return () => clearTimeout(timeout);
        } else {
          setImage(noimg);
          setImageLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setImage(noimg);
        setImageLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <main id="detailspage">
      <Navbar />
      <section>
        {loading ? (
          <HashLoader
            color="#fdf004"
            loading={loading}
            cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <div className="details-card">
            <div className="img-container">
              {imageLoading && (
                <div className="image-loading">
                  <div className="loading-spinner"></div>
                </div>
              )}
              <img 
                src={image || noimg} 
                alt={item.title || "Item image"}
                className={imageError ? "no-image" : ""}
                onError={() => {
                  setImage(noimg);
                  setImageError(true);
                }}
              />
            </div>

            <div className="action-container">
              <a href={`tel:${item.phoneno}`}>
                <CallIcon />Call
              </a>
              <a href={`mailto:${item.email}`}>
                <EmailIcon /> Email
              </a>
            </div>
            <h1>{item.title}</h1>
            <div className="details-container">
              <p>Founder</p>
              <p>{item.name}</p>
            </div>

            <div className="details-container desc">
              <p>{item.description}</p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Details;
