// import {
//   Checkbox,
//   FormControl,
//   FormHelperText,
//   InputLabel,
//   TextField,
// } from "@mui/material";
// import React, { Fragment } from "react";
// import { Controller } from "react-hook-form";
// import { Autocomplete } from "@mui/material";
// import { MdCheckBoxOutlineBlank } from "react-icons/md";
// import { MdCheckBox } from "react-icons/md";

// const icon = <MdCheckBoxOutlineBlank size="1rem" />;
// const checkedIcon = <MdCheckBox size="1rem" />;

// const F_Autocomplete = ({
//   list = [],
//   name = "",
//   label = "",
//   control = {},
//   onSelect = () => {},
//   isDisabled = false,
//   isRequired = false,
//   errors = {},
//   rules = {},
//   multiple = false,
//   readOnly = false,
//   defaultValue = null,
//   ...props
// }) => {
//   return (
//     <FormControl
//       fullWidth
//       variant="outlined"
//       size="small"
//       sx={{
//         mt: 0.25,
//         mb: 0.25,
//         maxWidth: props.maxWidth ?? "100%",
//         minWidth: props.minWidth ?? "100%",
//       }}
//       error={!!errors?.[name]}
//     >
//       <Controller
//         name={name}
//         control={control}
//         defaultValue={defaultValue ?? (multiple ? [] : "")}
//         rules={rules}
//         render={({ field: { onChange, ref, value } }) => (
//           <Fragment>
//             <Autocomplete
//               disablePortal
//               multiple={multiple}
//               value={
//                 multiple
//                   ? list.filter((option) =>
//                       value.includes(option.dropdownValue)
//                     )
//                   : list.find((option) => option.dropdownValue === value)
//                       ?.dropdownValue || null
//               }
//               onChange={(event, newValue) => {
//                 const selectedValue = multiple
//                   ? newValue.map((item) => item.dropdownValue)
//                   : newValue?.dropdownValue;
//                 onChange(selectedValue);
//                 onSelect(selectedValue);
//               }}
//               options={list}
//               getOptionLabel={(option) => {
//                 const obj =
//                   list.find((item) => item.dropdownValue === option) ?? null;
//                 return obj?.dropdownLabel ?? option?.dropdownLabel;
//               }}
//               isOptionEqualToValue={(option, val) => {
//                 return option.dropdownValue === val;
//               }}
//               disableCloseOnSelect={multiple}
//               disabled={isDisabled}
//               readOnly={readOnly}
//               renderOption={(props, option, { selected }) => {
//                 const { key, ...optionProps } = props;
//                 return (
//                   <li key={key} {...optionProps} style={{ padding: "2px 10px"}}>
//                     <Checkbox
//                       size="medium"
//                       icon={icon}
//                       checkedIcon={checkedIcon}
//                       style={{ marginRight: 8, marginLeft: -10 }}
//                       checked={selected}
//                     />
//                     {option.dropdownLabel}
//                   </li>
//                 );
//               }}
//               renderInput={(params) => (
//                 <TextField
//                   label={label}
//                   inputRef={ref}
//                   error={!!errors?.[name]}
//                   helperText={errors?.[name]?.message ?? ""}
//                   variant="outlined"
//                   size="small"
//                   sx={{
//                     "& .MuiInputBase-input": {
//                       fontSize: "0.75rem",
//                     },
//                   }}
//                   {...params}
//                 />
//               )}
//               disableClearable={false}
//               {...props}
//             />
//           </Fragment>
//         )}
//       />
//     </FormControl>
//   );
// };

// export default F_Autocomplete;

import React, { Fragment } from "react";
import { Controller } from "react-hook-form";
import {
  Autocomplete,
  Checkbox,
  FormControl,
  TextField,
  useTheme,
} from "@mui/material";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

const icon = <MdCheckBoxOutlineBlank size="1.15rem" />;
const checkedIcon = <MdCheckBox size="1.15rem" />;

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
  const theme = useTheme();
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
                  : list.find((option) => option.dropdownValue === value) ||
                    null
              }
              onChange={(event, newValue) => {
                let selectedValue;
                if (multiple) {
                  let dupVal = "";
                  const seen = new Set();
                  for (const item of newValue) {
                    if (seen.has(item.dropdownValue)) {
                      dupVal = item.dropdownValue;
                    }
                    seen.add(item.dropdownValue);
                  }
                  const finalSelVal = newValue.filter(
                    (item) => item.dropdownValue !== dupVal
                  );
                  selectedValue = finalSelVal.map((item) => item.dropdownValue);
                } else {
                  selectedValue = newValue?.dropdownValue ?? null;
                }
                onChange(selectedValue);
                onSelect(selectedValue);
              }}
              options={list}
              getOptionLabel={(option) => option.dropdownLabel || ""}
              isOptionEqualToValue={(option, val) =>
                option.dropdownValue === val
              }
              disableCloseOnSelect={multiple}
              disabled={isDisabled}
              readOnly={readOnly}
              limitTags={1}
              renderOption={(props, option, { selected }) => {
                delete props.key;
                return (
                  <li
                    key={option.dropdownValue}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: multiple
                        ? ""
                        : value === option.dropdownValue
                        ? theme.palette.primary.main
                        : "",
                      color: multiple
                        ? ""
                        : value === option.dropdownValue
                        ? theme.palette.common.white
                        : "",
                    }}
                    {...props}
                  >
                    {multiple && (
                      <Checkbox
                        size="medium"
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: "8px", padding: "2px 0" }}
                        checked={value.includes(option.dropdownValue)}
                      />
                    )}
                    {option.dropdownLabel}
                  </li>
                );
              }}
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
                      fontSize: "0.75rem",
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
