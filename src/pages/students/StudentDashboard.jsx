import React, { useEffect, useState } from 'react';
import { useGetUserByIdQuery, useGetClassesByStudentIdQuery } from '../../features/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function StudentDashboard() {
  const [userId, setUserId] = useState(null);
  const [classData, setClassData] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.id) {
      setUserId(storedUser.id);
    }

    const storedClasses = JSON.parse(localStorage.getItem('classes'));
    if (storedClasses) {
      setClassData(storedClasses);
    }
  }, []);

  const { data: user, isLoading: userLoading, error: userError } = useGetUserByIdQuery(userId, {
    skip: !userId, 
  });
  const { data: classes, isLoading: classesLoading, error: classesError } = useGetClassesByStudentIdQuery(userId, {
    skip: !userId, 
  });

  useEffect(() => {
    if (classes && classes.length > 0) {
      localStorage.setItem('classes', JSON.stringify(classes));
      setClassData(classes);
    }
  }, [classes]);

  if (userId === null || userLoading || classesLoading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (userError || classesError) {
    return <div className="text-center text-xl text-red-500">An error occurred while loading: {userError?.message || classesError?.message}</div>;
  }

  const userName = user?.userName || 'No name';

  const classList = classData?.length > 0 ? (
    classData.map((classItem) => (
      <li key={classItem.id} className="py-2">
        <strong className="text-lg">Class: {classItem.name}</strong> - Teacher: {classItem.teacherName || 'No name'}
      </li>
    ))
  ) : (
    <li className="py-2">No classes found for this student.</li>
  );

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="header mb-6">
          <h1 className="text-3xl font-semibold mb-2 text-center">Student's Name: {userName}</h1>
          <ul className="list-none text-center">
            {classList}
          </ul>
        </div>
        <div className="slider">
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
            <SwiperSlide style={{ height: "650px" }}>
              <img className="w-full h-full object-cover rounded-lg" src='https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp' alt="slide" />
            </SwiperSlide>
            <SwiperSlide style={{ height: "650px" }}>
              <img className="w-full h-full object-cover rounded-lg" src='https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg' alt="slide" />
            </SwiperSlide>
            <SwiperSlide style={{ height: "650px" }}>
              <img className="w-full h-full object-cover rounded-lg" src='https://th.bing.com/th/id/OIG1.wQ7nqzXG6LLji1s3MrOP' alt="slide" />
            </SwiperSlide>
            <SwiperSlide style={{ height: "650px" }}>
              <img className="w-full h-full object-cover rounded-lg" src='https://th.bing.com/th/id/OIG4.7h3EEAkofdcgjDEjeOyg' alt="slide" />
            </SwiperSlide>
            <SwiperSlide style={{ height: "650px" }}>
              <img className="w-full h-full object-cover rounded-lg" src='https://imageupscaler.com/wp-content/uploads/2024/07/deblured-cutty-fox.jpg' alt="slide" />
            </SwiperSlide>
            <SwiperSlide style={{ height: "650px" }}>
              <img className="w-full h-full object-cover rounded-lg" src='https://replicate.delivery/pbxt/JF3foGR90vm9BXSEXNaYkaeVKHYbJPinmpbMFvRtlDpH4MMk/out-0-1.png' alt="slide" />
            </SwiperSlide>
            <SwiperSlide style={{ height: "650px" }}>
              <img className="w-full h-full object-cover rounded-lg" src='https://www.piclumen.com/wp-content/uploads/2024/10/piclumen-first-01.webp' alt="slide" />
            </SwiperSlide>
            <SwiperSlide style={{ height: "650px" }}>
              <img className="w-full h-full object-cover rounded-lg" src='https://th.bing.com/th/id/OIG4.D1xlg_PkAbPbJDw14g2r' alt="slide" />
            </SwiperSlide>
            <SwiperSlide style={{ height: "650px" }}>
              <img className="w-full h-full object-cover rounded-lg" src='https://assets.monica.im/tools-web/_next/static/media/imageGeneratorFeatureIntro1.9f5e7e23.webp' alt="slide" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}
