import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Lottie from "lottie-react";
import lottieAnimation from "../../public/Register.json";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
  const { signInUser, signInGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    signInUser(email, password)
      .then(() => {
        toast.success("Login successful!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error("Login failed: " + error.message);
      });
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInGoogle();
      const user = result.user;

      const backendUrl = "http://localhost:3000/users";

      const savedUser = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "user",
      };

      await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(savedUser),
      });

      toast.success("Google login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Google login failed: " + error.message);
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row justify-center items-center min-h-screen bg-base-200 px-4">
      <div className="w-full max-w-md p-8 shadow-md bg-white rounded-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full"
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                validate: {
                  hasUpper: (value) =>
                    /[A-Z]/.test(value) || "Must contain an uppercase letter",
                  hasLower: (value) =>
                    /[a-z]/.test(value) || "Must contain a lowercase letter",
                },
              })}
              className="input input-bordered w-full"
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className="text-red-500">
                {errors.password.message ||
                  "Password must be at least 6 characters"}
              </span>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>

          <div className="text-center">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </form>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full flex items-center justify-center gap-2"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>
      </div>

      <div className="max-w-md w-full lg:ml-10 mb-10 lg:mb-0">
        <Lottie animationData={lottieAnimation} loop={true} />
      </div>
    </div>
  );
};

export default Login;
