import nationalities from "i18n-nationality";
import { allCountries } from "country-region-data";

// Support english languages.
nationalities.registerLocale(require("i18n-nationality/langs/en.json"));

export const getNationalities = () => {
  const nationalitiesValues = nationalities.getNames("en");
  console.log(
    "🚀 ~ getNationalities ~ nationalitiesValues:",
    nationalitiesValues,
  );
  return Object.keys(nationalitiesValues).map((countryCode) => ({
    countryCode,
    nationality: nationalitiesValues[countryCode],
  }));
};

export const getNationIndex = (nationality: string) => {
  return (
    getNationalities().findIndex(
      (nation) => nation.nationality === nationality,
    ) || 0
  );
};

export const getRegionsFromNationality = (nationality = "ethiopian") => {
  // Getting country code from nationality like ethiopian
  const countryCode = getNationalities().find(
    (country) =>
      country.nationality.toLocaleLowerCase() ===
      nationality.toLocaleLowerCase(),
  )?.countryCode;

  const country = allCountries.find(
    (country) => country[1].toLowerCase() === countryCode?.toLowerCase(),
  );

  if (country) {
    return country[2].map((data) => ({
      region: data[0],
      regionCode: data[1],
    }));
  } else {
    return [];
  }
};
