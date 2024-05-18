import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCountry } from "../store/slice/countrySlice";
import { API_URL } from "../utils/data";

export const useFetchCountryData = () => {
  const dispatch = useDispatch();

  async function data() {
    const response = await axios.get(`${API_URL}/all`);
    const data = await response.data;
    dispatch(setCountry(data));
  }
  useEffect(() => {
    data();
  }, []);
};
