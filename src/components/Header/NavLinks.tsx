import React from 'react';
import useAuthStore from '../../states/OmangaStore';
import { Link as RouterLink } from 'react-router-dom';

import { Button } from '@mui/material';
import { materialUITheme } from '../../utils/materialUITheme';

const pages = [
  { name: 'Acceuil', link: '/' },
  { name: 'Produits', link: '/products' },
  { name: 'Nous contacter', link: '/contactUs' },
];

type NavLinksProps = {
  handleCloseNavMenu: () => void;
  state: 'mobile' | 'desktop';
};

const NavLinks: React.FC<NavLinksProps> = ({ handleCloseNavMenu, state }) => {
  const isAdmin = useAuthStore((state) => state.isAdmin);

  return (
    <>
      {pages.map((page) => (
        <Button
          key={page.name}
          onClick={handleCloseNavMenu}
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          <RouterLink
            to={page.link}
            style={{
              color: `${
                state === 'mobile'
                  ? materialUITheme.palette.primary.main
                  : materialUITheme.palette.secondary.main
              }`,
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
            to='/dashboard'
            style={{
              color: `${
                state === 'mobile'
                  ? materialUITheme.palette.primary.main
                  : materialUITheme.palette.secondary.main
              }`,
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: '500',
              fontFamily: 'Caveat',
            }}
          >
            Tableau de bord
          </RouterLink>
        </Button>
      )}
    </>
  );
};

export { NavLinks };
