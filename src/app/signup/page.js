"use client";
import GlobalButton from "@/components/globalButton";
import TextInput from "@/components/textInput";
import { primaryColor } from "@/constants";
import app from "@/firebase";
import { checkValidEmail, openSnackAlert } from "@/helper";
import { setUserData } from "@/redux/slices/Authentication";
import { Box, Container, Grid, Typography } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SignUp = () => {
  const { userData } = useSelector((state) => state.AuthenticationSlice);
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const [inputValues, setInputValues] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userData) router.push("/");
  }, [userData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    if (inputValues.fullName == "") {
      openSnackAlert("Name is required", "error");
    } else if (inputValues.email == "") {
      openSnackAlert("Email is required", "error");
    } else if (!checkValidEmail(inputValues.email)) {
      openSnackAlert("Email format is incorrect", "error");
    } else if (inputValues.password == "") {
      openSnackAlert("Password is required", "error");
    } else {
      createUserWithEmailAndPassword(
        auth,
        inputValues.email,
        inputValues.password
      )
        .then((userCredential) => {
          const user = userCredential.user;
          let firebaseUser = auth.currentUser;
          updateProfile(firebaseUser, {
            displayName: inputValues.fullName,
          });
          openSnackAlert("User registered successfully", "success");
          dispatch(
            setUserData({
              email: user.email,
              userName: inputValues.fullName,
              id: user.uid,
            })
          );
          router.push("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          openSnackAlert(errorMessage, "error");
        });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container
        sx={{
          background: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          borderRadius: "10px",
          maxWidth: "390px !important",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          padding: "24px",
        }}
      >
        <Typography
          variant={"h2"}
          fontSize={30}
          fontWeight={700}
          marginRight={"auto"}
          color="black"
        >
          SignUp
        </Typography>
        <Typography
          variant={"body1"}
          fontSize={14}
          marginRight={"auto"}
          color="black"
        >
          Welcome back! Please signup to continue.
        </Typography>
        <Grid container mt={3} spacing={2}>
          <Grid item xs={12}>
            <TextInput
              fullwidth
              inputType={"text"}
              placeholder={"Enter your full name"}
              name={"fullName"}
              value={inputValues.fullName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              fullwidth
              inputType={"text"}
              placeholder={"Enter your email"}
              name={"email"}
              value={inputValues.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              fullwidth
              placeholder={"Enter your password"}
              inputType={"password"}
              name={"password"}
              value={inputValues.password}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <div style={{ marginTop: "10px", width: "100%", textAlign: "center" }}>
          <GlobalButton
            title="SignUp"
            style={{
              padding: "8px 30px",
              background: primaryColor,
              textTransform: "capitalize",
            }}
            handleClickBtn={handleLogin}
          />
        </div>

        <Typography
          variant={"body1"}
          fontSize={14}
          color="black"
          textAlign={"center"}
          mt={2}
        >
          Already have an account?{" "}
          <Link
            style={{ color: "blue", textDecorationLine: "underline" }}
            href={"/login"}
          >
            Login
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default SignUp;
