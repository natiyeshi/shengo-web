
export interface PersonInf {
    customerType: string;
    customerTitle: string;
    name: string;
    fatherName: string;
    grandFatherName: string;
    gender: string;
    nationality: string;
    origin: string;
    tin: number;
    foreign: boolean;
    region: string;
    city: string;
    subcity: string;
    houseNumber: number;
    phoneNumber: string;
    otherAddress: string;
  
    businessName: string;
    grantorName: string;
    jobPosition: string;
  }

export type HookProps = {
    type: string;
    goBack: Function;
    goToNext: Function;
  };