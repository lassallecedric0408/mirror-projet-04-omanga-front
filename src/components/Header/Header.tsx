import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../assets/logo.png';
import { materialUITheme } from '../../utils/materialUITheme';
import { Link as RouterLink } from 'react-router-dom';
import { useOmangaContex } from '../../context/OmangaContext';

const pages = [
  { name: 'Acceuil', link: '/' },
  { name: 'Produits', link: '/products' },
  { name: 'Nous contacter', link: '/contactUs' },
];
const settings = [
  { name: 'Mon compte', link: '/account' },
  { name: 'Déconnexion', link: '/' },
  { name: 'Inscription', link: '/signup' },
  { name: 'Connexion', link: '/login' },
];

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

  const { OmangaState, dispatch } = useOmangaContex();
  const { isLogged, isAdmin } = OmangaState;
  console.log(isLogged, 'isLogged');
  console.log(isAdmin, 'isAdmin');
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

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDisconnectUser = () => {
    dispatch({ type: 'SET_USER_IS_LOGGED', userIsLogged: false });
  };

  return (
    <AppBar position='static' className={classes.appBar}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='a'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={logo} alt='' width='130' />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  <RouterLink
                    to={page.link}
                    style={{
                      color: `${materialUITheme.palette.primary.main}`,
                      textDecoration: 'none',
                      fontSize: '1.1rem',
                      fontWeight: '500',
                      fontFamily: 'Caveat',
                    }}
                  >
                    {page.name}
                  </RouterLink>
                </Button>
              ))}
              {isAdmin && (
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  <RouterLink
                    to="/dashboard"
                    style={{
                      color: `${materialUITheme.palette.primary.main}`,
                      textDecoration: 'none',
                      fontSize: '1.1rem',
                      fontWeight: '500',
                      fontFamily: 'Caveat',
                    }}
                  >
                    Tableaud de bord
                  </RouterLink>
                </Button>
              )}
            </Menu>
          </Box>
          <Typography
            variant='h5'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={logo} alt='Logo' width='130' />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <RouterLink
                  to={page.link}
                  style={{
                    color: `${materialUITheme.palette.secondary.main}`,
                    textDecoration: 'none',
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    fontFamily: 'Caveat',
                  }}
                >
                  {page.name}
                </RouterLink>
              </Button>
            ))}
            {isAdmin && (
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <RouterLink
                  to="/dashboard"
                  style={{
                    color: `${materialUITheme.palette.primary.main}`,
                    textDecoration: 'none',
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    fontFamily: 'Caveat',
                  }}
                >
                  Tableaud de bord
                </RouterLink>
              </Button>
            )}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  style={{
                    backgroundColor: `${materialUITheme.palette.secondary.main}`,
                    color: `${materialUITheme.palette.primary.main}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  TO
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isLogged ? (
                <>
                  <MenuItem>
                    <RouterLink
                      to={settings[0].link}
                      style={{
                        color: `${materialUITheme.palette.primary.main}`,
                        textDecoration: 'none',
                        fontSize: '1.2rem',
                        fontWeight: '500',
                        fontFamily: 'Caveat',
                      }}
                    >
                      {settings[0].name}
                    </RouterLink>
                  </MenuItem>
                  <MenuItem onClick={handleDisconnectUser}>
                    <RouterLink
                      to={settings[1].link}
                      style={{
                        color: `${materialUITheme.palette.primary.main}`,
                        textDecoration: 'none',
                        fontSize: '1.2rem',
                        fontWeight: '500',
                        fontFamily: 'Caveat',
                      }}
                    >
                      {settings[1].name}
                    </RouterLink>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem>
                    <RouterLink
                      to={settings[2].link}
                      style={{
                        color: `${materialUITheme.palette.primary.main}`,
                        textDecoration: 'none',
                        fontSize: '1.2rem',
                        fontWeight: '500',
                        fontFamily: 'Caveat',
                      }}
                    >
                      {settings[2].name}
                    </RouterLink>
                  </MenuItem>
                  <MenuItem>
                    <RouterLink
                      to={settings[3].link}
                      style={{
                        color: `${materialUITheme.palette.primary.main}`,
                        textDecoration: 'none',
                        fontSize: '1.2rem',
                        fontWeight: '500',
                        fontFamily: 'Caveat',
                      }}
                    >
                      {settings[3].name}
                    </RouterLink>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export { Header };
