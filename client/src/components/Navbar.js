import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Link,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { HomeTwoTone } from "@mui/icons-material";
import Auth from "../utils/auth";

export default function Navbar() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Button color="inherit" href="/" sx={{ flexGrow: 1 }}>
            Pet Portal
          </Button>
          {Auth.loggedIn() ? (
            <>
              <Button color="inherit" href="/">
                <HomeTwoTone />
              </Button>
              <Button
                color="inherit"
                href={`/profile/${Auth.getProfile().data.username}`}
              >
                Profile
              </Button>
              <Button color="inherit" href="/" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" href="/">
                <HomeTwoTone />
              </Button>
              <Button color="inherit" href="/signup">
                Signup
              </Button>
              <Button color="inherit" href="/login">
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
