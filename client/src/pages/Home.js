import React from "react";
import { Box, Typography } from "@mui/material";
import Auth from "../utils/auth";

export default function Home() {
  return (
    // <div>Home</div>
    <Box sx={{ flexGrow: 1 }} textAlign="center" m={2}>
      {Auth.loggedIn() ? (
        <Typography variant="h2" gutterBottom component="div">
          Welcome back {Auth.getProfile().data.username}!
        </Typography>
      ) : (
        <Typography variant="h2" gutterBottom component="div">
          Home - Please login to get started!
        </Typography>
      )}
    </Box>
  );
}
