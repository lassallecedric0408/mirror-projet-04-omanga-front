import React from 'react';
import { footerStyle } from './FooterStyle';
import Grid from '@material-ui/core/Grid';
import Typography from '@mui/material/Typography';

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import HomeIcon from '@mui/icons-material/Home';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import {
  Link as RouterLink
} from 'react-router-dom';

const useStyles = footerStyle;

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
          <Typography style={{ marginBottom: '0.8rem', fontSize: '1.1rem', fontFamily: 'Caveat' }}>Nos services</Typography>
          <RouterLink to="/products" color="secondary" style={{ marginBottom: '0.5rem', fontSize: '0.7rem', textDecoration: 'none', color: 'white' }}>Nos Produits</RouterLink>
          <RouterLink to="/account" color="secondary" style={{ marginBottom: '0.5rem', fontSize: '0.7rem', textDecoration: 'none', color: 'white' }}>Votre compte</RouterLink>
          <RouterLink to="/aboutUS" color="secondary" style={{ marginBottom: '0.5rem', fontSize: '0.7rem', textDecoration: 'none', color: 'white' }}>FAQ / Mentions légales</RouterLink>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={`${classes.column} ${classes.hideOnMobile}`}>
          <Typography style={{ marginBottom: '0.8rem', fontSize: '1.1rem', fontFamily: 'Caveat' }}>Nos coordonnées</Typography>
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
          <Typography style={{ marginBottom: '0.8rem', fontSize: '1.1rem', fontFamily: 'Caveat' }} >Horaires d'ouverture</Typography>
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
          <Typography variant="h6" style={{ marginBottom: '0.8rem', fontSize: '1.1rem', fontFamily: 'Caveat' }}>Nos Réseaux</Typography>
          <Grid item className={classes.row}>
            <a href="https://www.instagram.com/" style={{ marginRight: '0.8rem', color: 'white' }}><InstagramIcon /></a>
            <a href="https://twitter.com/home" style={{ marginRight: '0.8rem', color: 'white' }}><TwitterIcon /></a>
            <a href="https://www.facebook.com/?locale=fr_FR" style={{ marginRight: '0.8rem', color: 'white' }}><FacebookIcon /></a>
            <a href="https://web.telegram.org/a/" style={{ marginRight: '0.8rem', color: 'white' }}><TelegramIcon /></a>
          </Grid>
        </Grid>
      </Grid>
    </footer >
  );
};

export { Footer };

