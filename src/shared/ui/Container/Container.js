export const Container = ({ className = "", children, ...props }) => {
  return (
    <div
      className={
        "container 2xl:max-w-[1382px] max-w-[1280px] mx-auto w-full font-montserrat px-4 sm:px-0 " +
        className
        // "container max-w-[1272px] mx-auto w-full font-montserrat" + className
      }
      {...props}
    >
      {children}
    </div>
  );
};
