import React from "react";
import { useEffect } from "react";
// import LeftBarNoAvatar from "./LeftBarNoAvatar";
import { NavLink, useNavigate } from "react-router-dom";
const InitialHomePage = ({ user, setUser }) => {
  const navigate = useNavigate();
  const handleViewDemo = () => {
    setUser("demo");
    // Replace, so no “welcome” remains in history :contentReference[oaicite:4]{index=4}
    navigate("/demoHomePage", { replace: true });
  };

  return (
    <div className="">
      <div className="h-[100vh] flex justify-center items-center pt-10 lg:pt-0">
        <div
          className=" mx-auto max-w-md bg-[#7c5dfa] dark:bg-[#7057d4]
                rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
        >
          {/* Logo Area */}
          <div className="h-32 flex items-center justify-center">
            <div
              className="w-28 h-28 bg-[url('./assets/logo3d.png')]  bg-contain bg-center
                 transition-all duration-150 hover:scale-95"
            />
            <div className="mx-1"></div>
            <h2 className="text-center text-2xl text-[#ffffff] dark:text-white mb-2">
              <div className="font-light">Welcome to</div>
              <div className="text-5xl font-bold">InvoiceApp</div>
            </h2>
          </div>

          {/* Content Area */}
          <div className="px-8 py-6 bg-white dark:bg-gray-800">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Manage your invoices effortlessly—try our demo, or sign up to
              personalize your dashboard and keep your invoices safe!
            </p>

            <div className="flex space-x-4">
              <div
                onClick={handleViewDemo}
                className="cursor-pointer flex-1 px-4 py-2 bg-[#7c5dfa] hover:bg-[#9277ff]
                   text-white font-semibold rounded-lg shadow-md
                   focus:ring-2 focus:ring-offset-1 focus:ring-[#7c5dfa]/50 text-center"
              >
                View Demo
              </div>
              <NavLink
                to="/auth"
                className="cursor-pointer flex-1 px-4 py-2 bg-transparent border-2 border-[#7c5dfa]
                   hover:bg-[#7c5dfa] hover:text-white text-[#7c5dfa]
                   font-semibold rounded-lg shadow-sm
                   focus:ring-2 focus:ring-offset-1 focus:ring-[#7c5dfa]/50 text-center"
              >
                Login / Signup
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialHomePage;
