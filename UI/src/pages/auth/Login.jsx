import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, useMediaQuery } from "@mui/material";
import { GlassBG, MyHeading } from "../../components/custom";
import { useNavigate } from "react-router-dom";
import { postData } from "../../helpers/http";
import { infoAlert, successAlert } from "../../helpers";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/slices/userDetailsSlice";
import useNotification from "../../hooks/useCustomNotification";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lessThanMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ userId, password }) => {
    const loginObj = {
      userId: userId,
      userPassword: password,
    };
    const response = await postData("/auth/login", loginObj, "Logging in...");
    dispatch(setUserDetails(response?.token));
    infoAlert(showGreeting());
    localStorage.setItem("authToken", response?.token);
    navigate("/pages/home");
  };

  function showGreeting() {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning...!";
    } else if (currentHour >= 12 && currentHour < 17) {
      return "Good Afternoon...!";
    } else if (currentHour >= 17 && currentHour < 21) {
      return "Good Evening...!";
    } else {
      return "Good Night...!";
    }
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GlassBG
        cardStyles={{ width: lessThanMd ? "90%" : "300px", height: "auto" }}
      >
        <MyHeading
          alignCenter
          text="Login"
          variant="h5"
          sx={{ mb: 1, mt: -1 }}
        />
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <TextField
            {...register("userId", { required: "User ID is required" })}
            label="User ID"
            fullWidth
            margin="normal"
            size="small"
            error={!!errors.userId}
            autoComplete="off"
            helperText={errors.userId ? errors.userId.message : ""}
          />

          <TextField
            {...register("password", { required: "Password is required" })}
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            size="small"
            autoComplete="off"
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
          />

          <Button type="submit" variant="outlined" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </GlassBG>
    </Box>
  );
};

export default Login;
