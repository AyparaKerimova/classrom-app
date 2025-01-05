import React, { useEffect, useState } from 'react';
import { useGetUserByIdQuery, useGetClassesByStudentIdQuery, useGetInvitationsByStudentIdQuery } from '../../features/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Helmet } from 'react-helmet-async';

export default function StudentDashboard() {
  const [userId, setUserId] = useState(null);
  const [classData, setClassData] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvitation, setSelectedInvitation] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.id) {
      setUserId(storedUser.id);
    }
  }, []);

  useEffect(() => {
    const storedClassData = JSON.parse(localStorage.getItem('classes'));
    if (storedClassData) {
      setClassData(storedClassData);
    }
  }, []);

  const { data: user, isLoading: userLoading, error: userError } = useGetUserByIdQuery(userId, {
    skip: !userId,
  });
  const { data: classes, isLoading: classesLoading, error: classesError } = useGetClassesByStudentIdQuery(userId, {
    skip: !userId,
  });
  const { data: invitationsData, isLoading: invitationsLoading, error: invitationsError } = useGetInvitationsByStudentIdQuery(userId, {
    skip: !userId,
  });

  useEffect(() => {
    if (classes) {
      setClassData(classes);
      localStorage.setItem('classes', JSON.stringify(classes));
    }
    if (invitationsData) {
      setInvitations(invitationsData);
    }
  }, [classes, invitationsData]);

  if (userLoading || classesLoading || invitationsLoading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (userError || classesError || invitationsError) {
    return <div className="text-center text-xl text-red-500">An error occurred while loading data.</div>;
  }

  const userName = user?.username || 'No name';

  const classList = classData.length > 0 ? (
    classData.map((classItem) => (
      <li key={classItem.id} className="py-2">
        <strong className="text-lg">Class: {classItem.name}</strong> - Teacher: {classItem.teacherName || 'No name'}
      </li>
    ))
  ) : (
    <li className="py-2">No classes found for this student</li>
  );

  const handleInvitationsClick = (invitation) => {
    setSelectedInvitation(invitation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInvitation(null);
  };

  return (
    <>
      <Helmet>
        <title>Student Dashboard</title>
      </Helmet>
      <div className="container mx-auto p-4">
        <div className="header mb-6">
          <h1 className="text-3xl font-semibold mb-2 text-center">Student's Name: {userName}</h1>
          <ul className="list-none text-center">
            {classList}
          </ul>
        </div>

        <div className="relative inline-flex group mb-6">
          <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg filter group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200"></div>
          <button
            onClick={() => handleInvitationsClick(invitations[0])}
            className=" relative inline-flex items-center justify-center px-5 py-2 text-base font-bold text-white transition-all duration-200 bg-gray-900 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-600 rounded"
          >
            Invitations
          </button>
        </div>

        {isModalOpen && selectedInvitation && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4">Invitation Details</h3>
              <p><strong>Class:</strong> {selectedInvitation.classId}</p>
              <p><strong>Status:</strong> {selectedInvitation.status}</p>
              <p><strong>Expires At:</strong> {new Date(selectedInvitation.expiresAt).toLocaleString()}</p>
              <div className="mt-4 text-right">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
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
              <img className="w-full h-full object-cover rounded-lg" src='/src/assets/media/NewYear.jpg' alt="slide" />
            </SwiperSlide>
            <SwiperSlide style={{ height: "650px" }}>
              <img className="w-full h-full object-cover rounded-lg" src='/src/assets/media/christmas.jpeg' alt="slide" />
            </SwiperSlide>
            <SwiperSlide style={{ height: "650px" }}>
              <img className="w-full h-full object-cover rounded-lg" src='/src/assets/media/debuglegends.jpeg' alt="slide" />
            </SwiperSlide>
            <SwiperSlide style={{ height: "650px" }}>
              <img className="w-full h-full object-cover rounded-lg" src='/src/assets/media/dynamicdeployers.JPG' alt="slide" />
            </SwiperSlide>
            <SwiperSlide style={{ height: "650px" }}>
              <img className="w-full h-full object-cover rounded-lg" src='/src/assets/media/sumgayit.jpeg' alt="slide" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}
