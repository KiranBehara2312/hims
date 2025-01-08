import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { Fragment } from "react";
import { Controller } from "react-hook-form";

const F_Select = ({
  list = [],
  name = "",
  label = "",
  control = {},
  onSelect = () => {},
  isDisabled = false,
  isRequired = false,
  errors = {},
  rules = {},
  multiple = false,
  readOnly = false,
  ...props
}) => {
  return (
    <FormControl
      fullWidth
      variant="outlined"
      size="small"
      sx={{
        mt: 1,
        mb: 1,
        ml: "5px",
        maxWidth: props.maxWidth ?? "100%",
        minWidth: props.minWidth ?? "100%",
      }}
      error={!!errors?.[name]}
    >
      <InputLabel id={`${name}-select-label`}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={props?.defaultValue ?? (multiple ? [] : "")}
        rules={rules}
        render={({ field: { onChange, ref, value } }) => (
          <Fragment>
            <Select
              readOnly={readOnly}
              fullWidth
              ref={ref}
              value={value}
              label={label}
              multiple={multiple}
              labelId={`${name}-select-label`}
              id={`${name}_select`}
              sx={{
                fontSize: "13px",
                width: "100%",
              }}
              onChange={(event) => {
                onChange(event);
                onSelect(event.target.value);
              }}
              disabled={isDisabled}
            >
              {list?.map((x, i) => {
                return (
                  <MenuItem value={x.value ?? x.name} key={i}>
                    {x.label ?? x.name}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>{errors?.[name]?.message ?? ""}</FormHelperText>
          </Fragment>
        )}
      />
    </FormControl>
  );
};

export default F_Select;
