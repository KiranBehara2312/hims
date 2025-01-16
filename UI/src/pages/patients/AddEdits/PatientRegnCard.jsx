import { Box, Button } from "@mui/material";
import React from "react";
import { getData } from "../../../helpers/http";
import IconWrapper from "../../../components/custom/IconWrapper";
import { FaPrint } from "react-icons/fa";
import HeaderWithSearch from "../../../components/custom/HeaderWithSearch";

const PatientRegnCard = ({
  dialogCloseBtn = null,
  setShowDialog = () => {},
  headerText = "Add Vitals",
  selectedPatient = null,
  action = null,
}) => {
    const downloadCard = async () => {
        try {
          const response = await getData("/patients/pdf", {
            Accept: "application/pdf",
            "Content-Type": "application/pdf",
            "Accept": "application/pdf",
          });
      
          // Ensure that the response is in the correct format (as a Blob)
          if (response instanceof Blob) {
            // Create a temporary URL for the Blob object
            const url = window.URL.createObjectURL(response);
      
            // Create a temporary <a> element to trigger the download
            const a = document.createElement("a");
            a.href = url;
            a.download = "generated-document.pdf"; // Specify the default file name
            document.body.appendChild(a);
            a.click(); // Trigger the download
            document.body.removeChild(a); // Clean up the temporary <a> element
      
            // Release the object URL after the download
            window.URL.revokeObjectURL(url);
          } else {
            console.error("Error: Response is not a Blob.");
          }
        } catch (error) {
          console.error("Error downloading the PDF:", error);
        }
      };
      
  return (
    <>
      <HeaderWithSearch
        hideSearchBar
        notScrollable
        headerIcon={<IconWrapper defaultColor icon={<FaPrint size={20} />} />}
        headerText={headerText}
        html={<>{dialogCloseBtn}</>}
      />
      <Box sx={{ pt: "40px", mt:2 }}>
        <Button
          variant="outlined"
          fullWidth
          size="small"
          onClick={downloadCard}
        >
          Download Patient Registration Card
        </Button>
      </Box>
    </>
  );
};

export default PatientRegnCard;
