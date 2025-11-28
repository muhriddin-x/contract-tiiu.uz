import Image from "next/image";

export const SectionHeader = () => {
  return (
    <div className="sm:py-5 sm:px-5 py-2 px-3 rounded-lg flex justify-between bg-white">
      <div className="relative flex sm:gap-4 gap-2 items-start">
        <div className="flex items-center sm:gap-4 gap-2">
          <div>
            <Image
              src="/assets/application-status-user.png"
              width={44}
              height={44}
              alt="user"
            />
          </div>
          <div>
            <strong className="font-semibold sm:text-lg text-base">
              Shaxsiy ma'lumotlar
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};
