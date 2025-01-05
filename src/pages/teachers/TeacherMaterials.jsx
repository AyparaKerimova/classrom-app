import React, { useState, useEffect } from 'react';
import { useGetMaterialsQuery, useAddLikesMutation } from '../../features/api';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const TeacherMaterials = () => {
  const { data, error, isLoading } = useGetMaterialsQuery();
  const [likedMaterials, setLikedMaterials] = useState([]);
  const [addLikes] = useAddLikesMutation(); 

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem('likedMaterials')) || [];
    setLikedMaterials(storedLikes);
  }, []);

  const handleLikeToggle = (materialId) => {
    const user = JSON.parse(localStorage.getItem('user')); 
    if (!user || !user.id) {
      alert('Zəhmət olmasa giriş edin.');
      return;
    }

    const updatedLikes = likedMaterials.includes(materialId)
      ? likedMaterials.filter((id) => id !== materialId)
      : [...likedMaterials, materialId];

    setLikedMaterials(updatedLikes);
    localStorage.setItem('likedMaterials', JSON.stringify(updatedLikes));

    const updatedMaterial = data.find((material) => material.id === materialId);
    if (updatedMaterial) {
      const updatedLikesArray = updatedLikes.includes(materialId)
        ? [...updatedMaterial.likes, user.id] 
        : updatedMaterial.likes.filter((userId) => userId !== user.id);

      addLikes({ materialId, likes: updatedLikesArray });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading materials!</div>;
  }

  return (
    <>
    <Helmet>
        <title>Materials</title>
    </Helmet>
    <div className="relative w-full flex flex-wrap min-h-screen bg-gray-50 py-6 sm:py-12">
      {data && data.map((material) => (
        <div key={material.id} style={{ maxHeight: '400px' }} className="group relative  cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-4 sm:max-w-sm sm:rounded-lg sm:px-10 ">
          <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-sky-300 transition-all duration-300 group-hover:scale-[10]"></span>
          <div className="relative z-10 mx-auto max-w-md">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-sky-400 transition-all duration-300 group-hover:bg-sky-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-10 w-10 text-white transition-all">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            </span>
            <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
              <h3 className="text-lg font-semibold">{material.title}</h3>
              <p>{material.description}</p>
              <div className="flex items-center space-x-4">
                <span>Likes: {material.likes.length}</span>
                <span>Comments: {material.comments.length}</span>
                <button onClick={() => handleLikeToggle(material.id)}>
                  {likedMaterials.includes(material.id) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#ff0000" className="h-6 w-6">
                      <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#ff0000" className="h-6 w-6">
                      <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="pt-5 text-base font-semibold leading-7">
            <p>
              <Link
                to={`${material.id}`} 
                className="text-sky-500 transition-all duration-300 group-hover:text-white relative z-10"
              >
                Read the docs &rarr;
              </Link>
            </p>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default TeacherMaterials;