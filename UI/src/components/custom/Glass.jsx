import { Box, useTheme } from "@mui/material";
import React from "react";
import "../../styles/glassmorphism.css";
import PropTypes from "prop-types";

const GlassBG = ({
  cardStyles = { height: "auto", width: "auto", p: 1, borderRadius: "10px" },
  styles = {},
  children,
}) => {
  const theme = useTheme();
  const defaultStyles = {
    p: "16px 8px !important",
    borderRadius: "10px",
    border: `0.5px dotted ${theme.palette.primary.main} !important`,
  };
  return (
    <Box
      className="glass"
      sx={{ ...cardStyles, ...defaultStyles }}
      style={styles}
    >
      {children}
    </Box>
  );
};

GlassBG.propTypes = {
  children: PropTypes.node.isRequired,
  cardStyles: PropTypes.object,
};
export default GlassBG;
