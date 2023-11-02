import * as React from "react";

import { SettingsMenu } from "./SettingsMenu";
import { DesktopMenu } from "./DeskopMenu";
import { MobileMenu } from "./MobileMenu";
import { UserAvatar } from "./UserAvatar";

import { AppBar, Box, Toolbar, Container } from "@mui/material";

const Header: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ height: "8vh" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MobileMenu
            anchorElNav={anchorElNav}
            handleOpenNavMenu={handleOpenNavMenu}
            handleCloseNavMenu={handleCloseNavMenu}
          />
          <DesktopMenu handleCloseNavMenu={handleCloseNavMenu} />
          <Box sx={{ flexGrow: 0 }}>
            <UserAvatar handleOpenUserMenu={handleOpenUserMenu} />
            <SettingsMenu
              anchorElUser={anchorElUser}
              setAnchorElUser={setAnchorElUser}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export { Header };
