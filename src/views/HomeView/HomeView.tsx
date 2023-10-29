import React from "react";
import { materialUITheme } from "../../utils/materialUITheme";

import {
  Box,
  Paper,
  Button,
  Grid,
  MobileStepper,
  useTheme,
} from "@mui/material";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import mapPoint from "../../assets/map-point-wave-svgrepo-com.svg";
import L from "leaflet";
import { images } from "./images";
import "leaflet/dist/leaflet.css";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const HomeView: React.FC = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

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
            }}
          >
            <p
              style={{
                fontWeight: "lighter",
                fontFamily: "Caveat",
                [theme.breakpoints.down("lg")]: {
                  fontSize: "1.2rem",
                },
                [theme.breakpoints.down("sm")]: {
                  fontSize: "1.1rem",
                },
                [theme.breakpoints.down("xs")]: {
                  fontSize: "0.7rem",
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
            </p>
          </Grid>
          <Grid
            item
            md={4}
            sx={{
              height: "25vh",
              width: "100%",
              [theme.breakpoints.down("sm")]: {
                display: "none",
              },
            }}
          >
            <Paper
              elevation={5}
              sx={{
                height: "100%",
                border: `0.1rem solid ${materialUITheme.palette.primary.main}`,
                borderRadius: "40px",
              }}
            >
              <MapContainer
                center={position}
                zoom={13}
                style={{ width: "100%", height: "100%" }}
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
            justifyContent: "center",
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
          <Box sx={{ maxWidth: "70%", height: "100%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  margin: "0.5rem",
                  fontFamily: "Caveat",
                  fontWeight: "lighter",
                  [theme.breakpoints.down("md")]: {
                    fontSize: "0.7rem",
                  },
                }}
              >
                {images[activeStep].label}
              </p>
              <AutoPlaySwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
              >
                {images.map((step, index) => (
                  <div
                    key={step.label}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {Math.abs(activeStep - index) <= 2 ? (
                      <Box
                        component="img"
                        src={step.imgPath}
                        alt={step.label}
                        style={{ width: "25vh" }}
                      />
                    ) : null}
                  </div>
                ))}
              </AutoPlaySwipeableViews>
            </div>
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                </Button>
              }
            />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { HomeView };
