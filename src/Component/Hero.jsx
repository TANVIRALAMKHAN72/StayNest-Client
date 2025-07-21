import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// ✅ Corrected bannerImages structure (array of objects, not nested array)
const bannerImages = [
  {
    img: "https://i.ibb.co/84YM8v2H/Starlit-Jahan-Garden-night2.png",
    title: "Welcome to StayNest",
    desc: "Find your perfect stay at our luxurious apartments.",
  },
  {
    img: "https://i.ibb.co/m546WBHk/hq720.png",
    title: "Elegant Living Spaces",
    desc: "Experience comfort and style at affordable prices.",
  },
  {
    img: "https://i.ibb.co/ZpR806Lh/family-living-dining-modern-apartment-interior-white-earthy-stucco-paint.png",
    title: "Family-Friendly Environment",
    desc: "Make memories in safe and spacious homes.",
  },
];

const Hero = () => {
  return (
    <div className="w-full max-w-[1280px] mx-auto overflow-hidden shadow-lg">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {bannerImages.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <img
                src={item.img}
                alt={`Apartment ${index + 1}`}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0  bg-opacity-40 flex flex-col justify-center items-center text-center px-4">
                <h2 className="text-white text-3xl md:text-5xl font-bold drop-shadow mb-2">
                  {item.title}
                </h2>
                <p className="text-white text-base md:text-lg max-w-2xl drop-shadow">
                  {item.desc}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
