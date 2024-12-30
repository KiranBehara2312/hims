import { createTheme } from "@mui/material";

// Define your custom theme configuration
// nurse = #86320d
// doctor = #860d74
// admin = #86690d
// staff = #0d8672
const useCustomTheme = (curmode = "light", dColor = "#0d8672") => {
  const theme = createTheme({
    palette: {
      mode: curmode,
      primary: {
        main: dColor,
      },
      secondary: {
        main: "#ff4081",
      },
      background: {
        default: curmode === "light" ? "#fff" : "#121212bd",
      },
      text: {
        primary: curmode === "dark" ? "#fff" : "#333333",
        secondary: curmode === "dark" ? "#fff" : "#757575",
      },
    },
    typography: {
      fontFamily: '"Roboto", sans-serif',
      h1: {
        fontSize: "1.8rem",
        fontWeight: 700,
      },
      body1: {
        fontSize: "1rem",
        color: curmode === "dark" ? "#fff" : "#555555",
      },
    },
    spacing: 8,
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            fontSize: "11px",
            marginTop: "-1px",
          },
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            "& p": {
              fontSize: "12px",
            },
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            fontSize: "0.875rem",
            backgroundColor: dColor,
            padding: "8px",
            color: "whitesmoke",
            maxHeight: "40px !important",
            minHeight: "40px !important",
            height: "40px !important",
          },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: {
            borderRight: `0.5px dashed ${dColor}`,
            borderBottom: `0.5px dashed ${dColor}`,
            borderLeft: `0.5px dashed ${dColor}`,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: "bold !important",
            fontSize: "14px",
          },
          root: {
            background: "transparent !important",
            fontSize: "13px",
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontSize: "13px",
            "&.Mui-selected": {
              background: dColor,
              color: curmode === "dark" ? "#fff" : "white",
            },
            "&.Mui-selected:hover": {
              background: dColor,
              color: "white",
            },
            "&:hover": {
              background: dColor,
              color: "white",
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            height: "auto",
            maxHeight: "calc(100% - 44px)",
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            padding: "0px !important",
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          listbox: {
            fontSize: "13px",
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontSize: "0.875rem",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            height: "40px !important",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            margin: 4.5,
            "& .MuiInputBase-root": {
              fontSize: "0.875rem",
              padding: "0 0",
            },
            "& .MuiFormLabel-root": {
              fontSize: "0.875rem",
            },
          },
        },
        defaultProps: {
          size: "small",
          variant: "outlined",
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "capitalize",
          },
        },
      },
    },
  });

  return theme;
};

export default useCustomTheme;
