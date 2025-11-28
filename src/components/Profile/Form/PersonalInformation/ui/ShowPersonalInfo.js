import { formatDate } from "@/shared/lib/formatDate";
import { formatPhone } from "@/shared/lib/formatPhone/formatPhone";
import InfoRow from "@/shared/ui/InfoRow/InfoRow";
import getConfig from "next/config";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

export const ShowPersonalInfo = ({ userData }) => {
  const { publicRuntimeConfig } = getConfig();

  return (
    <Fragment>
      <section className="rounded-lg p-6 bg-white mt-5">
        <div className="flex gap-x-2 items-center">
          <div className="flex-shrink-0">
            <Image
              src={`${publicRuntimeConfig.backendUrl}/${userData.photo}`}
              width={100}
              height={100}
              className="w-20 h-20 object-cover rounded-full shrink-0"
              alt="user-image"
            />
          </div>
          <div>
            <p className="font-semibold text-xl">{userData?.full_name}</p>
            <p className="text-btnGray text-sm">Talaba</p>
          </div>
        </div>
        {/*  */}
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-y-5 mt-5">
          <InfoRow label="Telefon raqami" value={formatPhone(userData.phone)} />
          <InfoRow
            label="Qo’shimcha telefon raqam"
            value={formatPhone(userData.extra_phone)}
          />
          <InfoRow label="Elektron pochta" value={userData.email} />
        </div>
      </section>

      <section className="rounded-lg p-6 bg-white mt-5">
        {/*  */}
        <strong className="font-semibold sm:text-lg text-base">
          Pasport ma'lumotlari
        </strong>{" "}
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-y-5 mt-4">
          <InfoRow
            label="Pasport seriya raqami"
            value={formatPhone(userData.document)}
          />
          <InfoRow label="️JSHSHIR (PINFL)" value={formatPhone(userData.pin)} />
          <InfoRow
            label="Tug'ilgan kuni"
            value={formatDate(userData.birth_date)}
          />
          <InfoRow label="Jinsi" value={userData.gender} />
          <InfoRow label="Tug'ilgan joyi" value={userData.address} />
        </div>
      </section>
      <Link
        href="/profile/educational-information"
        className="mt-5 w-full bg-secondary text-white py-3 sm:rounded-lg block text-center sm:mb-0 mb-5"
      >
        Keyingi sahifa
      </Link>
    </Fragment>
  );
};
