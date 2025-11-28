import { formatMoney } from "@/shared/lib/formatMoney";

export const PaymentSummary = ({ invoices }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="col-span-2 py-3 rounded-[10px] bg-main-blue/10 text-blue text-center">
        <p className="text-2xl font-semibold">
          {formatMoney(invoices?.final_tuition_fee)} UZS
        </p>
        <p className="text-sm">To'lov kontrakt summa</p>
      </div>
      <div className="sm:col-span-1 col-span-2 py-3 rounded-[10px] bg-primary/10 text-primary text-center">
        <p className="text-lg font-semibold">
          {formatMoney(invoices?.paid_amount)} UZS
        </p>
        <p className="text-sm">Jami to'langan summa</p>
      </div>{" "}
      <div className="sm:col-span-1 col-span-2 py-3 rounded-[10px] bg-red/10 text-red text-center">
        <p className="text-lg font-semibold">
          {formatMoney(invoices?.unpaid_amount)} UZS
        </p>
        <p className="text-sm">Qarzdorlik</p>
      </div>
    </div>
  );
};
