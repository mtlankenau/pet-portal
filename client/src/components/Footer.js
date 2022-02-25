import React from "react";
import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    // <div>Footer</div>
    <Box sx={{ flexGrow: 1 }} textAlign="center" m={2}>
      <Typography variant="h5" gutterBottom component="div">
        Created by:
      </Typography>
      <Link href="https://github.com/mtlankenau" target="_blank">
        Michael Lankenau
      </Link>
    </Box>
  );
}
