"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

const Slider = () => {
  const stories = [
    "/images/random1.jpg",
    "/images/random2.jpg",
    "/images/random3.jpg",
    "/images/random4.jpg",
    "/images/random5.jpg",
    "/images/random6.jpg",
    "/images/random7.jpg",
    "/images/random8.jpg",
    "/images/random9.jpg",
    "/images/random11.jpg",
    "/images/random12.jpg",
    "/images/random10.jpg",
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null
  );

  function openModal(index: number) {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  
  function goToNextImage(e: React.MouseEvent) {
    e.stopPropagation();  
    if (currentImageIndex !== null && currentImageIndex < stories.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);  
    }
  }
  
  function goToPreviousImage(e: React.MouseEvent) {
    e.stopPropagation();  
    if (currentImageIndex !== null && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1); 
    }
  }

  return (
    <>
      <div className="w-full max-w-2xl mt-[20px]">
        <Swiper slidesPerView={6} spaceBetween={5} className="mySwiper">
          {stories.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative group max-w-sm">
                <Image
                  className="absolute top-[10px] left-[10px] w-[40px] h-[40px] object-cover rounded-full border-2 border-[#0866ff] cursor-pointer"
                  src={image}
                  alt="Profile"
                  width={40}
                  height={40}
                  onClick={() => openModal(index)}
                />
                <Image
                  className="w-full h-[200px] object-cover rounded-[8px] cursor-pointer"
                  src={image}
                  alt="Random Image"
                  width={117}
                  height={200}
                  onClick={() => openModal(index)}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {isModalOpen && currentImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-4 left-4 text-white text-3xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl"
              onClick={goToPreviousImage} 
            >
              &#8592;
            </button>
            <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl"
              onClick={goToNextImage} 
            >
              &#8594;
            </button>
            <Image
              src={stories[currentImageIndex]}
              alt={`Image ${currentImageIndex + 1}`}
              width={800}
              height={600}
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Slider;
