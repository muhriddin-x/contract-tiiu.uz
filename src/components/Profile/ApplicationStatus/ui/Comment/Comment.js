import Image from "next/image";

export const Comment = ({ comment }) => {
  return (
    <div className="mt-5 bg-red p-3 sm:rounded-xl text-white flex items-center justify-start gap-2">
      <Image
        src="/assets/info-circle.png"
        width={32}
        height={32}
        alt="info-error"
      />{" "}
      <p className="text-sm font-semibold">{comment?.comment}</p>
    </div>
  );
};
