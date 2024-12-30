import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, useMediaQuery } from "@mui/material";
import { GlassBG, MyHeading } from "../../components/custom";
import { useNavigate } from "react-router-dom";
import { postData } from "../../helpers/http";
import { successAlert } from "../../helpers";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/slices/userDetailsSlice";
import { hideLoader, showLoader } from "../../redux/slices/loaderSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lessThanMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ userName, password }) => {
    const loginObj = {
      userName,
      password,
    };
    const response = await postData("/auth/login", loginObj);
    const welcomeMsg = `Welcome ${
      response?.user?.role === "DOCTOR" ? "Dr." : ""
    } ${response?.user?.firstName} ${response?.user?.lastName}`;
    successAlert(welcomeMsg, { autoClose: 1500 });
    dispatch(setUserDetails(response.token));
    localStorage.setItem("authToken", response.token);
    navigate("/pages/home");
  };

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
            {...register("userName", { required: "User Name is required" })}
            label="User Name"
            fullWidth
            margin="normal"
            size="small"
            error={!!errors.userName}
            autoComplete="off"
            helperText={errors.userName ? errors.userName.message : ""}
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

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
          <Button
            type="button"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => navigate("/auth/signup")}
          >
            Register? Click here
          </Button>
        </form>
      </GlassBG>
    </Box>
  );
};

export default Login;
