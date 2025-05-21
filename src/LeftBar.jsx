import React, { useState, useEffect } from "react";
import "./home.css";
import avatar from "./assets/image-avatar.jpg";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { use } from "react";
import { useAuth } from "./contexts/AuthContext";
const LeftBar = ({ user, setUser }) => {
  const { currentUser, logout } = useAuth();

  const userInitials = currentUser.email[0].toUpperCase();

  // 1. Initialize theme from localStorage or OS preference
  const getInitialTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved; //not null
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // 2. Apply theme class to <html> and persist in localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 3. Toggle between light and dark
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = () => {
    // 1. Perform logout & clear user
    // logout;
    // setUser(null);

    // 2. Decide where to send the user
    // If they’re anywhere under /userHomePage, go to /userHomePage
    if (location.pathname.startsWith("/userHomePage")) {
      navigate("/userHomePage", { replace: true });
    } else if (location.pathname.startsWith("/demoHomePage")) {
      // Otherwise go to the public root
      navigate("/demoHomePage", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  const handleLogout = () => {
    setUser(null);
    logout;
    // navigate("/", { replace: true });
    // 1) Replace current history entry with "/"
    window.location.replace("/");
  };

  return (
    // <div className="z-2 left bg-[#373b53] w-25 rounded-r-3xl absolute flex flex-col justify-between">
    <div className="z-2 bg-[#373b53] w-full lg:w-25 lg:rounded-r-3xl flex flex-row lg:flex-col justify-between h-18 lg:h-full fixed">
      <div
        className="tooltip tooltip-bottom lg:tooltip-right"
        data-tip="Homepage"
      >
        <div
          onClick={handleClick}
          className="flex topLogo w-20 lg:w-full h-full lg:h-25
                 bg-[#7c5dfa] rounded-r-3xl
                 bg-[url('./assets/logo.svg')] bg-no-repeat bg-center
                 bg-[length:40px_38px] hover:bg-[length:44px_42px]
                 transform-view duration-130 cursor-pointer"
        />
      </div>

      <div className="bottom lg:mb-4 flex lg:flex-col items-center mx-6 lg:mx-0">
        <div className="mod mr-1 text-[#858bb2] text-center">
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />

            {/* sun icon */}
            <svg
              className="swap-on h-8 w-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-off h-8 w-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>

        {user === null ? (
          <div></div>
        ) : (
          <div className="hidden lg:flex w-full flex-col my-2">
            <div className="divider bg-[#858bb2] h-[1px] opacity-[0.3]"></div>
          </div>
        )}

        {user !== null ? (
          <div className="h-full w-[1px] bg-[#858bb2] opacity-[0.3] flex lg:hidden mx-6"></div>
        ) : (
          <div></div>
        )}

        {user === null ? (
          <div></div>
        ) : user === "demo" ? (
          <div className="dropdown dropdown-left lg:dropdown-right ">
            <div tabIndex={0}>
              <div className="w-15 lg:w-full flex mr-1 justify-center">
                <img
                  className="img rounded-full size-12 hover:outline-3 outline-[#7c5dfa] transition-all duration-150"
                  src={avatar}
                  alt="AVATAR"
                />
              </div>
            </div>
            <div
              onClick={() => handleLogout()}
              tabIndex={0}
              className="dropdown-content menu bg-[#7c5dfa] text-white dark:text-black dark:bg-base-100 rounded-box z-1 w-22 p-2 shadow-sm text-center cursor-pointer hover:text-blue-200 hover:underline
              dark:hover:text-[#7c5dfa]"
            >
              Log Out
            </div>
          </div>
        ) : (
          <div className="dropdown dropdown-bottom lg:dropdown-right">
            <div tabIndex={0}>
              <div className="w-15 lg:w-full flex mr-1 justify-center">
                <div
                  className="text-white rounded-full py-3 px-5 bg-[#320fba] cursor-pointer
                hover:outline-3 outline-[#7c5dfa] transition-all duration-150"
                >
                  {userInitials}
                </div>
              </div>
            </div>
            <div
              onClick={() => handleLogout()}
              tabIndex={0}
              className="dropdown-content menu bg-[#7c5dfa] text-white dark:text-black dark:bg-base-100 rounded-box z-1 w-22 p-2 shadow-sm text-center cursor-pointer hover:text-blue-200 hover:underline
              dark:hover:text-[#7c5dfa]"
            >
              Log Out
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftBar;
