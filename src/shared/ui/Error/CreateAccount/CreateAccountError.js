import Image from "next/image";

export const CreateAccountError = ({ isError, message, color }) => {
  return (
    <div
      className={`sm:p-4 p-2 mt-5 rounded-lg text-white grid grid-cols-12 sm:gap-0 gap-[2px] sm:items-start items-start ${
        color == "error" ? "bg-input-error" : "bg-warning"
      }`}
    >
      {" "}
      <div className="col-span-1">
        <Image
          src="/assets/info-circle.png"
          width={32}
          height={32}
          alt="info-error"
        />
      </div>
      <div className="col-span-11">
        <p className="sm:text-sm text-xs ">
          {message}
          {/* Markaziy ma'lumotlar bazasida ma'lumotlar topilmadi. Kiritilgan
        maʼlumotlar toʻgʻriligini tekshiring va qaytadan urinib koʻring. */}
        </p>
      </div>
    </div>
  );
};
