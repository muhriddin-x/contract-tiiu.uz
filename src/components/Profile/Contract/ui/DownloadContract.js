import useTranslation from "next-translate/useTranslation";

export const DownloadContract = ({ myApplication, router }) => {
  let { t, lang } = useTranslation("common");

  return (
    <div className="p-5 bg-white rounded-lg mt-5 px-10">
      <p className="text-xl text-center font-bold">Shartnoma</p>
      <p className="text-center mt-2  font-medium">
        Pizza ipsum dolor meat lovers buffalo. Extra buffalo pepperoni bell
        sautéed. Mouth olives sausage onions and spinach dolor sausage extra
        onions. Tomato sausage tomatoes cheese cheese melted. Anchovies.
      </p>

      <button className="w-full bg-primary rounded-xl py-3 text-white mt-7">
        Yuklab olish
      </button>
    </div>
  );
};
