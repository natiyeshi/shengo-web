import { Label } from "@/components/ui/label";

import FieldControl from "./field-control";
import { Input } from "@/components/ui/input";
import Rows from "./rows";
import H3 from "@/components/custom/h3";

import Selector from "./selector";
import {
  CUSTOMER_TITLES,
  CUSTOMET_TYPES,
  GENDERS,
  NATIONALITIES,
} from "../_utils/constants";
import { getRegions, stringToObjectOfTitleValue } from "../_utils";
import { Textarea } from "@/components/ui/textarea";
import Columns from "./columns";
import { Save } from "lucide-react";
import ButtonWithIcon from "./button-with-icon";

import { MdClear } from "react-icons/md";
import { Checkbox } from "@/components/ui/checkbox";
import LabelMandatory from "./label-mandatory";

type Props = {};

const CustomerIdentityRegisteration = (props: Props) => {
  const maxTinLength = 10;
  return (
    <section>
      <FieldControl className="">
        <LabelMandatory className="">Customer Type</LabelMandatory>
        <Selector selectorData={CUSTOMET_TYPES} />
      </FieldControl>
      <Rows className=" mt-5">
        <H3>Saler</H3>
        <section className="flex gap-5">
          <FieldControl className="w-[20rem]">
            <LabelMandatory className="">Title</LabelMandatory>
            <Selector selectorData={CUSTOMER_TITLES} />
          </FieldControl>
          <FieldControl>
            <LabelMandatory className="">Name</LabelMandatory>
            <Input />
          </FieldControl>
          <FieldControl>
            <LabelMandatory className="">Father Name</LabelMandatory>
            <Input />
          </FieldControl>
          <FieldControl>
            <LabelMandatory className="">Grand Father Name</LabelMandatory>
            <Input />
          </FieldControl>
        </section>
        <section className="flex gap-5">
          <FieldControl>
            <LabelMandatory className="">Nationality</LabelMandatory>
            <Selector
              selectorData={NATIONALITIES}
              defaultIndex={
                NATIONALITIES.findIndex(
                  (nation) => nation.value === "ethiopian"
                ) || 0
              }
            />
          </FieldControl>
          <FieldControl>
            <LabelMandatory className="">Origin</LabelMandatory>
            <Selector
              selectorData={NATIONALITIES}
              defaultIndex={
                NATIONALITIES.findIndex(
                  (nation) => nation.value === "ethiopian"
                ) || 0
              }
            />
          </FieldControl>
          <FieldControl className="w-[24rem]">
            <LabelMandatory className="">Gender</LabelMandatory>
            <Selector selectorData={GENDERS} />
          </FieldControl>
          <FieldControl>
            <LabelMandatory className="">Tin</LabelMandatory>
            <Input type="number" maxLength={10} />
          </FieldControl>
        </section>
      </Rows>
      <Rows className=" mt-5">
        <H3>Address</H3>
        <FieldControl className="flex-row gap-3 items-center">
          <Checkbox />
          <Label className="">Are you a foreigner ?</Label>
        </FieldControl>
        <Columns>
          <FieldControl>
            <LabelMandatory className="">Region</LabelMandatory>
            <Selector
              selectorData={stringToObjectOfTitleValue(getRegions().regions)}
            />
          </FieldControl>
          <FieldControl>
            <Label className="">City</Label>
            <Input />
          </FieldControl>
          <FieldControl>
            <Label className="">Sub city</Label>
            <Input />
          </FieldControl>
        </Columns>
        <Columns>
          <FieldControl>
            <Label className="">Woreda</Label>
            <Input />
          </FieldControl>
          <FieldControl>
            <Label className="">House No.</Label>
            <Input type="number" />
          </FieldControl>
          <FieldControl>
            <Label className="">Phone No.</Label>
            <Input type="number" maxLength={10} placeholder="0918232425" />
          </FieldControl>
        </Columns>
        <Columns>
          <FieldControl className="col-span-3">
            <Label className="">Other Address</Label>
            <Textarea className="resize-none" />
          </FieldControl>
        </Columns>
      </Rows>

      <section className="flex justify-end gap-5 my-7">
        <ButtonWithIcon variant="destructive">
          <MdClear />
          <span>Clear</span>
        </ButtonWithIcon>
        <ButtonWithIcon>
          <Save />
          <span>Save</span>
        </ButtonWithIcon>
      </section>
    </section>
  );
};

export default CustomerIdentityRegisteration;
