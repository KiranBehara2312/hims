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
        mt: 0.25,
        mb: 0.25,
        maxWidth: props.maxWidth ?? "100%",
        minWidth: props.minWidth ?? "100%",
      }}
      error={!!errors?.[name]}
    >
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue ?? (multiple ? [] : "")}
        rules={rules}
        render={({ field: { onChange, ref, value } }) => (
          <Fragment>
            <Autocomplete
              disablePortal
              multiple={multiple}
              value={
                multiple
                  ? list.filter((option) =>
                      value.includes(option.dropdownValue)
                    )
                  : list.find((option) => option.dropdownValue === value)
                      ?.dropdownValue || null
              }
              onChange={(event, newValue) => {
                const selectedValue = multiple
                  ? newValue.map((item) => item.dropdownValue)
                  : newValue?.dropdownValue;
                onChange(selectedValue);
                onSelect(selectedValue);
              }}
              options={list}
              getOptionLabel={(option) => {
                const obj =
                  list.find((item) => item.dropdownValue === option) ?? null;
                return obj?.dropdownLabel ?? option?.dropdownLabel;
              }}
              isOptionEqualToValue={(option, val) => {
                return option.dropdownValue === val;
              }}
              disableCloseOnSelect={multiple}
              disabled={isDisabled}
              readOnly={readOnly}
              renderInput={(params) => (
                <TextField
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
                  {...params}
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
