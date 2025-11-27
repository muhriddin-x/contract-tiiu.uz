import Image from "next/image";

export const AuthCardTitle = ({ title, text }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="p-5 ">
        <Image
          src="/assets/univer-logo.png"
          width={96}
          height={96}
          alt="logo"
        />
      </div>
      <h1 className="sm:text-[28px] text-xl font-bold  text-center mt-0 sm:leading-9 leading-7">
        {title}
      </h1>
      <p className="text-[14px]  text-center sm:px-24 px-1 sm:leading-6 leading-5 mt-3 text-btnGray">
        {text}
      </p>
    </div>
  );
};
