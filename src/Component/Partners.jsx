import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Fade } from "react-awesome-reveal";

const partners = [
  { name: "Bank of America", logo: "https://i.ibb.co/2nK9s7V/bank-of-america.png" },
  { name: "Visa", logo: "https://i.ibb.co/F6TqFv1/visa.png" },
  { name: "Mastercard", logo: "https://i.ibb.co/0J8nS3p/mastercard.png" },
  { name: "Paypal", logo: "https://i.ibb.co/7r45kGm/paypal.png" },
  { name: "HSBC", logo: "https://i.ibb.co/YL0r4X5/hsbc.png" },
  { name: "Stripe", logo: "https://i.ibb.co/hKc4qV9/stripe.png" },
];

const Partners = () => {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto text-center px-4">
        <Fade direction="up" triggerOnce>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Our Trusted Partners
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-12 text-lg">
            We collaborate with top banks and payment services to provide you safe and secure transactions.
          </p>
        </Fade>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
        >
          {partners.map((partner, index) => (
            <SwiperSlide key={index} className="flex justify-center items-center">
              <div className="p-4 bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 duration-300">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-16 object-contain grayscale hover:grayscale-0 transition duration-300"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Partners;
