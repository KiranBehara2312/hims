import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import { GlassBG, MyHeading } from "../../components/custom";
import { formatDate, setUserInfoInSStorage } from "../../helpers";
import { useNavigate } from "react-router-dom";
import { REGEX_PATTERNS } from "../../constants/Regex";
import { postData } from "../../helpers/http";

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ firstName, lastName, contactNumber, password }) => {
    const newUser = {
      firstName,
      lastName,
      password,
      contactNumber,
    };
    const response = await postData("/auth/register", newUser);
    navigate("/auth/login");
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
      <GlassBG cardStyles={{ width: "300px", height: "auto" }}>
        <MyHeading alignCenter text="Signup/ Register" variant="rem095" sx={{mb:1, mt:-1}} />

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <TextField
            {...register("firstName", { required: "First Name is required" })}
            label="First Name"
            fullWidth
            margin="normal"
            size="small"
            error={!!errors.firstName}
            autoComplete="off"
            helperText={errors.firstName ? errors.firstName.message : ""}
          />
          <TextField
            {...register("lastName", { required: "Last Name is required" })}
            label="Last Name"
            fullWidth
            margin="normal"
            size="small"
            error={!!errors.lastName}
            autoComplete="off"
            helperText={errors.lastName ? errors.lastName.message : ""}
          />

          <TextField
            {...register("contactNumber", {
              required: "Contact No is required",
              pattern: {
                value: REGEX_PATTERNS.mobileNumber,
                message: "Invalid mobile number",
              },
            })}
            type="text"
            label="Contact No"
            fullWidth
            placeholder=""
            margin="normal"
            size="small"
            autoComplete="off"
            error={!!errors.contactNumber}
            helperText={
              errors.contactNumber ? errors.contactNumber.message : ""
            }
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

          {/* Submit Button */}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Register / SignUp
          </Button>
          <Button
            type="button"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => navigate("/auth/login")}
          >
            Already registered? click here to Login
          </Button>
        </form>
      </GlassBG>
    </Box>
  );
};

export default SignUp;
