import { classNames } from "@/shared/lib/classNames";

export default function InfoRow({ label, value, className = "" }) {
  return (
    <div className={classNames(className)}>
      <p className="text-btnGray text-sm">{label}</p>
      <p className="mt-1 font-medium">{value || "-"}</p>
    </div>
  );
}
