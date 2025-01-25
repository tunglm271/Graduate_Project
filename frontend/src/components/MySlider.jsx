import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import slider1 from '@images/slider/slider1.jpg';
import slider2 from '@images/slider/slider2.jpg';
import slider3 from '@images/slider/slider3.jpg';
import slider4 from '@images/slider/slider4.jpg';
const MySlider = () => {
  const settings = {
    dots: true,        // Hiển thị các nút tròn dưới
    infinite: true,    // Tự động quay vòng
    speed: 500,        // Thời gian trượt
    autoplay: true,    // Tự động chạy
    slidesToShow: 1,   // Hiển thị 1 slide
    slidesToScroll: 1, // Trượt 1 slide mỗi lần
    arrows: false      // Ẩn các nút điều hướng
  };

  return (
    <div id='slider'>
      <Slider {...settings}>
        <div className='slider-img'>
          <img src={slider1} alt="Slide 1" />
        </div>
        <div className='slider-img'>
          <img src={slider2} alt="Slide 2" />
        </div>
        <div className='slider-img'>
          <img src={slider3} alt="Slide 3" />
        </div>
        <div className='slider-img'>
          <img src={slider4} alt="Slide 4" />
        </div>
      </Slider>
    </div>
  );
}

export default MySlider;
