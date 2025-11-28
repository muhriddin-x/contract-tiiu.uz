import { classNames } from "@/shared/lib/classNames";

export const Card = ({ children, className }) => {
  return (
    <div
      className={classNames(
        "sm:py-5 sm:px-5 py-2 px-3 rounded-lg  bg-white",
        {},
        [className]
      )}
    >
      {children}
    </div>
  );
};
