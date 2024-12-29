import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function StudentDashboard() {
  return (
    <>
    
      <Swiper
        spaceBetween={10}
        centeredSlides={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        
        <SwiperSlide><img src='https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp'/></SwiperSlide>
        <SwiperSlide><img src='https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg'/></SwiperSlide>
        <SwiperSlide><img src='https://th.bing.com/th/id/OIG1.wQ7nqzXG6LLji1s3MrOP'/></SwiperSlide>
        <SwiperSlide><img src='https://th.bing.com/th/id/OIG4.7h3EEAkofdcgjDEjeOyg'/></SwiperSlide>
        <SwiperSlide><img src='https://imageupscaler.com/wp-content/uploads/2024/07/deblured-cutty-fox.jpg'/></SwiperSlide>
        <SwiperSlide><img src='https://replicate.delivery/pbxt/JF3foGR90vm9BXSEXNaYkaeVKHYbJPinmpbMFvRtlDpH4MMk/out-0-1.png'/></SwiperSlide>
        <SwiperSlide><img src='https://www.piclumen.com/wp-content/uploads/2024/10/piclumen-first-01.webp'/></SwiperSlide>
        <SwiperSlide><img src='https://th.bing.com/th/id/OIG4.D1xlg_PkAbPbJDw14g2r'/></SwiperSlide>
        <SwiperSlide><img src='https://assets.monica.im/tools-web/_next/static/media/imageGeneratorFeatureIntro1.9f5e7e23.webp'/></SwiperSlide>
      </Swiper>

    </>

  );
}
