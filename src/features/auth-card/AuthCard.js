export const AuthCard = ({ children }) => {
  return (
    <main
      className={`max-w-[596px]  flex flex-col items-center bg-white rounded-[10px] sm:px-10 sm:py-10 px-5 py-5  mt-8  mx-auto`}
    >
      {children}
    </main>
  );
};
