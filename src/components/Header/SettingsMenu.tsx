import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useOmangaContex } from '../../context/OmangaContext';

import { materialUITheme } from '../../utils/materialUITheme';

const settings = [
  { name: 'Mon compte', link: '/account' },
  { name: 'Déconnexion', link: '/' },
  { name: 'Inscription', link: '/signup' },
  { name: 'Connexion', link: '/login' },
];

interface SettingsLinksProps {
  anchorElUser: null | HTMLElement;
  setAnchorElUser: (value: null | HTMLElement) => void;
}

const SettingsMenu: React.FC<SettingsLinksProps> = ({ anchorElUser, setAnchorElUser }) => {

  const { dispatch, OmangaState } = useOmangaContex();
  const { user, isLogged } = OmangaState;


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDisconnectUser = () => {
    dispatch({ type: 'SET_USER_IS_LOGGED', userIsLogged: false });
  };

  return (
    <>
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
    </>
  );
};

export { SettingsMenu };