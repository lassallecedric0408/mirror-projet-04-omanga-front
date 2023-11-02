import React from "react";
import { NavLinks } from "./NavLinks";

import { Typography, Box } from "@mui/material";

import logo from "../../assets/logo.png";

type DesktopMenuProps = {
  handleCloseNavMenu: () => void;
};

const DesktopMenu: React.FC<DesktopMenuProps> = ({ handleCloseNavMenu }) => {
  return (
    <>
      <Typography
        variant="h5"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        <img src={logo} alt="Logo" width="130" />
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        <NavLinks handleCloseNavMenu={handleCloseNavMenu} state="desktop" />
      </Box>
    </>
  );
};

export { DesktopMenu };
