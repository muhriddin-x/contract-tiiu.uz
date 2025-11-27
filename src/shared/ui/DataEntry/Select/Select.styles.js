export const styles = ({ radius = 8 }) => ({
  option: (provided, { getValue, value, isFocused }) => {
    const isOptionSelected = getValue().some(
      (option) => option.value === value
    );

    return {
      ...provided,
      background: isOptionSelected
        ? "rgba(26, 164, 255, 1)"
        : isFocused
        ? "rgb(222, 235, 255)"
        : "white",
      color: isOptionSelected ? "white" : "black",
      "&:hover": {
        background: isOptionSelected
          ? "rgba(26, 164, 255, 1)"
          : "rgb(222, 235, 255)",
      },
      "&:disalbed": {
        background: "#F0F2F5",
      },
    };
  },
  control: (provided) => ({
    ...provided,
    paddingLeft: "6px",
    fontWeight: "400",
    borderRadius: radius,
    height: 44,
    border: 0,
    boxShadow: "none",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "rgba(154, 159, 165, 1)",
  }),
  menuList: (provided) => ({
    ...provided,
    backgroundColor: "white",
  }),
  indicatorSeparator: (provided) => {
    return {
      ...provided,
      display: "none",
    };
  },
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return {
      ...provided,
      opacity,
      transition,
    };
  },
  menu: (provided) => {
    return {
      ...provided,
      zIndex: "100",
      backgroundColor: "white",
    };
  },
});
