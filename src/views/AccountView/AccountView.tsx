import React from "react";
import useAuthStore from "../../states/OmangaStore";
import { Link } from "react-router-dom";

import { AccountInformtions } from "./AccountInformation";
import { BookingsDetails } from "./BookingsDetails";
import { Preference } from "./Preference";

import { Box, Tabs, Tab, Stack, Typography } from "@mui/material";

type TabComponentKey = "one" | "two" | "three";

const AccountView: React.FC = () => {
  const isLogged = useAuthStore((state) => state.isLogged);

  const [value, setValue] = React.useState("one");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const tabComponents: Record<TabComponentKey, JSX.Element> = {
    one: <AccountInformtions />,
    two: <BookingsDetails />,
    three: <Preference />,
  };

  return (
    <>
      {isLogged ? (
        <Stack
          sx={{
            accountView: {
              height: "77vh",
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
            },
          }}
        >
          <Box
            sx={{
              tabContainer: {
                height: "7vh",
              },
            }}
          >
            <Tabs
              value={value}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="primary"
              aria-label="secondary tabs example"
              centered
            >
              <Tab
                value="one"
                label="Informations du compte"
                sx={{ width: "33%" }}
              />
              <Tab value="two" label="Mes réservations" sx={{ width: "33%" }} />
              <Tab
                value="three"
                label="Mes préférences"
                sx={{ width: "34%" }}
              />
            </Tabs>
          </Box>
          {tabComponents[value as TabComponentKey]}
        </Stack>
      ) : (
        <Stack
          sx={{
            height: "77vh",
            width: "90%",
            ml: "auto",
            mr: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" gutterBottom color="primary">
            Vous êtes déjà dans la communauté?
          </Typography>
          <Link to="/login" color="primary">
            Connectez-vous ici
          </Link>
        </Stack>
      )}
    </>
  );
};

export { AccountView };
