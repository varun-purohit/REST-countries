import { useDispatch } from "react-redux";
import { countryDetail } from "../store/slice/countrySlice";
import { useNavigate } from "react-router-dom";

interface CountryCardProps {
  name: string;
  flag: string;
  population: number;
  region: string;
  capital: string;
  data: [];
}

const CountryCard = ({
  name,
  flag,
  population,
  region,
  capital,
  data,
}: CountryCardProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleCountryCard() {
    navigate(`/${name}`);
    dispatch(countryDetail(data));
  }

  return (
    // <Link to={`/${name}`} state={data}>
    <div
      onClick={handleCountryCard}
      className="min-w-[264px] max-w-[264px] rounded-md shadow-[0_0px_7px_2px_rgba(0,0,0,0.2)] hover:cursor-pointer hover:scale-105 transition-all duration-700 dark:bg-[#2B3844] dark:text-white"
    >
      <div className="w-full h-40">
        <img className="w-full h-full object-cover rounded-t-md" src={flag} />
      </div>
      <div className="px-6 pt-6 pb-11 font-nunito">
        <h3 className=" font-extrabold text-lg">{name}</h3>
        <div className="font-semibold text-sm pt-3">
          <p className="">
            Population:{" "}
            <span className="font-light">
              {" "}
              {population.toLocaleString("en-US")}
            </span>
          </p>
          <p>
            Region: <span className="font-light"> {region} </span>
          </p>
          <p>
            Capital:
            <span className="font-light"> {capital}</span>
          </p>
        </div>
      </div>
    </div>
    // </Link>
  );
};

export default CountryCard;
