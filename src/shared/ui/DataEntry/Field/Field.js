export const Field = ({
  label,
  name,
  required,
  children,
  error,
  className = "",
  wrapperclassname = "",
}) => {
  return (
    <div className={wrapperclassname}>
      {!!label && (
        <label
          className={
            "mb-1 md:mb-3 text-sm inline-flex max-w-full w-full overflow-hidden " +
            className
          }
          htmlFor={name}
        >
          <span className="overflow-hidden whitespace-nowrap text-ellipsis">
            {label}
          </span>
          {required && <span className="ml-1 text-input-error">*</span>}
        </label>
      )}
      <div>{children}</div>
      {error && (
        <p className="text-input-error mt-1 text-xs" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
