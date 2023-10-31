import React from 'react';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useOmangaContex } from '../../context/OmangaContext';

import { materialUITheme } from '../../utils/materialUITheme';
import useAuthStore from '../../states/OmangaStore';

const pages = [
  { name: 'Acceuil', link: '/' },
  { name: 'Produits', link: '/products' },
  { name: 'Nous contacter', link: '/contactUs' },
];
interface NavLinksProps {
  handleCloseNavMenu: () => void;
  state: 'mobile' | 'desktop';
}

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
            Tableaud de bord
          </RouterLink>
        </Button>
      )}
    </>
  );
};

export { NavLinks };
