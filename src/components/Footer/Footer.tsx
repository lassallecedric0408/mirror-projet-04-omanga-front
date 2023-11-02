import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { openingHoursData } from "./openingHoursData";
import { servicesLinks } from "./servicesLinks";
import { socialMediaLinks } from "./socialMediaLinks";
import { contactInformations } from "./contactInformations";
import { materialUITheme } from "../../utils/materialUITheme";

import { Grid, Typography, useTheme } from "@mui/material";

const Footer: React.FC = () => {
  const theme = useTheme();
  return (
    <footer
      style={{
        backgroundColor: `${materialUITheme.palette.primary.main}`,
        color: `${materialUITheme.palette.secondary.main}`,
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "15vh",
      }}
    >
      <Grid container spacing={3}>
        <Grid
          item
          xs={6}
          sm={6}
          md={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            style={{
              marginBottom: "0.8rem",
              fontSize: "1.1rem",
              fontFamily: "Caveat",
            }}
          >
            Nos services
          </Typography>
          {servicesLinks.map((link, index) => (
            <RouterLink
              key={index}
              to={link.to}
              color="secondary"
              style={{
                marginBottom: "0.5rem",
                fontSize: "0.7rem",
                textDecoration: "none",
                color: "white",
              }}
            >
              {link.icon && (
                <span style={{ marginRight: "0.5rem", fontSize: "0.7rem" }}>
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
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            [theme.breakpoints.down("sm")]: {
              display: "none",
            },
          }}
        >
          <Typography
            style={{
              marginBottom: "0.8rem",
              fontSize: "1.1rem",
              fontFamily: "Caveat",
            }}
          >
            Nos coordonnées
          </Typography>
          {contactInformations.map((info, index: number) => (
            <Typography
              key={index}
              style={{
                fontSize: "0.7rem",
                textAlign: info.textAlign ? info.textAlign : "left",
                whiteSpace: "pre-wrap",
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
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            hideOnMobile: {
              [theme.breakpoints.down("sm")]: {
                display: "none",
              },
            },
          }}
        >
          <Typography
            style={{
              marginBottom: "0.8rem",
              fontSize: "1.1rem",
              fontFamily: "Caveat",
            }}
          >
            Horaires d'ouverture
          </Typography>
          <Grid container>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {openingHoursData.slice(0, 4).map((item, index) => (
                <p
                  key={index}
                  style={{ fontSize: "0.7rem", margin: "0.3rem" }}
                >{`${item.day} ${
                  item.hours === "closed" ? "closed" : item.hours
                }`}</p>
              ))}
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {openingHoursData.slice(4).map((item, index) => (
                <p
                  key={index}
                  style={{ fontSize: "0.7rem", margin: "0.3rem" }}
                >{`${item.day} ${
                  item.hours === "closed" ? "closed" : item.hours
                }`}</p>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            style={{
              marginBottom: "0.8rem",
              fontSize: "1.1rem",
              fontFamily: "Caveat",
            }}
          >
            Nos Réseaux
          </Typography>
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {socialMediaLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                style={{ marginRight: "0.8rem", color: "white" }}
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
