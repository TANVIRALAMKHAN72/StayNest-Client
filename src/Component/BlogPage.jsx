import React from "react";

const blogPosts = [
  {
    id: 1,
    title: "StayNest: A New Era of Modern Apartment Rentals",
    date: "2025-08-01",
    summary:
      "StayNest is a smart platform that makes apartment rental experiences easier, faster, and more secure.",
  },
  {
    id: 2,
    title: "Why Choose StayNest for Your Next Rental?",
    date: "2025-07-28",
    summary:
      "StayNest is not just an app, it’s a community that connects renters and landlords for a safer rental experience.",
  },
  {
    id: 3,
    title: "How Online Agreements and Payments Work in StayNest",
    date: "2025-07-20",
    summary:
      "Now agreements and payments are fully online. Make deals and send payments with just a click.",
  },
  {
    id: 4,
    title: "How to Find Hassle-Free Apartments with StayNest",
    date: "2025-07-15",
    summary:
      "With StayNest, finding a home becomes easy, stress-free, and time-saving.",
  },
  {
    id: 5,
    title: "StayNest Security System: How Safe Are You?",
    date: "2025-07-10",
    summary:
      "StayNest uses advanced technology to ensure the security of user data and financial transactions.",
  },
];

const BlogPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
        StayNest Blog
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map(({ id, title, date, summary }) => (
          <div
            key={id}
            className="bg-[#FFF0DC] border border-gray-200 rounded-2xl p-6 shadow hover:shadow-lg transition duration-300"
          >
            <h2 className="text-xl font-semibold text-blue-600 mb-2">{title}</h2>
            <p className="text-sm text-gray-500 mb-3">
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-gray-700 mb-4">{summary}</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
