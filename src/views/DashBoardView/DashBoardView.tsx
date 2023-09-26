import React from 'react';
import { Grid, Stack, Paper, Badge, Box } from '@mui/material';
import { dashBoardViewStyle } from './dashBoardViewStyle';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = dashBoardViewStyle;

interface DashBoardViewProps { }

const DashBoardView: React.FC<DashBoardViewProps> = () => {

  const classes = useStyles();
  const dashboardItem = [
    { name: 'Réservations', number: 10, link: '/bookingstable' },
    { name: 'Produits', number: 10, link: '/productstable' },
    { name: 'Utilisateurs', number: 10, link: '/userstable' },
    { name: ' Univers', number: 10, link: '/universestable' },
    { name: 'Catégories', number: 10, link: '/categoriestable' },
  ];

  return (
    <>
      <Box component="div" className={classes.dashBoardView}>
        <Grid item className={`${classes.dashBoardTitle} ${classes.flexVertCenter}`}>
          <p>Tableau de bord O'manga </p>
        </Grid>
        <Grid container spacing={5} className={classes.dashBoardItemsContainer}>
          {dashboardItem.map((item, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <RouterLink to={item.link} className={`${classes.dashBoardItemLink}`}>
                  <Paper sx={{ p: 2 }} elevation={3} className={`${classes.dashBoardItem} ${classes.flexCenter}`}>
                    <Stack spacing={5} direction='row' className={`${classes.dashBoardItemTitle}`}>
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
