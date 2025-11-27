export const PersonalSkleton = () => {
  return (
    <div className="border rounded-lg p-6 w-full mt-5 bg-white">
      <div className="w-[200px] h-[15px] rounded-lg bg-skleton opacity-40 animate-pulse"></div>
      <div className="w-[125px] h-[150px] rounded-lg bg-skleton opacity-40 animate-pulse mt-3"></div>
      <div className="grid grid-cols-6 gap-5 mt-5">
        <div className="h-[44px] col-span-2 bg-skleton opacity-40 animate-pulse rounded-lg"></div>
        <div className="h-[44px] col-span-2 bg-skleton opacity-40 animate-pulse rounded-lg"></div>
        <div className="h-[44px] col-span-2 bg-skleton opacity-40 animate-pulse rounded-lg"></div>
        <div className="h-[44px] col-span-2 bg-skleton opacity-40 animate-pulse rounded-lg"></div>
        <div className="h-[44px] col-span-2 bg-skleton opacity-40 animate-pulse rounded-lg"></div>
        <div className="h-[44px] col-span-2 bg-skleton opacity-40 animate-pulse rounded-lg"></div>
        <div className="h-[44px] col-span-2 bg-skleton opacity-40 animate-pulse rounded-lg"></div>
        <div className="h-[44px] col-span-2 bg-skleton opacity-40 animate-pulse rounded-lg"></div>
        <div className="h-[44px] col-span-2 bg-skleton opacity-40 animate-pulse rounded-lg"></div>
      </div>
    </div>
  );
};
