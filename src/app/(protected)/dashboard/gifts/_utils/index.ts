import nationalities from "i18n-nationality";
import { allCountries, CountryData } from "country-region-data";

//  const { CountryRegionData } = require('country-region-data');

export const getNationalities = () => {
  const nationalitiesValues = nationalities.getNames("en");
  return {
    nationalities: Object.values(nationalitiesValues),
    countryCodes: Object.keys(nationalitiesValues),
  };
};

export const getRegions = (nationality = "ethiopian") => {
  // Getting country code from nationality like ethiopian
  const countryCode = getNationalities().countryCodes.at(
    getNationalities().nationalities.findIndex(
      (nation) => nation.toLowerCase() === nationality
    )
  );

  const country = allCountries.find(
    (country) => country[1].toLowerCase() === countryCode?.toLowerCase()
  );
  if (country) {
    return {
      regions: country[2].map((data) => data[0]),
      regionCodes: country[2].map((data) => data[1]),
    };
  } else {
    return {
      regions: [],
      regionCodes: [],
    };
  }
};

export const stringToObjectOfTitleValue = (datas: string[]) =>
  datas.map((data) => ({
    title: data,
    value: data.toLowerCase(),
  }));
