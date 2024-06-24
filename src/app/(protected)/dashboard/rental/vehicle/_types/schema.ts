import { z } from "zod";

export const individualSalerSchema = z.object({
  type: z.literal("individual"),
  title: z.enum(["mr", "mrs", "ms", "miss", "w/t", "ten-boss", "fifty-chief"]),
  name: z.string().min(1, { message: "Name is required." }),
  fatherName: z.string().min(1, { message: "Father name is required." }),
  grandFatherName: z
    .string()
    .min(1, { message: "Grand father name is required." }),
  nationality: z.string().min(1, { message: "Nationality is required" }),
  origin: z.string().min(1, { message: "Origin is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  tin: z
    .number()
    .min(5, { message: "Tin number is should be at least 5 digit long." })
    .max(10),
  isForeigner: z.boolean().default(false),
  region: z.string().min(1, { message: "Region is required" }),
  city: z.string().min(1, { message: "City is required" }),
  subCity: z.string().min(1, { message: "Sub city is required" }),
  woreda: z.string().min(1, { message: "Woreda is required" }),
  houseNo: z.string().min(1, { message: "House number is required" }),
  phoneNo: z.number().min(10, { message: "Phone number is required" }),
  otherAddress: z.string(),
});

export type IndividualSalerSchemaType = z.infer<typeof individualSalerSchema>;
