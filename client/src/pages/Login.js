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
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

export default function Login() {
  // sets initial values for email, username, & password inputs, & password status
  const [values, setValues] = React.useState({
    email: "",
    username: "",
    password: "",
    showPassword: false,
  });

  // useMutation hook - creates mutate function (login) and object representing current status of mutation execution
  const [login, { loading, error }] = useMutation(LOGIN_USER);

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
      const { data } = await login({
        variables: { ...values },
      });
      // sets token for user in local storage
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box sx={{ mx: "auto", width: "50%" }}>
      <Stack spacing={2} m={2}>
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          textAlign="center"
        >
          Login
        </Typography>
      </Stack>

      <Stack spacing={2} m={2}>
        <TextField
          required
          label="Username"
          value={values.username}
          onChange={handleChange("username")}
          variant="outlined"
          fullWidth="true"
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

      <Stack spacing={2} m={2}>
        <TextField
          required
          label="Password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          fullWidth="true"
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

      {/* <Grid container spacing={1} m={2}>
        <Grid item alignSelf="center">
          <EmailTwoTone fontSize="medium" />
        </Grid>
        <Grid item>
          <TextField required label="Email" variant="outlined" />
        </Grid>
      </Grid>

      <Grid container spacing={1} textAlign="center" m={2}>
        <Grid item alignSelf="center">
          <AccountCircleTwoTone fontSize="medium" />
        </Grid>
        <Grid item>
          <TextField required label="Username" variant="outlined" />
        </Grid>
      </Grid>

      <Grid container spacing={1} textAlign="center" m={2}>
        <Grid item alignSelf="center">
          <PasswordTwoTone fontSize="medium" />
        </Grid>
        <Grid item>
          <TextField required label="Password" variant="outlined" />
        </Grid>
      </Grid> */}

      {/* <Box textAlign="center">
        <TextField
          sx={{ m: 5 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailTwoTone />
              </InputAdornment>
            ),
          }}
          required
          label="Email"
          variant="outlined"
        />
      </Box>
      <Box>
        <TextField
          sx={{ m: 5 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleTwoTone />
              </InputAdornment>
            ),
          }}
          required
          label="Username"
          variant="outlined"
          s
        />
      </Box>
      <Box>
        <TextField
          sx={{ m: 5 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PasswordTwoTone />
              </InputAdornment>
            ),
          }}
          required
          label="Password"
          variant="outlined"
        />
      </Box> */}
    </Box>
  );
}
