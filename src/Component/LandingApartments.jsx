import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Slide } from "react-awesome-reveal";
import useAuth from "../Hooks/useAuth"; // <-- import auth

const LandingApartments = () => {
  const [apartments, setApartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth(); // <-- get current user

  useEffect(() => {
    const fetchApartments = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          "https://staynest-server.vercel.app/api/apartments",
          { params: { page: 1, limit: 6 } } // শুধু ৬টি apartment
        );
        setApartments(res.data.apartments || []);
      } catch (err) {
        console.error("Error fetching apartments:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApartments();
  }, []);

  const handleAgreementClick = (apartment) => {
    if (!user) {
      navigate("/login", {
        state: {
          from: `/apply-agreement/${apartment._id}`,
        },
      });
    } else {
      navigate(`/apply-agreement/${apartment._id}`, {
        state: {
          apartment,
        },
      });
    }
  };

  return (
    <section className="w-11/12 mx-auto py-16">
      <Slide direction="up" triggerOnce>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Featured Apartments
        </h2>
      </Slide>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg font-semibold text-gray-600">
              Loading apartments...
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apartments.map((apt) => (
              <div
                key={apt.apartmentNo}
                className="dark:bg-[#2F3645] rounded-xl shadow px-2 py-4"
              >
                <img
                  src={apt.image}
                  alt={apt.apartmentNo}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h3 className="font-semibold text-lg">{`Block ${apt.blockName} - Apt ${apt.apartmentNo}`}</h3>
                <p>Floor No: {apt.floorNo}</p>
                <p>Rent: {apt.rent} TK</p>

                {/* Agreement Button */}
                <button
                  className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
                  onClick={() => handleAgreementClick(apt)}
                >
                  Agreement
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => navigate("/apartment")}
              className="btn bg-gray-300 dark:text-black font-semibold  px-8 py-2"
            >
              See All
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default LandingApartments;
