import { API_URL } from "../utils/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

// Define the types for country details
interface CountryDetailsType {
  name: {
    common: string;
    nativeName?: {
      [key: string]: {
        common: string;
      };
    };
  };
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  flags: {
    svg: string;
  };
  tld: string[];
  languages: {
    [key: string]: string;
  };
  currencies: {
    [key: string]: {
      name: string;
    };
  };
  borders: string[];
}

const CountryDetails = () => {
  const [countryDetails, setCountryDetails] =
    useState<CountryDetailsType | null>(null);
  const [borderCountries, setBorderCountries] = useState<string[]>([]);

  const { country: countryName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get(`${API_URL}/name/${countryName}`);
        setCountryDetails(response.data[0]);
        localStorage.setItem("country-data", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    if (!countryDetails) {
      fetchCountryData();
    }
  }, [countryDetails]);

  useEffect(() => {
    const fetchBorderCountries = async () => {
      if (countryDetails?.borders) {
        try {
          const borderRequests = countryDetails.borders.map((border) =>
            axios.get(`${API_URL}/alpha/${border}`)
          );
          const borderResponses = await Promise.all(borderRequests);
          const borderNames = borderResponses.map(
            (response) => response.data[0]?.name?.common
          );
          setBorderCountries(borderNames);
          localStorage.setItem("border-countries", JSON.stringify(borderNames));
        } catch (error) {
          console.error("Error fetching border countries:", error);
        }
      }
    };

    if (countryDetails?.borders) {
      fetchBorderCountries();
    }
  }, [countryDetails]);

  const data = {
    name: countryDetails?.name?.common || "",
    nativeName: countryDetails?.name?.nativeName
      ? Object.values(countryDetails.name.nativeName)[0]?.common
      : "",
    population: countryDetails?.population,
    region: countryDetails?.region,
    subregion: countryDetails?.subregion,
    capital: countryDetails?.capital,
    flag: countryDetails?.flags?.svg,
    tld: countryDetails?.tld?.join(", "),
    languages: countryDetails?.languages
      ? Object.values(countryDetails.languages).join(", ")
      : "",
    currencies: countryDetails?.currencies
      ? Object.values(countryDetails.currencies)
          .map((currency) => currency.name)
          .join(", ")
      : "",
    borders: borderCountries,
  };

  return (
    <div className="px-4 py-10 h-full sm:px-10 sm:py-15 md:px-20 md:py-20 font-nunito text-[#111517] dark:bg-[#1e2933] dark:text-white transition-all duration-700">
      <div className="px-2 lg:px-0">
        <button
          onClick={() => navigate("/")}
          className="flex items-center px-8 py-2 rounded-md shadow-[0px_0px_7px_0px_#0000004B] hover:scale-105"
        >
          <IoIosArrowRoundBack className="h-8 w-8 dark:text-white" />
          <span className="font-light text-base px-2 ">Back</span>
        </button>
      </div>
      <div className="pt-16 lg:pt-20">
        <div className="grid grid-cols-1 gap-10 mx-auto lg:grid-cols-2 lg:gap-[120px]">
          <div className="mx-auto max-w-md lg:max-w-xl max-h-[400px] px-2 lg:px-0">
            <img
              className="rounded-xl w-full h-full object-cover"
              src={countryDetails?.flags?.svg}
              alt={`${countryDetails?.name?.common} flag`}
            />
          </div>
          <div className="py-10">
            <div>
              <h2 className="font-extrabold text-3xl">
                {countryDetails?.name?.common}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 py-5 md:py-[30px]">
              <div className="mb-8">
                <p className="font-medium text-base py-2">
                  Native Name:
                  <span className="font-light pl-1">
                    {data?.nativeName || data?.name}
                  </span>
                </p>
                <p className="font-medium text-base py-2">
                  Population:
                  <span className="font-light pl-1">
                    {data?.population?.toLocaleString("en-US")}
                  </span>
                </p>
                <p className="font-medium text-base py-2">
                  Region: <span className="font-light pl-1">{data.region}</span>
                </p>
                <p className="font-medium text-base py-2">
                  Sub Region:
                  <span className="font-light pl-1">{data.subregion}</span>
                </p>
                <p className="font-medium text-base py-2">
                  Capital:
                  <span className="font-light pl-1">
                    {data.capital?.join(", ")}
                  </span>
                </p>
              </div>
              <div>
                <p className="font-medium text-base py-2">
                  Top Level Domain:
                  <span className="font-light pl-1">{data.tld}</span>
                </p>
                <p className="font-medium text-base py-2">
                  Currencies:
                  <span className="font-light pl-1">{data.currencies}</span>
                </p>
                <p className="font-medium text-base py-2">
                  Languages:
                  <span className="font-light pl-1">{data.languages}</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center">
              <div>
                <span className="font-medium text-base">Border Countries:</span>
              </div>
              <div className="py-2">
                {data.borders.map((border, index) => (
                  <button
                    key={index}
                    className="py-1 px-8 mb-3 font-extralight shadow-[0_0px_7px_2px_rgba(0,0,0,0.1)] rounded md:mx-2 dark:bg-[#2B3844]"
                  >
                    {border}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
