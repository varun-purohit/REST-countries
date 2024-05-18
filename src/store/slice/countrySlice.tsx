import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CountryState {
  allCountries: (null | undefined)[];
  countryDetails: (null | undefined)[];
}

const initialState: CountryState = {
  allCountries: [],
  countryDetails: [],
};
const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    setCountry: (state, action: PayloadAction<(null | undefined)[]>) => {
      state.allCountries = action.payload;
    },
    filterCountry: (state, action: PayloadAction<(null | undefined)[]>) => {
      state.allCountries = action.payload;
    },
    searchCountry: (state, action: PayloadAction<(null | undefined)[]>) => {
      state.allCountries = action.payload;
    },
    countryDetail: (state, action: PayloadAction<(null | undefined)[]>) => {
      state.countryDetails = action.payload;
    },
  },
});

export const { setCountry, filterCountry, searchCountry, countryDetail } =
  countrySlice.actions;

export default countrySlice.reducer;
