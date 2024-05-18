import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL, regions } from "../utils/data";
import { useDispatch } from "react-redux";
import { filterCountry, setCountry } from "../store/slice/countrySlice";
// import { useFilterCountryData } from "../hooks/filterCountryData";

const Filter = () => {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [region, setRegion] = useState<string>("");

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setShowDropdown(false);
    const target = event.target as HTMLButtonElement;
    const regionName = target.textContent || "";
    setRegion(regionName);
  }

  const fetchData = async (region: string) => {
    if (region === "All Regions") {
      const response = await axios.get(`${API_URL}/all`);
      const data = await response.data;
      dispatch(setCountry(data));
    } else {
      const response = await axios.get(`${API_URL}/region/${region}`);
      const data = await response.data;
      dispatch(filterCountry(data));
    }
  };

  useEffect(() => {
    fetchData(region);
  }, [region]);

  return (
    <div className="">
      <div className="relative inline-block text-left   ">
        <div>
          <button
            type="button"
            className="flex w-52 font-nunito justify-between transition-colors duration-700 rounded bg-white px-6 py-4 text-sm text-gray-900 shadow-[0_2px_9px_0px_rgba(0,0,0,0.2)] hover:bg-gray-100 dark:bg-[#2B3844] dark:text-white"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Filter by region
            <svg
              className="-mr-1 h-5 w-5 text-gray-400 dark:text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div
          className={`absolute right-0 z-10 mt-2 w-52 origin-top-right rounded bg-white shadow-[0_2px_9px_0px_rgba(0,0,0,0.2)] focus:outline-none dark:bg-[#2B3844] transition-all duration-500 transform ${
            showDropdown
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4"
          }`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {regions.map((region, index) => (
              <button
                key={index}
                className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-slate-100 dark:hover:bg-slate-600 dark:bg-[#2B3844] dark:text-white"
                onClick={handleClick}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
