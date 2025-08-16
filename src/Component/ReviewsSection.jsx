import React from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const reviews = [
  {
    name: "Alice Johnson",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    comment: "Amazing apartments! Clean, spacious, and very cozy. Highly recommend!",
  },
  {
    name: "Michael Smith",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.5,
    comment: "Great location and friendly staff. The amenities are top-notch!",
  },
  {
    name: "Sara Williams",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
    comment: "Perfect for families. My kids loved the playground and the pool.",
  },
  {
    name: "David Brown",
    photo: "https://randomuser.me/api/portraits/men/21.jpg",
    rating: 4,
    comment: "Comfortable stay. Would love to come back again next vacation.",
  },
  {
    name: "Emma Davis",
    photo: "https://randomuser.me/api/portraits/women/50.jpg",
    rating: 4.5,
    comment: "Stylish apartments with all facilities. Truly a luxurious experience.",
  },
  {
    name: "James Wilson",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 5,
    comment: "Excellent service and very clean. I felt right at home.",
  },
];

const ReviewsSection = () => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push(<FaStar key={i} className="text-yellow-400" />);
      else if (rating + 0.5 === i) stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      else stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
    return stars;
  };

  return (
    <section className="py-16 px-4 transition-colors duration-500">
      <div className="max-w-6xl mx-auto text-center mb-12">
         <Slide direction="up" triggerOnce>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          What Our Customers Are Saying
        </h2>
         </Slide>
      <Fade delay={300} triggerOnce>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Hear from our happy residents and their experiences
        </p>
      </Fade>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <Fade key={index} direction="up" cascade triggerOnce>
            <div className="bg-white dark:bg-[#2F3645] rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300">
              <img
                src={review.photo}
                alt={review.name}
                className="w-20 h-20 rounded-full mb-4 border-2 border-blue-500"
              />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {review.name}
              </h3>
              <div className="flex items-center justify-center mt-2 mb-3">
                {renderStars(review.rating)}
              </div>
              <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
