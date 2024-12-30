import {
  FormControl,
  FormHelperText,
  InputLabel,
  TextField,
} from "@mui/material";
import React, { Fragment } from "react";
import { Controller } from "react-hook-form";
import { Autocomplete } from "@mui/material";

const F_Autocomplete = ({
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
  defaultValue = null,
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
        maxWidth: props.maxWidth ?? "230px",
        minWidth: props.minWidth ?? "230px",
      }}
      error={!!errors?.[name]}
    >
      <Controller
        name={name}
        control={control}
        defaultValue={props?.defaultValue ?? (multiple ? [] : null)}
        rules={rules}
        render={({ field: { onChange, ref, value } }) => (
          <Fragment>
            <Autocomplete
              multiple={multiple}
              value={list?.find((x) => value)?.label || (multiple ? [] : null)}
              onChange={(event, newValue) => {
                onChange(newValue.value);
                onSelect(newValue.value);
              }}
              options={list}
              getOptionLabel={(option) => {
                return option?.label ?? option.name ?? option ?? "";
              }}
              isOptionEqualToValue={(option, val) =>
                option.value === val || option.name === val
              }
              disableCloseOnSelect={multiple}
              disabled={isDisabled}
              readOnly={readOnly}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  inputRef={ref}
                  error={!!errors?.[name]}
                  helperText={errors?.[name]?.message ?? ""}
                  variant="outlined"
                  size="small"
                  sx={{
                    "& .MuiInputBase-input": {
                      fontSize: "13px", 
                    },
                  }}
                />
              )}
              disableClearable={false}
              {...props}
            />
          </Fragment>
        )}
      />
    </FormControl>
  );
};

export default F_Autocomplete;
