import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import img1 from "../../assets/media/sumgayit.jpeg"
import img2 from "../../assets/media/debuglegends.jpeg"
import img3 from "../../assets/media/dynamicdeployers.JPG"
import img4 from "../../assets/media/christmas.jpeg"
import { Helmet } from 'react-helmet-async';

const TeacherDashboard = () => {
  return (
    <>
      <Helmet>
          <title>Dashboard</title>
      </Helmet>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={img4} alt="" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} alt="" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} alt="" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img1} alt="" className="w-full h-full object-cover" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default TeacherDashboard;
