import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Faq} from "./Faq";
import {LegalNotice} from "./LegalNotice";
import {Box, Stack, Tab, Tabs} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  aboutUsView: {
    height: '77vh',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  tabContainer: {
    height: '7vh',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
}));

interface AboutUsViewsProps {
}

type TabComponentKey = 'one' | 'two';

const AboutUsView: React.FC<AboutUsViewsProps> = () => {

  const tabComponents: Record<TabComponentKey, JSX.Element> = {
    one: <Faq />,
    two: <LegalNotice />,
  };

  const classes = useStyles();

  const [value, setValue] = React.useState('one');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
      <Stack className={classes.aboutUsView}>
        <Box className={classes.tabContainer}>
          <Tabs
              value={value}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="primary"
              aria-label="secondary tabs example"
              centered
          >
            <Tab value="one" label="F.A.Q" sx={{ width: '50%' }} />
            <Tab value="two" label="Mentions légales" sx={{ width: '50%' }} />
          </Tabs>
        </Box>
        {tabComponents[value as TabComponentKey]}
      </Stack>

  );
};

export { AboutUsView };