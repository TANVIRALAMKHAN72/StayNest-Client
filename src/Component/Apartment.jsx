import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import { Slide } from "react-awesome-reveal";

const Apartment = () => {
  const [apartments, setApartments] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const limit = 6;

  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

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

  const fetchApartments = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/apartments", {
        params: {
          page,
          minRent: minRent || 0,
          maxRent: maxRent || 1000000,
        },
      });
      setApartments(res.data.apartments);
      setTotal(res.data.total);
    } catch (error) {
      console.error("Error fetching apartments:", error);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, [page, minRent, maxRent]);

  const handleSearch = () => {
    setPage(1);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="w-11/12 mx-auto p-4">
      <Slide direction="up" triggerOnce>
        <h1 className="text-4xl font-bold my-8 text-center">
          Apartment Listings
        </h1>
      </Slide>

      <div className="mb-6 flex gap-2 items-center justify-center">
        <input
          type="number"
          placeholder="Min Rent"
          value={minRent}
          onChange={(e) => setMinRent(e.target.value)}
          className="bg-base-300 p-2 rounded"
        />
        <input
          type="number"
          placeholder="Max Rent"
          value={maxRent}
          onChange={(e) => setMaxRent(e.target.value)}
          className="bg-base-300 p-2 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apartments.map((apartment) => (
          <div
            key={apartment.apartmentNo}
            className="bg-base-100 rounded-xl shadow px-2 py-4"
          >
            <img
              src={apartment.image}
              alt={apartment.apartmentNo}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h2 className="font-semibold text-lg">{`Block ${apartment.blockName} - Apt ${apartment.apartmentNo}`}</h2>
            <p>Floor No: {apartment.floorNo}</p>
            <p>Rent: {apartment.rent} TK</p>
            <button
              className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
              onClick={() => handleAgreementClick(apartment)}
            >
              Agreement
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1 border rounded">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Apartment;
