import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@mui/material/Link/Link';
import Typography from '@mui/material/Typography';

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import HomeIcon from '@mui/icons-material/Home';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#FF5959',
    color: theme.palette.primary.contrastText,
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '15vh',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  hideOnMobile: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const openingHoursData = [
  { day: 'Lun.', hours: '14:00 - 19:00 h' },
  { day: 'Mar.', hours: '11:00 - 17:00 h' },
  { day: 'Mer.', hours: '10:00 - 18:00 h' },
  { day: 'Jeu.', hours: '11:00 - 18:00 h' },
  { day: 'Ven.', hours: '10:00 - 19:00 h' },
  { day: 'Sam.', hours: 'Fermeture' },
  { day: 'Dim.', hours: 'Fermeture' },
];

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={6} md={3} className={classes.column}>
          <Typography style={{ marginBottom: '0.8rem', }}>Nos services</Typography>
          <Link href="#" color="secondary" underline='none' style={{ marginBottom: '0.5rem', fontSize: '0.7rem' }}>Nos Produits</Link>
          <Link href="#" color="secondary" underline='none' style={{ marginBottom: '0.5rem', fontSize: '0.7rem' }}>Votre compte</Link>
          <Link href="#" color="secondary" underline='none' style={{ marginBottom: '0.5rem', fontSize: '0.7rem' }}>FAQ / Mentions légales</Link>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={`${classes.column} ${classes.hideOnMobile}`}>
          <Typography style={{ marginBottom: '0.8rem', fontSize: '1rem' }}>Nos coordonnées</Typography>
          <Typography style={{ fontSize: '0.7rem' }}>
            <LocalPhoneIcon style={{ marginRight: '0.5rem', fontSize: '0.7rem' }} /> 01.18.46.96.34
          </Typography>
          <Typography style={{ fontSize: '0.7rem', textAlign: 'center' }}>
            <HomeIcon style={{ marginRight: '0.5rem', fontSize: '0.7rem' }} />
            50 rue du Château Saint-germain-en-laye <br />
            78100 Saint-germain-en-laye
          </Typography>
          <Typography style={{ fontSize: '0.7rem' }}>
            <AlternateEmailIcon style={{ marginRight: '0.5rem', fontSize: '0.7rem' }} /> contact@omanga.com
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={`${classes.column} ${classes.hideOnMobile}`}>
          <Typography style={{ marginBottom: '0.8rem', fontSize: '1rem' }} >Horaires d'ouverture</Typography>
          <Grid container>
            <Grid item xs={6} className={`${classes.column}`}>
              {openingHoursData.slice(0, 4).map((item, index) => (
                <p key={index} style={{ fontSize: '0.7rem', margin: '0.3rem' }}>{`${item.day} ${item.hours === 'closed' ? 'closed' : item.hours}`}</p>
              ))}
            </Grid>
            <Grid item xs={6} className={`${classes.column}`}>
              {openingHoursData.slice(4).map((item, index) => (
                <p key={index} style={{ fontSize: '0.7rem', margin: '0.3rem' }}>{`${item.day} ${item.hours === 'closed' ? 'closed' : item.hours}`}</p>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={6} md={3} className={classes.column}>
          <Typography variant="h6" style={{ marginBottom: '0.8rem', fontSize: '1rem' }}>Nos Réseaux</Typography>
          <Grid item className={classes.row}>
            <Link href="https://www.instagram.com/" color="secondary" style={{ marginRight: '0.8rem' }}><InstagramIcon /></Link>
            <Link href="https://twitter.com/home" color="secondary" style={{ marginRight: '0.8rem' }}><TwitterIcon /></Link>
            <Link href="https://www.facebook.com/?locale=fr_FR" color="secondary" style={{ marginRight: '0.8rem' }}><FacebookIcon /></Link>
            <Link href="https://web.telegram.org/a/" color="secondary" style={{ marginRight: '0.8rem' }}><TelegramIcon /></Link>
          </Grid>
        </Grid>
      </Grid>
    </footer >
  );
};

export { Footer };

