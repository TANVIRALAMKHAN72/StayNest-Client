import React, { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import { BiGift } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Fade, Slide } from "react-awesome-reveal";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const Coupon = () => {
  const [copiedCode, setCopiedCode] = useState("");
  const axiosSecure = useAxiosSecure();

  const {
    data: coupons = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/coupons");
      return res.data;
    },
  });

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 transition-colors duration-500 flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 px-4 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 transition-colors duration-500 flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg">
          Error loading coupons: {error.message}
        </p>
      </section>
    );
  }

  return (
    <section id="coupons" className="py-16 px-4 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 transition-colors duration-500">
      <div className="max-w-5xl mx-auto text-center">
        <Slide direction="up" triggerOnce>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 flex items-center justify-center gap-2">
            <MdDiscount className="text-indigo-500 text-4xl" /> Exclusive
            Coupons
          </h2>
          <p className="text-gray-600 mb-10 text-lg">
            Grab the best deals for your next stay!
          </p>
        </Slide>
        {coupons.length === 0 ? (
          <p className="text-gray-700 text-xl mt-8">
            No coupons available at the moment. Check back later!
          </p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
          >
            {coupons.map((coupon, index) => (
              <SwiperSlide key={coupon._id || index}>
                <Fade triggerOnce direction="up" cascade damping={0.3}>
                  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
                    <div className="text-indigo-600 text-xl font-semibold mb-2 flex items-center gap-2">
                      <BiGift className="text-2xl" />
                      {coupon.discountPercentage
                        ? `${coupon.discountPercentage}% OFF`
                        : "Discount"}
                    </div>

                    <p className="text-gray-700 mb-3">
                      {coupon.couponDescription || "No description provided."}
                    </p>

                    <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md">
                      <span className="font-mono text-sm text-gray-800">
                        {coupon.couponCode}
                      </span>
                      <button
                        onClick={() => handleCopy(coupon.couponCode)}
                        className="text-gray-600 hover:text-indigo-600"
                        title="Copy to clipboard"
                      >
                        <FaRegCopy />
                      </button>
                    </div>
                    {copiedCode === coupon.couponCode && (
                      <div className="text-green-600 mt-2 text-sm">Copied!</div>
                    )}
                    {coupon.available !== undefined && (
                      <p
                        className={`text-sm mt-1 ${
                          coupon.available ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        Status:{" "}
                        {coupon.available ? "Available" : "Used/Unavailable"}
                      </p>
                    )}
                  </div>
                </Fade>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Coupon;
