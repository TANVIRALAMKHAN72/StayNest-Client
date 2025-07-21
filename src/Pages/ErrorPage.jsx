import React from 'react';
import { Link } from 'react-router';
import Lottie from 'lottie-react';
import errorLottie from '../../public/Lonely 404.json';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 text-center px-4">
      {/* Centered Lottie Animation */}
      <div className="w-64 h-64">
        <Lottie animationData={errorLottie} loop={true} />
      </div>

      {/* Text Content without the big 404 */}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-white mb-2">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-500 dark:text-gray-300 mb-6 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link to="/">
        <button className="btn btn-primary px-6">
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
