export type countryData = {
  year: number;
  population: number | undefined;
  cement_co2: number | undefined;
  cement_co2_per_capita: number | undefined;
  cumulative_cement_co2: number | undefined;
};

export type countriesData = {
  iso_code: string;
  data: countryData[];
};

export type TransformedCountry = {
  name: string;
  iso_code: string;
  data: countryData[];
};
