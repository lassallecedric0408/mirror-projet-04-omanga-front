import React from "react";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import mapPoint from "../../assets/map-point-wave-svgrepo-com.svg";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Carousel } from "../../components/Carousel/Carousel";

import { Paper, Grid, useTheme, Typography } from "@mui/material";
import { materialUITheme } from "../../utils/materialUITheme";

const HomeView: React.FC = () => {
  const theme = useTheme();

  const position: LatLngExpression = [48.897899, 2.096092];

  const mapIcon = new L.Icon({
    iconUrl: mapPoint,
    iconSize: [60, 60],
    iconAnchor: [20, 40],
  });

  return (
    <Grid
      container
      sx={{
        height: "77vh",
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{ height: "32vh", display: "flex", flexDirection: "column" }}
      >
        <Grid
          container
          sx={{
            height: "7vh",
            fontSize: "1.6rem",
            color: `${materialUITheme.palette.primary.main}`,
            [theme.breakpoints.down("md")]: {
              fontSize: "1.3rem",
            },
            [theme.breakpoints.down("sm")]: {
              fontSize: "1rem",
            },
            display: "flex",
            alignItems: "center",
          }}
        >
          <p>
            Bienvenue chez O'Manga, Votre Destination Manga et Culture
            Japonaise!
          </p>
        </Grid>
        <Grid
          container
          sx={{
            height: "25vh",
          }}
        >
          <Grid
            item
            md={8}
            sx={{
              padding: "0 2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                typography: {
                  lg: "body1",
                  md: "body1",
                  sm: "caption",
                  xs: "caption",
                },
              }}
            >
              Chez O'Manga, nous sommes votre passerelle vers le monde captivant
              des mangas et de la culture japonaise. <br />
              Découvrez notre collection de mangas variée, des produits dérivés
              uniques, des éléments de la culture japonaise traditionnelle,
              ainsi que des événements spéciaux. <br />
              Notre équipe passionnée est là pour vous guider et partager notre
              amour pour le Japon. <br />
              Explorez O'Manga et plongez dans l'univers fascinant du manga et
              de la japanisation dès aujourd'hui !
            </Typography>
          </Grid>
          <Grid
            item
            md={4}
            sx={{
              height: "25vh",
              width: "100%",
              [theme.breakpoints.down("md")]: {
                display: "none",
              },
            }}
          >
            <Paper
              elevation={5}
              sx={{
                height: "100%",
                border: `0.2rem solid ${materialUITheme.palette.primary.main}`,
                borderRadius: "5px",
              }}
            >
              <MapContainer
                center={position}
                zoom={13}
                style={{ width: "100%", height: "100%", borderRadius: "40px" }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={mapIcon}></Marker>
              </MapContainer>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          height: "45vh",
        }}
      >
        <Grid
          container
          sx={{
            height: "5vh",
            fontSize: "1.6rem",
            color: `${materialUITheme.palette.primary.main}`,
            [theme.breakpoints.down("md")]: {
              fontSize: "1.3rem",
            },
            [theme.breakpoints.down("sm")]: {
              fontSize: "1rem",
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
          }}
        >
          <p> Produit bientôt dans la boutique</p>
        </Grid>
        <Grid
          container
          sx={{
            height: "40vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Carousel />
        </Grid>
      </Grid>
    </Grid>
  );
};

export { HomeView };
