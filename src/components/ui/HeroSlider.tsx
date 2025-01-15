import { Carousel } from "antd";
import flag from "/images/bd-flag.webp";
import bd from "/images/bd-logo.webp";
const images = [bd, flag];

const HeroSlider = () => {
  return (
    <Carousel autoplay effect="fade" dots={false} className="services p-0">
      {images.map((imageUrl, index) => (
        <div key={index}>
          <img
            loading="lazy"
            src={imageUrl}
            alt=""
            className="w-100 hero_slider_img object-fit-cover"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default HeroSlider;
