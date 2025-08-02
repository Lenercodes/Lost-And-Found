import { useState, useEffect } from "react";
import { api } from "../config";
import noImage from "../assets/no-image.png";

export default function Itemcard(props) {
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!props.image) {
      setImage(noImage);
      setImageLoading(false);
      return;
    }

    setImageLoading(true);
    setImageError(false);

    // Create a new image object to test if the image loads
    const img = new Image();
    img.onload = () => {
      setImage(`${api}/files/${props.image}`);
      setImageLoading(false);
    };
    img.onerror = () => {
      setImage(noImage);
      setImageError(true);
      setImageLoading(false);
    };
    img.src = `${api}/files/${props.image}`;

    // Fallback timeout
    const timeout = setTimeout(() => {
      if (imageLoading) {
        setImage(noImage);
        setImageError(true);
        setImageLoading(false);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [props.image, imageLoading]);

  return (
    <a href={"/find/details/" + props.id} data-aos="fade-up">
      <div className="card">
        <div className="card-img">
          {imageLoading && (
            <div className="image-loading">
              <div className="loading-spinner"></div>
            </div>
          )}
          <img
            src={image || noImage}
            alt={props.title || "Item image"}
            className={imageError ? "no-image" : ""}
            onError={() => {
              setImage(noImage);
              setImageError(true);
            }}
          />
        </div>
        <div className="card-desc">
          <h2>{props.title}</h2>
          <p>{props.description}</p>
        </div>
      </div>
    </a>
  );
}
