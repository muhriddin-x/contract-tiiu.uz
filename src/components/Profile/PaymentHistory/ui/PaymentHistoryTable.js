import { formatDate } from "@/shared/lib/formatDate";
import Image from "next/image";
import { PAYMENT_ICONS, PAYMENT_TYPES } from "../constants/PaymentType";

export const PaymentHistoryTable = ({ invoices = [] }) => {
  const payments = invoices.map((invoice) => ({
    title: PAYMENT_TYPES[invoice.invoice_type] || invoice.invoice_type,
    icon:
      invoice.payment_type == "bank"
        ? "bank"
        : PAYMENT_ICONS[invoice.payment_type],
    amount: invoice.price,
    date: formatDate(invoice.created_at),
    unchangedTitle: invoice.invoice_type,
  }));

  return (
    <div className="w-full mt-5 rounded-xl bg-white p-5">
      <h3 className="text-lg font-semibold mb-4">To’lovlar tarixi</h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600">
              <th className="py-3 px-4">№</th>
              <th className="py-3 px-4">TO’LOV MAQSADI</th>
              <th className="py-3 px-4">TO’LOV TURI</th>
              <th className="py-3 px-4">TO’LOV</th>
              <th className="py-3 px-4">SANA</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((item, idx) => (
              <tr
                key={idx}
                className="border-b last:border-none hover:bg-gray-50"
              >
                <td className="py-3 px-4">{idx + 1}</td>

                <td className={`py-3 px-4 whitespace-nowrap`}>{item.title}</td>

                <td className="py-3 px-4">
                  {item?.icon === undefined ? (
                    <span className="text-gray-700 font-medium ">-</span>
                  ) : item.icon === "bank" ? (
                    <span className="text-gray-700 font-medium ">
                      Bank orqali
                    </span>
                  ) : (
                    <Image
                      src={item.icon}
                      width={70}
                      height={20}
                      alt="payment icon"
                      className="h-5 w-auto object-contain"
                    />
                  )}
                </td>

                <td
                  className={`py-3 px-4 font-semibold ${
                    item.unchangedTitle == "contract_payment"
                      ? "text-green-600"
                      : item.unchangedTitle == "contract_refund"
                      ? "text-red"
                      : "text-violate"
                  }`}
                >
                  {Math.abs(item.amount).toLocaleString("uz-UZ") + " UZS"}
                </td>

                <td className="py-3 px-4 whitespace-nowrap">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
