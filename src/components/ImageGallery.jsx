import { Carousel, Image } from "react-bootstrap";
import { useState, useEffect } from "react";

/**
 * ImageGallery is a React component that fetches image data from a JSON file
 * (`/content/imageGallery.json`) and displays the images in a Bootstrap `Carousel` component.
 * Each image is displayed in a carousel item, and the images are loaded dynamically from the fetched data.
 *
 * @component
 *
 * @example
 * // Usage:
 * <ImageGallery />
 *
 * @requires fetch - Used to retrieve image data from the server (`/content/imageGallery.json`).
 * @requires Carousel - Bootstrap Carousel component used to display images.
 * @requires Image - Bootstrap Image component used to render individual images inside the carousel.
 */
const ImageGallery = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL;
    fetch(`${baseUrl}/content/imageGallery.json`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((exc) => {
        console.log(exc);
        setError("Failed to load content");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="text-content">
        <h3>loading content...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-content">
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <Carousel
      style={{
        margin: "auto",
      }}
    >
      {data.imageNames.map((path, idx) => (
        <Carousel.Item key={idx}>
          <Image src={`/images/${path}.jpg`} className="images" />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageGallery;
