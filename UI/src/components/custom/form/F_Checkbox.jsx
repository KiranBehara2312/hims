import {
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const F_Checkbox = ({
  name = "",
  label = "",
  control = {},
  isDisabled = false,
  isRequired = false,
  errors = {},
  rules = {},
  defaultChecked = false,
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
        defaultValue={defaultChecked}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
                disabled={isDisabled}
                {...props}
              />
            }
            label={label}
          />
        )}
      />
      {errors?.[name] && (
        <FormHelperText error>{errors?.[name]?.message}</FormHelperText>
      )}
    </FormControl>
  );
};

export default F_Checkbox;
