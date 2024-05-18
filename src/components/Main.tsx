import { useState } from "react";
import CountryCard from "./CountryCard";
import { RootState } from "../store/appStore";
import { useSelector } from "react-redux";

interface countryProps {
  name: {
    common: string;
    official: string;
  };
  key: string;
  flags: {
    svg: string;
  };
  population: number;
  region: string;
  capital: string;
  data: [];
}

const Main = () => {
  const countrySelector = useSelector(
    (store: RootState) => store?.country?.allCountries
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(countrySelector.length / itemsPerPage);

  if (!countrySelector) {
    return <div>No countries found</div>;
  }

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;

  const selectedCountries = countrySelector.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 10;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={` scale-75 sm:scale-100 px-2 sm:px-4 py-2 mx-1 rounded ${
              currentPage === i
                ? "bg-blue-700 text-white"
                : "bg-gray-200 text-gray-700 dark:dark:bg-[#2B3844] dark:text-white"
            } hover:bg-blue-500`}
          >
            {i}
          </button>
        );
      }
    } else {
      const firstPages = [1, 2, 3];
      const lastPages = [totalPages - 2, totalPages - 1, totalPages];
      const middlePages = [
        currentPage - 1,
        currentPage,
        currentPage + 1,
      ].filter((page) => page > 3 && page < totalPages - 2);

      const pagesSet = new Set([...firstPages, ...middlePages, ...lastPages]);

      let lastPage = 0;
      for (let page of pagesSet) {
        if (page - lastPage > 1) {
          pageNumbers.push(
            <span
              key={`ellipsis-${page}`}
              className="px-4 py-2 mx-1 dark:text-white"
            >
              ...
            </span>
          );
        }
        pageNumbers.push(
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`scale-75 sm:scale-100 px-2 sm:px-4 py-2 mx-1 rounded ${
              currentPage === page
                ? "bg-blue-700 text-white"
                : "bg-gray-200 text-gray-700 dark:dark:bg-[#2B3844] dark:text-white"
            } hover:bg-blue-500`}
          >
            {page}
          </button>
        );
        lastPage = page;
      }
    }
    return pageNumbers;
  };

  return (
    <div className="pt-8 px-10 md:pt-12 md:px-0">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-14  lg:grid-cols-3 lg:gap-[76px] xl:grid-cols-4 transiton-all duration-700">
        {selectedCountries.map((country: countryProps) => {
          const { name, flags, population, region, capital } = country;
          return (
            <CountryCard
              key={name?.official}
              name={name?.common}
              flag={flags?.svg}
              population={population}
              region={region}
              capital={capital?.[0]}
              data={country}
            />
          );
        })}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className=" scale-75 sm:scale-100 px-2 sm:px-4 py-2 mx-1 text-[#111517] bg-white shadow-[0_0px_7px_2px_rgba(0,0,0,0.2)] rounded hover:bg-slate-100 disabled:bg-gray-400  disabled:cursor-not-allowed  dark:dark:bg-[#2B3844] dark:text-white "
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="scale-75 sm:scale-100 px-2 sm:px-4 py-2 mx-1 text-[#111517] bg-white shadow-[0_0px_7px_2px_rgba(0,0,0,0.2)]  rounded hover:bg-slate-100 disabled:bg-gray-400 disabled:cursor-not-allowed dark:dark:bg-[#2B3844] dark:text-white "
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Main;
