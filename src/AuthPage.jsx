// src/components/AuthPage.jsx
import React, { useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiEye, mdiEyeOff } from "@mdi/js";
import "./home.css";

export default function AuthPage({ setUser }) {
  const { signup, login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // LOADING STATE
  const [isSubmitting, setIsSubmitting] = useState(false);

  // helper to map Firebase error codes to your messages
  function getFriendlyError(code) {
    if (isLogin) {
      // login errors
      return "Incorrect email or password";
    } else {
      // signup errors
      if (code === "auth/email-already-in-use") {
        return "The email is already registered";
      }
      // optionally handle weak-password, invalid-email, etc.
      return "Failed to create account. Enter a valid email and a 6 letter password.";
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const credential = isLogin
        ? await login(email, pw)
        : await signup(email, pw);
      setUser(credential.user.email);
      navigate("/userHomePage", { replace: true });
    } catch (err) {
      // map to friendly message
      const friendly = getFriendlyError(err.code);
      setError(friendly);
      setIsSubmitting(false);
    }
  };

  if (isSubmitting)
    return (
      <div className="pt-20 mx-5 md:mx-20 lg:ml-65 lg:mr-40 xl:ml-67 xl:mr-42">
        <div className="my-8 md:my-4 card rounded-xl w-full bg-white dark:bg-[#1e2139] card-xs shadow-sm h-30 skeleton"></div>
        <div className="my-8 md:my-4 card rounded-xl w-full bg-white dark:bg-[#1e2139] card-xs shadow-sm h-30 skeleton"></div>
        <div className="my-8 md:my-4 card rounded-xl w-full bg-white dark:bg-[#1e2139] card-xs shadow-sm h-30 skeleton"></div>
      </div>
    );

  return (
    <div className="">
      <div className="h-[100vh] flex justify-center items-center pt-10 lg:pt-0">
        <div
          className="mx-auto max-w-md bg-[#7c5dfa] dark:bg-[#7057d4]
                rounded-2xl w-200 shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
        >
          {/* Logo Area */}
          <div className="h-32 flex items-center justify-center">
            <div
              className="w-28 h-28 bg-[url('./assets/logo3d.png')] bg-no-repeat  bg-contain bg-center
                 transition-all duration-150 hover:scale-95"
            />
            <div className="mx-1"></div>
            <div className="flex flex-col mr-4">
              <h2 className="text-center text-2xl text-[#ffffff] dark:text-white">
                <div className="text-3xl font-bold text-center my-0">
                  {isLogin ? "Welcome Back!" : "Create Account"}
                </div>
              </h2>
              <div className="text-center text-white">
                {isLogin
                  ? "Enter your details for Log in."
                  : "Enter your details to Sign up."}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="px-8 py-6 bg-white dark:bg-gray-800">
            <form onSubmit={handleSubmit} className="space-y-4 mb-0">
              {/* Email */}
              <label className="floating-label">
                <span className="bg-black">Your Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your Email"
                  className="input input-md w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-transparent  pr-10
                 font-semibold border-[1px] border-[#a3a8c2] h-12 dark:bg-[#1e2139] dark:shadow-none text-gray-700 dark:text-gray-300 focus:outline-0"
                />
              </label>

              {/* Password */}
              <div className="relative">
                <label className="floating-label">
                  <span>Your Password</span>
                  <input
                    type={showPw ? "text" : "password"}
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    required
                    placeholder="Enter your Password"
                    className="input input-md w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-transparent  pr-10
                 font-semibold border-[1px] border-[#a3a8c2] h-12 dark:bg-[#1e2139] dark:shadow-none text-gray-700 dark:text-gray-300 focus:outline-0"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute inset-y-0 right-3 flex items-end cursor-pointer text-gray-500 bottom-3"
                  tabIndex={-1}
                >
                  {showPw ? (
                    <Icon path={mdiEyeOff} size={1} />
                  ) : (
                    <Icon path={mdiEye} size={1} />
                  )}
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-600 text-sm mt-3">{error}</div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="cursor-pointer btn w-full bg-[#7c5dfa] text-white py-2 rounded-lg text-lg hover:bg-[#7057d4] transition border-0 drop-shadow-none shadow-none"
              >
                {isLogin ? "Log in" : "Sign up"}
              </button>
            </form>

            {/* Toggle Login / Sign Up */}
            <p className="text-center text-sm text-gray-600 dark:text-white">
              {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => {
                  setIsLogin((l) => !l);
                  setError("");
                }}
                className="text-indigo-600 font-medium hover:underline cursor-pointer mt-3"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
