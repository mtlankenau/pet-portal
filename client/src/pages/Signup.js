import React from "react";
import {
  Box,
  InputAdornment,
  TextField,
  Stack,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import {
  AccountCircleTwoTone,
  EmailTwoTone,
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

  const formData = [
    {
      value: "First Name",
      useStateKey: "firstName",
      useStateValue: values.firstName,
      icon: <CreateTwoTone fontSize="medium" />,
    },
    {
      value: "Last Name",
      useStateKey: "lastName",
      useStateValue: values.lastName,
      icon: <CreateTwoTone fontSize="medium" />,
    },
    {
      value: "Email",
      useStateKey: "email",
      useStateValue: values.email,
      icon: <EmailTwoTone fontSize="medium" />,
    },
    {
      value: "Phone Number",
      useStateKey: "phoneNumber",
      useStateValue: values.phoneNumber,
      icon: <PhoneTwoTone fontSize="medium" />,
    },
    {
      value: "Username",
      useStateKey: "username",
      useStateValue: values.username,
      icon: <AccountCircleTwoTone fontSize="medium" />,
    },
  ];

  return (
    <Box sx={{ mx: "auto", width: "50%" }}>
      <Stack spacing={2} m={2}>
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          textAlign="center"
        >
          Signup
        </Typography>
      </Stack>
      {formData.map((item) => (
        <Stack key={item.value} spacing={2} m={2}>
          <TextField
            key={item.value}
            required
            label={item.value}
            value={item.useStateValue}
            onChange={handleChange(item.useStateKey)}
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="name icon" edge="end">
                    {item.icon}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      ))}

      <Stack spacing={2} m={2}>
        <TextField
          required
          label="Password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          fullWidth
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

      <Stack spacing={2} m={2}>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );
}
