import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@mui/material/Typography';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import HomeIcon from '@mui/icons-material/Home';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Link as RouterLink } from 'react-router-dom';
import { openingHoursData } from './openingHoursData';
import { footerStyle } from './FooterStyle';
import { servicesLinks } from './servicesLinks';
import { socialMediaLinks } from './socialMediaLinks';
import {
  contactInformations,
  contactInformationsType,
} from './contactInformations';

const useStyles = footerStyle;

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={6} md={3} className={classes.column}>
          <Typography
            style={{
              marginBottom: '0.8rem',
              fontSize: '1.1rem',
              fontFamily: 'Caveat',
            }}
          >
            Nos services
          </Typography>
          {servicesLinks.map((link, index) => (
            <RouterLink
              key={index}
              to={link.to}
              color='secondary'
              style={{
                marginBottom: '0.5rem',
                fontSize: '0.7rem',
                textDecoration: 'none',
                color: 'white',
              }}
            >
              {link.icon && (
                <span style={{ marginRight: '0.5rem', fontSize: '0.7rem' }}>
                  {link.icon}
                </span>
              )}
              {link.text}
            </RouterLink>
          ))}
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          className={`${classes.column} ${classes.hideOnMobile}`}
        >
          <Typography
            style={{
              marginBottom: '0.8rem',
              fontSize: '1.1rem',
              fontFamily: 'Caveat',
            }}
          >
            Nos coordonnées
          </Typography>
          {contactInformations.map((info, index: number) => (
            <Typography
              key={index}
              style={{
                fontSize: '0.7rem',
                textAlign: info.textAlign ? info.textAlign : 'left',
                whiteSpace: 'pre-wrap',
              }}
            >
              {info.icon}
              {info.text}
            </Typography>
          ))}
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          className={`${classes.column} ${classes.hideOnMobile}`}
        >
          <Typography
            style={{
              marginBottom: '0.8rem',
              fontSize: '1.1rem',
              fontFamily: 'Caveat',
            }}
          >
            Horaires d'ouverture
          </Typography>
          <Grid container>
            <Grid item xs={6} className={`${classes.column}`}>
              {openingHoursData.slice(0, 4).map((item, index) => (
                <p
                  key={index}
                  style={{ fontSize: '0.7rem', margin: '0.3rem' }}
                >{`${item.day} ${
                  item.hours === 'closed' ? 'closed' : item.hours
                }`}</p>
              ))}
            </Grid>
            <Grid item xs={6} className={`${classes.column}`}>
              {openingHoursData.slice(4).map((item, index) => (
                <p
                  key={index}
                  style={{ fontSize: '0.7rem', margin: '0.3rem' }}
                >{`${item.day} ${
                  item.hours === 'closed' ? 'closed' : item.hours
                }`}</p>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={6} md={3} className={classes.column}>
          <Typography
            variant='h6'
            style={{
              marginBottom: '0.8rem',
              fontSize: '1.1rem',
              fontFamily: 'Caveat',
            }}
          >
            Nos Réseaux
          </Typography>
          <Grid item className={classes.row}>
            {socialMediaLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                style={{ marginRight: '0.8rem', color: 'white' }}
              >
                {link.icon}
              </a>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </footer>
  );
};

export { Footer };
