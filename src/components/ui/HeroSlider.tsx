import { Carousel } from "antd";

const images = [
  "https://tds-images.thedailystar.net/sites/default/files/images/2022/12/12/digital_bangladesh.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Government_of_Bangladesh_Logo_%28unofficial_and_fictional_logo%29.png/1029px-Government_of_Bangladesh_Logo_%28unofficial_and_fictional_logo%29.png",
  "https://tds-images.thedailystar.net/sites/default/files/images/2022/12/12/digital_bangladesh.jpg",
];

const HeroSlider = () => {
  return (
    <Carousel autoplay effect="fade" dots={false} className="services p-0">
      {images.map((imageUrl, index) => (
        <div key={index}>
          <img
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
