import { Backdrop, CircularProgress, Paper } from "@mui/material";
import "./base.css";
import { useSelector } from "react-redux";
import { MyHeading } from "../../components/custom";
import { useEffect } from "react";
import { META } from "../../constants/projects";

const BaseLayout = ({ children }) => {
  const loader = useSelector((state) => state.loader);
  useEffect(() => {
    document.title = `HIMS | ${META.PROJECT_TITLE}`;
  }, []);
  return (
    <Paper
      sx={{
        height: "100vh",
        width: "100vw",
        overflowY: "hidden",
        overflowX: "auto",
        background: "whitesmoke",
      }}
    >
      {loader?.value && (
        <Backdrop
          sx={(theme) => ({
            zIndex: theme.zIndex.drawer + 1000,
            background: "#000000b3",
          })}
          open={true}
        >
          <CircularProgress sx={{ color: "whitesmoke" }} size={50} />
          <MyHeading
            variant="h6"
            sx={{ pl: 2, color: "white" }}
            text={loader?.message}
          />
        </Backdrop>
      )}
      {children}
    </Paper>
  );
};

export default BaseLayout;
