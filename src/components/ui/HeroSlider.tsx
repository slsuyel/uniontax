import { Carousel } from "antd";

const images = [
  "https://tds-images.thedailystar.net/sites/default/files/images/2022/12/12/digital_bangladesh.jpg",
  "https://tds-images.thedailystar.net/sites/default/files/styles/very_big_201/public/images/2023/01/16/digital_bangladesh.png",
  "https://tds-images.thedailystar.net/sites/default/files/feature/images/smart-city_myth.jpg",
  "https://untoldmag.org/wp-content/uploads/2024/08/Palestine-Flag-held-high-in-July-Movement.jpeg",
  "https://www.tbsnews.net/sites/default/files/styles/infograph/public/images/2022/06/28/impact-of-the-budget-proposals-info.png",
];

const HeroSlider = () => {
  return (
    <Carousel autoplay effect="fade" dots={false} className="services p-0">
      {images.map((imageUrl, index) => (
        <div key={index}>
          <img src={imageUrl} alt="" className="w-100 hero_slider_img" />
        </div>
      ))}
    </Carousel>
  );
};

export default HeroSlider;
