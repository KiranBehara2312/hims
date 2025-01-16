import { Box } from "@mui/material";
import React from "react";
import "../../styles/glassmorphism.css";
import PropTypes from "prop-types";

const GlassBG = ({
  cardStyles = { height: "auto", width: "auto", p: 1, borderRadius: "10px" },
  styles = {},
  children,
}) => {
  const defaultStyles = {
    p: 2,
    borderRadius: "10px",
    // boxShadow:
    //   "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
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
