import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import useAuth from "../Hooks/useAuth";
import lottie from "../../public/Register.json";
import Lottie from "lottie-react";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const { createUser, signInGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password, photoURL } = data;

    if (!/(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password)) {
      toast.error(
        "Password must be at least 6 characters with both uppercase and lowercase letters"
      );
      return;
    }

    try {
      const result = await createUser(email, password);
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL,
      });

      const savedUser = {
        name,
        email,
        photoURL,
        role: "user",
      };

      await fetch("https://staynest-server.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(savedUser),
      });

      toast.success("Registration successful!");
      reset();

      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1500);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInGoogle();
      const user = result.user;

      const savedUser = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "user",
      };

      await fetch("https://staynest-server.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(savedUser),
      });

      toast.success("Google Sign-In successful!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Google Sign-In failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-base-100 px-4 py-8">
      <div className="w-full lg:w-1/2">
        <Lottie animationData={lottie} loop={true} />
      </div>

      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Enter your name"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">Name is required</p>
            )}
          </div>

          <div>
            <label className="label">Photo URL</label>
            <input
              type="text"
              {...register("photoURL", { required: true })}
              placeholder="Enter photo URL"
              className="input input-bordered w-full"
            />
            {errors.photoURL && (
              <p className="text-red-500 text-sm">Photo URL is required</p>
            )}
          </div>

          <div>
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}
          </div>

          <div>
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Enter password"
              className="input input-bordered w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">Password is required</p>
            )}
          </div>

          <div>
            <button type="submit" className="btn btn-primary w-full">
              Register
            </button>
          </div>
        </form>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogleRegister}
          className="btn btn-outline w-full flex items-center justify-center gap-2"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
