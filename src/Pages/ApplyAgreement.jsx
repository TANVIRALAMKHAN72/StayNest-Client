import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router'; 
import useAuth from '../Hooks/useAuth';
import axios from 'axios';
import { toast } from 'react-toastify';

const ApplyAgreement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();

  const apartment = location.state?.apartment;

  if (!apartment) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-center text-red-500">No apartment selected.</p>
      </div>
    );
  }

  const handleAgreementSubmit = async () => {
    console.log("Apartment rent before sending:", apartment.rent);
    const agreementData = {
      userName: user?.displayName,
      userEmail: user?.email,
      floorNo: apartment.floorNo,
      blockName: apartment.blockName,
      apartmentNo: apartment.apartmentNo,
      rent: parseFloat(apartment.rent),
      status: 'pending',
    };

    try {
      const res = await axios.post('https://staynest-server.vercel.app/api/agreements', agreementData);
      if (res.data.insertedId) {
         toast.success('Agreement request sent successfully!');
        navigate('/');
      }
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Something went wrong while submitting agreement.');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full mx-4 overflow-hidden relative">
        
        <img
          src={apartment.image} 
          alt="Apartment"
          className="w-full h-64 object-cover"
        />

        
        <div className="p-6 ">
          <h2 className="text-2xl font-bold mb-3 text-center dark:text-black">Confirm Agreement</h2>
          <div className="space-y-1  dark:text-black">
            <p><strong>Name:</strong> {user?.displayName}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Block:</strong> {apartment.blockName}</p>
            <p><strong>Apartment No:</strong> {apartment.apartmentNo}</p>
            <p><strong>Floor No:</strong> {apartment.floorNo}</p>
            <p><strong>Rent:</strong> {apartment.rent} TK</p>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
              onClick={() => navigate(-1)} 
            >
              Cancel
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
              onClick={handleAgreementSubmit}
            >
              Confirm Agreement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyAgreement;
