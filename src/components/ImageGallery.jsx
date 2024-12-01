import { Carousel, Image } from "react-bootstrap";
import { useState, useEffect } from "react";

const ImageGallery = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/content/imageGallery.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((exc) => console.log(exc));
  }, []);
  return (
    <>
      {data ? (
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
      ) : (
        <h3>loading content...</h3>
      )}
    </>
  );
};

export default ImageGallery;
