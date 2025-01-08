import { Backdrop, CircularProgress, Paper } from "@mui/material";
import "./base.css";
import { useSelector } from "react-redux";
import { MyHeading } from "../../components/custom";

const BaseLayout = ({ children }) => {
  const loader = useSelector((state) => state.loader);
  return (
    <Paper
      sx={{
        height: "100vh",
        width: "100vw",
        overflowY: "hidden",
        overflowX: "auto",
      }}
    >
      {loader?.value && (
        <Backdrop
          sx={(theme) => ({
            zIndex: theme.zIndex.drawer + 100,
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
