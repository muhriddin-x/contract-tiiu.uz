import { ProgressBarData } from "@/entities/layoutData/LayoutData";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";

export const ProfileProgress = ({ page }) => {
  let { t } = useTranslation("common");

  return (
    <div className="bg-white rounded-lg mb-5 p-4 grid grid-cols-3 items-center">
      {ProgressBarData.map((item) => {
        return (
          <div
            key={item.id}
            className="col-span-1 flex items-center justify-center xl:justify-between  py-2"
          >
            <div className="flex flex-wrap justify-center items-center">
              <span className="w-8 h-8 xl:w-[44px] xl:h-[44px] rounded-full p-2 block border">
                <Image
                  width={60}
                  height={60}
                  src={item.icon}
                  alt={item.title}
                  className="xl:hidden block"
                />
                <Image
                  width={24}
                  height={24}
                  src={item.icon}
                  alt={item.title}
                  className="xl:block hidden"
                />
              </span>
              <div className="ml-2">
                <h3
                  className={`xl:text-lg text-xs font-semibold text-center xl:text-start mt-2 ${
                    page == item.path && "text-blue"
                  }`}
                >
                  {t(item.title)}
                </h3>
                <p className="xl:block hidden text-xs font-medium text-gray-500">
                  {t(item.description)}
                </p>
              </div>
              {item.id != 3 && (
                <Image
                  src="/assets/section-card-arrow.svg"
                  width={20}
                  height={20}
                  alt="arrow"
                  className="ml-4 xl:block hidden"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
