import { formatDate } from "@/shared/lib/formatDate";
import { Select } from "@/shared/ui/DataEntry/Select";
import { styles } from "@/shared/ui/DataEntry/Select/Select.styles";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import ReactSelect from "react-select";

export const SectionHeader = ({ myApplication }) => {
  let { t } = useTranslation("common");

  const admission_years = [
    { value: "2024-2025", label: "2024-2025 O'quv yili" },
    { value: "2023-2024", label: "2023-2024 O'quv yili" },
  ];

  return (
    <div className="sm:py-5 sm:px-5 py-2 px-3 rounded-lg flex justify-between items-center bg-white">
      <div className="relative flex sm:gap-4 gap-2 items-start">
        <div className="flex items-center sm:gap-4 gap-2">
          <div className="sm:block hidden">
            <Image
              src="/assets/application-status-user.png"
              width={44}
              height={44}
              alt="user"
            />
          </div>
          <strong className="font-semibold sm:text-lg text-base">
            To’lovlar
          </strong>
        </div>
      </div>
      <div>
        <Select
          style={{ width: "200px !important" }}
          className="!border-none !outline-none !bg-red"
          defaultValue={admission_years[0]}
          options={admission_years}
          creatable
        />

        {/* <ReactSelect
          isSearchable={false}
          options={admission_years}
          styles={styles}
         
        /> */}
      </div>
    </div>
  );
};
