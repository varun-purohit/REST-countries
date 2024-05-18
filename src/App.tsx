import Body from "./pages/Body";
import Header from "./pages/Header";
import { useFetchCountryData } from "./hooks/fetchCountryData";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CountryDetails from "./components/CountryDetails";
import Error from "./components/Error";

function App() {
  useFetchCountryData();

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      errorElement: <Error />,
      // children: [
      //   {
      //     path: "/:country",
      //     element: <CountryDetails />,
      //   },
      // ],
    },
    {
      path: "/:country",
      element: <CountryDetails />,
    },
  ]);

  return (
    <div>
      <Header />
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
