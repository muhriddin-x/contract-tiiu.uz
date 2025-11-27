import { imageExtensions } from "@/shared/config/fileExtensions/image";
import useTranslation from "next-translate/useTranslation";
import getConfig from "next/config";
import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import Image from "next/image";

const { publicRuntimeConfig } = getConfig();

export const ProfileUpload = ({ name, setNamunaProfile }) => {
  const { t } = useTranslation("myAccount");
  const [temporaryImg, setTemporaryImg] = useState();

  const {
    formState: { errors },
    control,
  } = useFormContext();

  const wrapperRef = useRef();

  const error = errors[name];

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        wrapperRef.current?.scrollIntoView(false);
        // console.log(inputRef.current?.focus);
        // inputRef.current?.focus();
      }, 0);
    }
  }, [error]);

  function handleImageChange(file) {
    if (!file) {
      return;
    }

    setTemporaryImg(URL.createObjectURL(file));
  }

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: "Recipe picture is required" }}
      render={({ field: { value, onChange, ref, ...field } }) => {
        return (
          <div className="flex items-start gap-5" ref={wrapperRef}>
            <label className="shrink-0 relative overflow-hidden rounded-md">
              <div className="relative w-[125px] h-[140px] bg-[#F0F2F5] flex items-center justify-center">
                <div className="object-cover">
                  {value && typeof value === "string" ? (
                    <img
                      src={`${publicRuntimeConfig.backendUrl}/${value}`}
                      alt="Preview"
                      className="object-cover"
                      accept="image/*"
                    />
                  ) : temporaryImg ? (
                    <Image
                      width={125}
                      height={140}
                      src={temporaryImg}
                      alt="image"
                      className="object-cover"
                    />
                  ) : (
                    ""
                    // <img
                    //   src="/user_icon.svg"
                    //   alt="image"
                    //   className="w-16 h-16"
                    // />
                  )}
                  <input
                    className="upload_input sr-only pointer-events:none"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      onChange(file);
                      handleImageChange(file);
                    }}
                    accept={imageExtensions}
                    type="file"
                    id="picture"
                    {...field}
                    ref={ref}
                  />
                </div>
              </div>
              {!value && typeof value !== "string" && (
                <span className="bg-[#00000080] flex items-center justify-center absolute top-0 left-0 right-0 bottom-0">
                  <Image
                    src="/assets/Camera.svg"
                    width={50}
                    height={50}
                    alt="avatar"
                  />
                </span>
              )}
            </label>
            <div className="w-1/2">
              {/* <p className="font-semibold text-base">Profil rasmini yuklang</p>
              <p className="mt-2 text-sm font-normal">
                Hajmi 5 mb dan katta bo'lmagan, .png, .jpg, .jpeg formatdagi oq
                yoki ko’k fonda olingan 3x4 razmerdagi rasmingizni yuklang.
              </p> */}
              {error && (
                <span className=" text-error_color">{error.message}</span>
              )}
            </div>
          </div>
        );
      }}
    />
  );
};
