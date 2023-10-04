import * as React from 'react';
import { AppBar, Box, Toolbar, Container } from '@mui/material';

import { makeStyles } from '@material-ui/core/styles';

import { SettingsMenu } from './SettingsMenu';
import { DesktopMenu } from './DeskopMenu';
import { MobileMenu } from './MobileMenu';
import { UserAvatar } from './UserAvatar';

const useStyles = makeStyles(() => ({
  appBar: {
    height: '8vh',
  },
  userAvatar: {
    background: 'white',
    color: 'red',
  },
}));

const Header: React.FC = () => {
  const classes = useStyles();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
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
    <AppBar position='static' className={classes.appBar}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <MobileMenu anchorElNav={anchorElNav} handleOpenNavMenu={handleOpenNavMenu} handleCloseNavMenu={handleCloseNavMenu} />
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
