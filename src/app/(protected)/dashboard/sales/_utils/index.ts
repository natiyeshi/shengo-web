import nationalities from "i18n-nationality";
import { allCountries } from "country-region-data";

export const getNationalities = () => {
  const nationalitiesValues = nationalities.getNames("en");
  return {
    nationalities: Object.values(nationalitiesValues),
    countryCodes: Object.keys(nationalitiesValues),
  };
};

export const getNationIndexFromNationalities = (nationality: string) => {
  const NATIONALITIES = stringToObjectOfTitleValue(
    getNationalities().nationalities,
  );
  return NATIONALITIES.findIndex((nation) => nation.value === nationality) || 0;
};

export const getRegionsFromNationality = (nationality = "ethiopian") => {
  // Getting country code from nationality like ethiopian
  const countryCode = getNationalities().countryCodes.at(
    getNationalities().nationalities.findIndex(
      (nation) => nation.toLowerCase() === nationality,
    ),
  );

  const country = allCountries.find(
    (country) => country[1].toLowerCase() === countryCode?.toLowerCase(),
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

export const stringToObjectOfTitleValue = (data: string[]) =>
  data.map((data) => ({
    title: data,
    value: data.toLowerCase(),
  }));
