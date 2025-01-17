import React from "react";
import { BlobProvider } from "@react-pdf/renderer";
import { Box, Button, useTheme } from "@mui/material";
import IconWrapper from "../custom/IconWrapper";
import { FaDownload } from "react-icons/fa";
import { IoMdOpen } from "react-icons/io";

const PDFGenerator = ({ document = <></>, fileName = "sample.pdf" }) => {
  const theme = useTheme();
  const minWidth = "auto";
  return (
    <div>
      <BlobProvider document={document}>
        {({ blob, url }) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 1,
              position: "relative",
            }}
          >
            <a
              href={url}
              download={fileName}
              style={{
                padding: "8px 16px",
                border: `0.25px dashed ${theme.palette.primary.main}`,
                minWidth: minWidth,
                borderRadius: "8px",
                color: theme.palette.primary.main,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textDecoration: "none",
                flexWrap: "nowrap",
                textWrap: "nowrap",
                fontSize: "14px",
                minHeight: "auto",
              }}
            >
              <IconWrapper
                defaultColor
                icon={
                  <FaDownload
                    style={{ fontSize: "13px", paddingRight: "5px" }}
                  />
                }
              />
              Download
            </a>
            <Button
              size="small"
              variant="outlined"
              fullWidth
              sx={{
                minWidth: minWidth,
                border: `0.25px dashed ${theme.palette.primary.main}`,
                minHeight: "auto",
              }}
              onClick={() => window.open(url, "_blank")}
            >
              <IconWrapper
                defaultColor
                icon={
                  <IoMdOpen
                    style={{
                      fontSize: "15px",
                      paddingRight: "5px",
                      paddingTop: "4px",
                    }}
                  />
                }
              />
              Open in New Tab
            </Button>
          </Box>
        )}
      </BlobProvider>
    </div>
  );
};

export default PDFGenerator;
