import { IoSunny } from "react-icons/io5";
import darkLogo from "../assets/Path.svg";
import { useEffect, useState } from "react";

const Header = () => {
  const [dark, setDark] = useState(() => {
    const savedMode = localStorage.getItem("dark-mode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("dark-mode", JSON.stringify(dark));
  }, [dark]);

  const handleDarkMode = () => {
    setDark((prevDark: boolean) => !prevDark);
  };

  return (
    <nav className="bg-white shadow-md font-nunito transition-colors duration-700 dark:bg-[#2B3844]">
      <div className=" px-4 sm:px-10 md:px-20 py-6 mx-auto flex justify-between sm:py-6">
        <h2 className="font-bold font-nunito text-sm sm:text-lg  md:text-xl lg:text-2xl text-[#111917] dark:text-white transition-all duration-700">
          Where in the world?
        </h2>
        <div
          onClick={handleDarkMode}
          className="flex items-center gap-x-2 text-[#111917] hover:cursor-pointer transition-transform duration-300"
        >
          <div
            className={`transform transition-transform duration-700 ${
              dark ? "rotate-180" : "rotate-0"
            }`}
          >
            {dark ? (
              <IoSunny className="dark:text-white w-5 h-5 transition duration-700" />
            ) : (
              <img
                className="w-5 h-5 transition duration-700"
                src={darkLogo}
                alt="Moon Icon"
              />
            )}
          </div>
          <h3 className="font-normal text-base text-[#111917] dark:text-white transition-all duration-700">
            {dark ? "Light Mode" : "Dark Mode"}
          </h3>
        </div>
      </div>
    </nav>
  );
};

export default Header;
