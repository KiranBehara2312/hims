import { Tooltip } from "@mui/material";
import React from "react";

const MyTooltip = React.forwardRef(({ children, title = "" }, ref) => {
  return (
    <Tooltip
      title={
        title?.length > 0 ? (
          <div style={{ whiteSpace: "pre-line" }}>{title}</div>
        ) : (
          ""
        )
      } // Preserve newlines
      arrow
      ref={ref}
    >
      <span>{React.cloneElement(children, { ref })}</span>
    </Tooltip>
  );
});

export default MyTooltip;
