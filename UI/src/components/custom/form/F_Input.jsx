import { FormControl, TextField } from "@mui/material";
import React, { Fragment } from "react";
import { Controller } from "react-hook-form";

const F_Input = ({
  name = "",
  label = "",
  type = "text",
  control = {},
  isDisabled = false,
  isRequired = false,
  errors = {},
  rules = {},
  endAdornment = null,
  readOnly = false,
  multiline = false,
  maxRows = 1,
  placeholder = "",
  ...props
}) => {
  return (
    <FormControl
      fullWidth
      variant="outlined"
      size="small"
      error={!!errors?.[name]}
      sx={{
        mt: 0.25,
        mb: 0.25,
        maxWidth: props.maxWidth ?? "100%",
        minWidth: props.minWidth ?? "100%",
      }}
    >
      <Controller
        name={name}
        control={control}
        defaultValue={props?.defaultValue ?? ""}
        rules={rules}
        render={({ field: { onChange, ref, value } }) => (
          <TextField
            onChange={onChange}
            ref={ref}
            type={type}
            value={value}
            label={label}
            fullWidth
            placeholder={placeholder ?? ""}
            size="small"
            error={!!errors?.[name]}
            autoComplete="off"
            multiline={multiline}
            rows={maxRows}
            sx={{
              "& .MuiInputBase-root": {
                height: multiline ? "80px !important" : "auto",
                padding: multiline ? "10px !important" : "auto",
              },
            }}
            helperText={
              errors?.[name]
                ? errors?.[name].message
                : props.defaultHelperText ?? props.defaultHelperText ?? ""
            }
            disabled={isDisabled}
            slotProps={{
              input: {
                endAdornment: endAdornment,
                readOnly: readOnly,
              },
            }}
          />
        )}
      />
    </FormControl>
  );
};

export default F_Input;
