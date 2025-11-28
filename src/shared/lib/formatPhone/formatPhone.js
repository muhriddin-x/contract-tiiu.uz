export function formatPhone(phone) {
  if (!phone) return ""; // null, undefined, "", 0 => ""

  const p = String(phone).replace(/\D/g, ""); // stringga aylantirib faqat raqam olish

  if (!p.startsWith("998")) return phone;

  let result = "+998";

  if (p.length > 3) result += " " + p.slice(3, 5);
  if (p.length > 5) result += " " + p.slice(5, 8);
  if (p.length > 8) result += " " + p.slice(8, 10);
  if (p.length > 10) result += " " + p.slice(10, 12);

  return result;
}
