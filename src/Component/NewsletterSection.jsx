import React, { useState } from "react";
import { Slide } from "react-awesome-reveal";
import { FaEnvelope } from "react-icons/fa";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    // এখানে API call করতে পারেন, এখন শুধু simulate করছি
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 transition-colors duration-500">
      <div className="max-w-3xl mx-auto text-center">
        <Slide direction="up" triggerOnce>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Subscribe to our Newsletter
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
            Get the latest updates and offers directly in your inbox
          </p>
        </Slide>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <div className="relative w-full sm:w-auto flex-1">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#2F3645] dark:text-white"
              required
            />
            <FaEnvelope className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
          </div>
          <button
            type="submit"
            className="btn btn-primary px-6 py-3 w-full sm:w-auto dark:bg-blue-500 dark:text-black hover:scale-105 transition-transform duration-300"
          >
            Subscribe
          </button>
        </form>

        {subscribed && (
          <p className="text-green-600 dark:text-green-400 mt-4 font-medium">
            Thank you for subscribing!
          </p>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
