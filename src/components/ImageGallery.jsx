import { Carousel, Image } from "react-bootstrap";

const ImageGallery = () => {
  return (
    <Carousel style={{
      margin: "auto",

    }}>
      <Carousel.Item>
        <Image src="/images/band_1.jpg" className="images"/>
      </Carousel.Item>
      <Carousel.Item>
        <Image src="/images/band_2.jpg" className="images"/>
      </Carousel.Item>
      <Carousel.Item>
        <Image src="/images/band_3.jpg" className="images"/>
      </Carousel.Item>
      <Carousel.Item>
        <Image src="/images/band_4.jpg" className="images"/>
      </Carousel.Item>
      <Carousel.Item>
        <Image src="/images/band_5.jpg" className="images"/>
      </Carousel.Item>
      <Carousel.Item>
        <Image src="/images/band_6.jpg" className="images"/>
      </Carousel.Item>
      <Carousel.Item>
        <Image src="/images/band_7.jpg" className="images"/>
      </Carousel.Item>
      <Carousel.Item>
        <Image src="/images/band_8.jpg" className="images"/>
      </Carousel.Item>
    </Carousel>
  );
};

export default ImageGallery;
