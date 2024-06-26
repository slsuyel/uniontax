import { Carousel } from 'antd';

const images = [
  'https://tds-images.thedailystar.net/sites/default/files/images/2022/12/12/digital_bangladesh.jpg',
  'https://tds-images.thedailystar.net/sites/default/files/styles/very_big_201/public/images/2023/01/16/digital_bangladesh.png',
  'https://assignmentpoint.com/wp-content/uploads/2020/10/Digital-Bangladesh.jpg',
  'https://albd.org/media/filer_public/db/f0/dbf0c670-f0f3-46b8-beed-a5afdc6ea7a3/17-07-2019-digital-bangladesh.jpg',
  'https://www.tbsnews.net/sites/default/files/styles/infograph/public/images/2022/06/28/impact-of-the-budget-proposals-info.png',
];

const HeroSlider = () => {
  return (
    <Carousel autoplay effect="fade" dots={false}>
      {images.map((imageUrl, index) => (
        <div key={index}>
          <img src={imageUrl} alt="" className="w-100 hero_slider_img" />
        </div>
      ))}
    </Carousel>
  );
};

export default HeroSlider;
