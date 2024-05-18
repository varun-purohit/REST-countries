import Filter from "../components/Filter";
import Main from "../components/Main";
import Search from "../components/Search";

const Body = () => {
  return (
    <div className="px-4 py-6 sm:px-10 md:px-20 md:py-12 dark:bg-[#1e2933] transition-all duration-700">
      <div className=" flex flex-col gap-y-10  md:flex-row md:items-center md:justify-between">
        <Search />
        <Filter />
      </div>
      <Main />
    </div>
  );
};

export default Body;
