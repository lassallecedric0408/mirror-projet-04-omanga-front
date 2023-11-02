import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { redirect } from 'react-router';
import { useQuery } from 'react-query';

import { getAdminDashBoard } from '../../services/admin';
import { materialUITheme } from '../../utils/materialUITheme';

import {
  Grid,
  Stack,
  Paper,
  Badge,
  Box,
  useTheme,
  CircularProgress,
} from '@mui/material';
import useAuthStore from '../../states/OmangaStore';

const DashBoardView: React.FC = () => {
  const theme = useTheme();

  const user = useAuthStore((state) => state.user);

  const { data, isLoading, error } = useQuery({
    queryKey: ['getDashBoard', user],
    queryFn: () => getAdminDashBoard(user.user.email),
  });

  const dashboardItem = [
    {
      name: 'Réservations',
      number: data?.data.orders.length,
      link: '/bookingstable',
    },
    {
      name: 'Produits',
      number: data?.data.products.length,
      link: '/productstable',
    },
    {
      name: 'Utilisateurs',
      number: data?.data.users.length,
      link: '/userstable',
    },
    {
      name: ' Univers',
      number: data?.data.universes.length,
      link: '/universestable',
    },
    {
      name: 'Catégories',
      number: data?.data.categories.length,
      link: '/categoriestable',
    },
  ];

  if (isLoading) {
    return (
      <div
        style={{
          height: '77vh',
          width: '80%',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    redirect('/error');
  }

  return (
    <>
      <Box
        component='div'
        sx={{
          height: '77vh',
          width: '80%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Grid
          item
          sx={{
            height: '10vh',
            fontSize: '1.6rem',
            color: `${materialUITheme.palette.primary.main}`,
            [theme.breakpoints.down('md')]: {
              fontSize: '1.4rem',
              height: '5vh',
            },
            [theme.breakpoints.down('sm')]: {
              display: 'none',
            },
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <p>Tableau de bord O'manga </p>
        </Grid>
        <Grid
          container
          spacing={7}
          sx={{
            height: '67vh',
            paddingTop: '3rem',
            paddingBottom: '3rem',
            [theme.breakpoints.down('md')]: {
              paddingTop: '3rem',
              paddingBottom: '1rem',
              height: '72vh',
            },
            [theme.breakpoints.down('sm')]: {
              paddingTop: '1rem',
              paddingBottom: '1rem',
              height: '75vh',
            },
          }}
        >
          {dashboardItem.map((item, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <RouterLink
                  to={item.link}
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <Paper
                    sx={{ p: 2 }}
                    elevation={3}
                    style={{
                      height: '100%',
                      width: '100%',
                      border: `0.1rem solid ${materialUITheme.palette.primary.main}`,
                      borderRadius: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Stack
                      spacing={5}
                      direction='row'
                      sx={{
                        fontSize: '2rem',
                        color: `${materialUITheme.palette.primary.main}`,
                      }}
                    >
                      <Badge badgeContent={item.number} color='primary'>
                        <p>{item.name}</p>
                      </Badge>
                    </Stack>
                  </Paper>
                </RouterLink>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export { DashBoardView };
