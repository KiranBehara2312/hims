import {
  Backdrop,
  Box,
  CircularProgress,
  Paper,
  useTheme,
} from "@mui/material";
import "./base.css";
import { useSelector } from "react-redux";

const BaseLayout = ({ children }) => {
  const loader = useSelector((state) => state.loader.value);
  const theme = useTheme();
  return (
    <Paper
      sx={{
        height: "100vh",
        width: "100vw",
        overflowY: "hidden",
        overflowX: "auto",
      }}
    >
      {loader && (
        <Backdrop
          sx={(theme) => ({
            zIndex: theme.zIndex.drawer + 1,
          })}
          open={true}
        >
          <CircularProgress
            sx={{ color: theme.palette.primary.main }}
            size={100}
          />
        </Backdrop>
      )}
      {children}
    </Paper>
  );
};

export default BaseLayout;
