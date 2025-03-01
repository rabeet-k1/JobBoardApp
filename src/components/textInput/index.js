import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { allColors } from "../../constants";

function TextInput({
  inputStartIcon,
  inputEndIcon,
  fullwidth,
  readonly,
  marginTop,
  placeholder,
  inputPadding,
  bgColor,
  value,
  onChange,
  inputLabel,
  inputType,
  name,
}) {
  return (
    <TextField
      name={name}
      fullWidth={fullwidth ? true : false}
      onChange={(e) => onChange && onChange(e)}
      value={value}
      type={inputType}
      sx={{
        marginTop: marginTop,
        userSelect: "none",
        "&.MuiFormControl-root .MuiFormLabel-root": {
          // paddingLeft: "15px",
          color: allColors.darkGray,
          fontSize: "15px",
        },
        "&.MuiFormControl-root .Mui-focused": {
          paddingLeft: inputLabel ? "0" : "15px",
          color: allColors.darkGray,
          fontSize: "15px",
        },
        "& .MuiInputBase-root": {
          borderRadius: "20px",
          padding: inputPadding ? inputPadding : "2px 10px",
          fontSize: "14px",
          background: bgColor ? bgColor : "transparent",
        },
        "& .MuiInputBase-root .MuiInputBase-inputMultiline": {
          paddingLeft: "20px",
        },
        "& .MuiInputBase-root .MuiOutlinedInput-notchedOutline": {
          borderColor: `${allColors.silverSand} !important`,
        },
      }}
      placeholder={placeholder}
      label={inputLabel}
      variant="outlined"
      InputProps={{
        readOnly: readonly,
        startAdornment: inputStartIcon && (
          <InputAdornment position="start">{inputStartIcon}</InputAdornment>
        ),
        endAdornment: inputEndIcon && (
          <InputAdornment position="end" sx={{ cursor: "pointer" }}>
            {inputEndIcon}
          </InputAdornment>
        ),
      }}
    />
  );
}

export default TextInput;
