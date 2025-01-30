import { createTheme } from "@mui/material";

// Define your custom theme configuration
// nurse = #0aa270
// doctor = #860d74
// admin = #0d6986
// staff = #1d0d86
const useCustomTheme = (curmode = "light", dColor = "#0d6986") => {
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
      MuiBadge: {
        styleOverrides: {
          badge: {
            fontSize: "0.7rem !important",
            borderRadius: "50%",
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: dColor,
            color: "#fff",
            fontSize: "0.7rem",
            borderRadius: "8px",
            padding: "8px 12px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          },
          arrow: {
            color: dColor,
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            borderRadius: "none !important",
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            fontSize: "0.55rem",
            marginTop: "-1px",
          },
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            "& p": {
              fontSize: "0.7rem",
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
            fontSize: "0.9rem",
          },
          root: {
            background: "transparent !important",
            fontSize: "0.8rem",
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontSize: "0.8rem",
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
            zIndex: 999,
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
            fontSize: "0.8rem",
          },
          popper: {
            "& .MuiAutocomplete-option:hover": {
              backgroundColor: `${dColor}85 !important`,
              color: "black",
            },
            "& .MuiAutocomplete-option:focused": {
              backgroundColor: `${dColor} !important`,
              color: "white",
            },
            '& .MuiAutocomplete-option[aria-selected="true"]': {
              backgroundColor: `${dColor} !important`,
              color: "white",
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontSize: "0.775rem !important",
            marginTop: "-1px",
          },
          shrink: {
            fontSize: "0.775rem !important",
            lineHeight: "2.2 !important",
            letterSpacing: "0.5px",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            height: "35px !important",
          },
          input: {
            marginTop: "-1px",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            margin: "4px 0px",
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
