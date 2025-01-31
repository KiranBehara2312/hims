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
      fontFamily: '"Helvetica", "Arial", "sans-serif"',
      h1: {
        fontSize: "0.4rem",
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: "0.5px",
      },
      h2: {
        fontSize: "0.4rem",
        fontWeight: 700,
        lineHeight: 1.3,
      },
      h3: {
        fontSize: "0.4rem",
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h4: {
        fontSize: "0.4rem",
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: "0.4rem",
        fontWeight: 500,
        lineHeight: 1.5,
      },
      h6: {
        fontSize: "0.4rem",
        fontWeight: 500,
        lineHeight: 1.6,
      },
      body1: {
        fontSize: "0.4rem",
        fontWeight: 400,
        lineHeight: 1.5,
      },
      body2: {
        fontSize: "0.4rem",
        fontWeight: 400,
        lineHeight: 1.4,
      },
      caption: {
        fontSize: "0.4rem",
        fontWeight: 400,
        lineHeight: 1.3,
      },
      subCaption2: {
        fontSize: "0.4rem",
        fontWeight: 400,
        lineHeight: 1.3,
      },
      subCaption: {
        fontSize: "0.4rem",
        fontWeight: 400,
        lineHeight: 1.3,
      },
      subtitle1: {
        fontSize: "1.4rem",
        fontWeight: 400,
        lineHeight: 1.4,
      },
      subtitle2: {
        fontSize: "0.4rem",
        fontWeight: 400,
        lineHeight: 1.5,
      },
      overline: {
        fontSize: "0.4rem",
        fontWeight: 400,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
      },
      button: {
        fontSize: "0.4rem",
        fontWeight: 500,
        textTransform: "uppercase",
      },

      rem25: {
        fontSize: "2.5rem",
        fontWeight: 500,
        lineHeight: 1.5,
      },
      rem3: {
        fontSize: "3rem",
        fontWeight: 500,
        lineHeight: 1.5,
      },
      rem2: {
        fontSize: "2rem",
        fontWeight: 500,
        lineHeight: 1.5,
      },
      rem15: {
        fontSize: "1.5rem",
        fontWeight: 500,
        lineHeight: 1.5,
      },
      rem095: {
        fontSize: "0.95rem",
        fontWeight: 600,
        lineHeight: 1.4,
      },
      rem085: {
        fontSize: "0.85rem",
        fontWeight: 400,
        lineHeight: 1.4,
      },
      rem075: {
        fontSize: "0.75rem",
        fontWeight: 400,
        lineHeight: 1.3,
      },
      rem065: {
        fontSize: "0.65rem",
        fontWeight: 400,
        lineHeight: 1.3,
      },
      rem055: {
        fontSize: "0.55rem",
        fontWeight: 400,
        lineHeight: 1.3,
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
            fontSize: "0.65rem !important",
            borderRadius: "50%",
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: dColor,
            color: "#fff",
            fontSize: "0.65rem",
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
            marginTop: "-0.5px",
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
            fontSize: "0.85rem",
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
            fontSize: "0.85rem",
          },
          root: {
            background: "transparent !important",
            fontSize: "0.85rem",
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontSize: "0.75rem",
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
            fontSize: "0.75rem",
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
            fontSize: "0.75rem !important",
            marginTop: "-1px",
          },
          shrink: {
            fontSize: "0.7rem !important",
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
              fontSize: "0.75rem",
              padding: "0 0",
            },
            "& .MuiFormLabel-root": {
              fontSize: "0.5rem",
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
            fontSize: "0.75rem",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            textTransform: "capitalize",
            fontSize: "0.75rem",
            maxHeight: "20px",
            height: "20px",
          },
        },
      },
    },
  });

  return theme;
};

export default useCustomTheme;
