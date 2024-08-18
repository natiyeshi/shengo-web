
export {
  getNationalities,
  getNationIndex,
  getRegionsFromNationality,
} from "./nationality";

export const strToObjOfLabelAndValue = (data: string[]) =>
  data.map((data) => ({
    label: data,
    value: data.toLowerCase(),
  }));

