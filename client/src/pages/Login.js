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

export default function Login() {
  const [values, setValues] = React.useState({
    email: "",
    username: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    // console.log(values);
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(values);
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
        <EmailTwoTone fontSize="medium" />
        <TextField
          required
          label="Email"
          value={values.email}
          onChange={handleChange("email")}
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
        <AccountCircleTwoTone fontSize="medium" />
        <TextField
          required
          label="Username"
          value={values.username}
          onChange={handleChange("username")}
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
        <PasswordTwoTone fontSize="medium" />
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
        <Button size="large" variant="contained" onClick={handleSubmit}>
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
    </>
  );
}
