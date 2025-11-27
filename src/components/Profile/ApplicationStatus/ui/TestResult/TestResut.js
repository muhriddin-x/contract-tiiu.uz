export const ResultTest = ({ myApplication }) => {
  if (!myApplication) return null;
  const application = myApplication;

  return (
    <div className="p-5 bg-white rounded-lg mt-5">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-[20px] font-semibold col-span-4">
          Imtihon natijasi
        </h1>
        {application?.exam?.exam_date != null && (
          <p>
            Imtihon sanasi:
            {application?.exam?.exam_date}
          </p>
        )}
      </div>

      <strong className="text-center block sm:text-4xl text-2xl sm:mt-0 mt-5">
        {/* {application?.exam?.exam_result} ball */}
        {Math.round(application?.exam?.exam_result * 100) / 100} ball
      </strong>

      <p className="sm:text-xl font-bold  mt-5 text-center">
        Tez orada universitet hodimlari siz bilan aloqaga chiqishadi
      </p>

      {/* {application?.status == "fail" ? (
        <p className="text-xl font-bold  mt-5 text-center">
          Tez orada universitet hodimlari siz bilan aloqaga chiqishadi
        </p>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <p className="text-xl text-primary font-bold  mt-5">
            Tabriklaymiz siz o’qishga qabul qilindizngiz!
          </p>
          <p>
            Shartnomani yuklab oling va shartnoma asosida to’lovni amalga
            oshiring.
          </p>
        </div>
      )} */}
    </div>
  );
};
