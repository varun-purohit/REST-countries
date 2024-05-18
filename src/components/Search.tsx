import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { API_URL } from "../utils/data";
import { searchCountry } from "../store/slice/countrySlice";
import { useDispatch } from "react-redux";
import Error from "./Error";

const Search = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState<string>("");
  const debounce = useRef<number | null>(null);

  useEffect(() => {
    const searchData = async (name: string) => {
      try {
        const response = await axios.get(`${API_URL}/name/${name}`);
        const data = await response.data;
        dispatch(searchCountry(data));
      } catch (error) {
        <Error />;
      }
    };

    if (searchValue) {
      if (debounce.current) {
        clearTimeout(debounce.current);
      }

      debounce.current = window.setTimeout(() => {
        searchData(searchValue);
      }, 500); // 500ms debounce time
    }

    return () => {
      if (debounce.current) {
        clearTimeout(debounce.current);
      }
    };
  }, [searchValue, dispatch]);

  return (
    <>
      <form className="md:max-w-[320px] lg:max-w-[480px] w-full shadow-[0_2px_9px_0px_rgba(0,0,0,0.2)] transition-all duration-700  ">
        <div className="relative  ">
          <div className="absolute  transition-colors duration-700 rounded inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
            <svg
              className="w-4 h-4 text-[#848484] dark:text-white dark:bg-[#202C36]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
            className="block w-full p-4 ps-10 text-sm transition-colors duration-700 font-nunito text-gray-800 placeholder-[#848484]  focus:ring-blue-500 focus:border-blue-500 dark:dark:bg-[#202C36] dark:text-white dark:placeholder-white "
            placeholder="Search for a country..."
            required
          />
        </div>
      </form>
    </>
  );
};

export default Search;
