import { Select } from "@/shared/ui/DataEntry/Select";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

export const SectionHeader = ({ admissionYears }) => {
  let { t } = useTranslation("common");
  const router = useRouter();
  const searchParams = useSearchParams();
  const admission_years = admissionYears?.map((year) => ({
    value: year.admission_year,
    label: year.name,
  }));

  // const admission_years = [
  //   { value: "2025", label: "2024-2025" },
  //   { value: "2024", label: "2023-2024" },
  // ];

  const handleYearChange = (selected) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("admission_year", selected.value);
    router.replace(`?${params.toString()}`);
  };

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
          defaultValue={admission_years[0]}
          options={admission_years}
          onChange={handleYearChange}
        />
      </div>
    </div>
  );
};
