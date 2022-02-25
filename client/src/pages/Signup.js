import React from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  InputAdornment,
  TextField,
  Grid,
  Stack,
  IconButton,
  Button,
} from "@mui/material";
import {
  AccountCircleTwoTone,
  EmailTwoTone,
  PasswordTwoTone,
  CreateTwoTone,
  PhoneTwoTone,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { SIGNUP } from "../utils/mutations";

export default function Signup() {
  // sets initial values for email, username, & password inputs, & password status
  const [values, setValues] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
    showPassword: false,
  });

  // useMutation hook - creates mutate function (signup) and object representing current status of mutation execution
  const [signup, { loading, error }] = useMutation(SIGNUP);

  // on change, const values is updated to TextField's current value
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    // console.log(values);
  };

  // Once Visibility icon is clicked, setter updates showPassword property to opposite boolean
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Once Submit button is clicked, ...........
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return `Submitting...`;
    if (error) return `Submission failed: ${error.message}`;

    try {
      // runs mutation function, setting values from TextFields as variables to data object
      const { data } = await signup({
        variables: { ...values },
      });
      // sets token for user in local storage
      Auth.login(data.signup.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        m={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {/* <CreateTwoTone fontSize="medium" /> */}
        <TextField
          required
          label="First Name"
          value={values.firstName}
          onChange={handleChange("firstName")}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="name icon" edge="end">
                  <CreateTwoTone fontSize="medium" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        m={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {/* <CreateTwoTone fontSize="medium" /> */}
        <TextField
          required
          label="Last Name"
          value={values.lastName}
          onChange={handleChange("lastName")}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="name icon" edge="end">
                  <CreateTwoTone fontSize="medium" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        m={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {/* <EmailTwoTone fontSize="medium" /> */}
        <TextField
          required
          label="Email"
          value={values.email}
          onChange={handleChange("email")}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="email icon" edge="end">
                  <EmailTwoTone fontSize="medium" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        m={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {/* <PhoneTwoTone fontSize="medium" /> */}
        <TextField
          required
          label="Phone Number"
          value={values.phoneNumber}
          onChange={handleChange("phoneNumber")}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="phone icon" edge="end">
                  <PhoneTwoTone fontSize="medium" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        m={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {/* <AccountCircleTwoTone fontSize="medium" /> */}
        <TextField
          required
          label="Username"
          value={values.username}
          onChange={handleChange("username")}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="username icon" edge="end">
                  <AccountCircleTwoTone fontSize="medium" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        m={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TextField
          required
          label="Password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        m={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Button
          color="primary"
          size="large"
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Stack>
    </>
  );
}
