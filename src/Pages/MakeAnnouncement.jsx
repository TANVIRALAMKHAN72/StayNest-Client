import React from "react";
import { useForm } from "react-hook-form";
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from "react-toastify";
import { FaBullhorn } from "react-icons/fa";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const MakeAnnouncement = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/api/announcements", data);
      if (res.data.insertedId) {
        toast.success("Announcement created successfully!");
        reset();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create announcement."
      );
      console.error("Error creating announcement:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Make New Announcement
      </h2>

      <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label dark:text-black">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              placeholder="Enter announcement title"
              className="input input-bordered w-full"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="label dark:text-black">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Enter announcement description"
              className="textarea textarea-bordered w-full h-32"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-primary w-full flex items-center justify-center gap-2"
            >
              <FaBullhorn /> Publish Announcement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeAnnouncement;
