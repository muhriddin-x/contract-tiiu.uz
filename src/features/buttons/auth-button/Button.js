import { RotatingLines } from "react-loader-spinner";

export const Button = ({ text, loading, className, ...props }) => {
  return (
    <button
      disabled={loading}
      className={`w-full bg-secondary text-white rounded-lg py-[10px] font-medium sm:text-lg text-base flex justify-center items-center ${className}`}
      {...props}
    >
      {loading ? (
        <RotatingLines
          strokeColor="white"
          strokeWidth="5"
          animationDuration="0.75"
          width="28"
          visible={true}
        />
      ) : (
        text
      )}
    </button>
  );
};
