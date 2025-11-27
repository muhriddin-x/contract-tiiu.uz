import { imageExtensions } from "@/shared/config/fileExtensions/image";
import useTranslation from "next-translate/useTranslation";
import getConfig from "next/config";
import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import Image from "next/image";

const { publicRuntimeConfig } = getConfig();

export const AvatarUploader = ({ name, isDisabled = false }) => {
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
          <div
            className="flex items-start mt-5 sm:gap-5 gap-3"
            ref={wrapperRef}
          >
            <label className="shrink-0 relative overflow-hidden rounded-md">
              <div className="relative w-[110px] h-[130px] bg-[#F0F2F5] flex items-center justify-center">
                <div>
                  {value && typeof value === "string" ? (
                    <img
                      src={`${publicRuntimeConfig.backendUrl}/${value}`}
                      alt="Preview"
                      className="object-cover"
                      accept="image/*"
                    />
                  ) : temporaryImg ? (
                    <img
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
                    disabled={isDisabled}
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
                <span className="bg-black bg-opacity-35 flex items-center justify-center absolute top-0 left-0 right-0 bottom-0">
                  <Image
                    src="/assets/camera.svg"
                    width={30}
                    height={30}
                    alt="image"
                  />
                </span>
              )}
            </label>
            <div className="">
              <p className="font-semibold text-base">
                Upload a profile picture
              </p>
              <p className="mt-2 text-sm font-normal sm:w-8/12 w-full">
                Upload your 3x4 photo with a white or blue background in .png,
                .jpg, .jpeg format, no larger than 5mb in size
              </p>
              {error && (
                <span className=" text-red text-sm">{error.message}</span>
              )}
            </div>
          </div>
        );
      }}
    />
  );
};
