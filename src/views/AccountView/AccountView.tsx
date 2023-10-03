import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Tabs, Tab, Stack } from '@mui/material';
import { AccountInformtions } from './AccountInformation';
import { BookingsDetails } from './BookingsDetails';
import { Preference } from './Preference';

const useStyles = makeStyles((theme) => ({
  accountView: {
    height: '77vh',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  tabContainer: {
    height: '7vh',
  },
}));

interface AccountViewsProps {
}

type TabComponentKey = 'one' | 'two' | 'three';

const AccountView: React.FC<AccountViewsProps> = () => {

  const classes = useStyles();

  const [value, setValue] = React.useState('one');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const tabComponents: Record<TabComponentKey, JSX.Element> = {
    one: <AccountInformtions />,
    two: <BookingsDetails />,
    three: <Preference />,
  };

  return (
    <Stack className={classes.accountView}>
      <Box className={classes.tabContainer}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="secondary tabs example"
          centered
        >
          <Tab value="one" label="Informations du compte" sx={{ width: '33%' }} />
          <Tab value="two" label="Mes réservations" sx={{ width: '33%' }} />
          <Tab value="three" label="Mes préférences" sx={{ width: '34%' }} />
        </Tabs>
      </Box>
      {tabComponents[value as TabComponentKey]}
    </Stack>

  );
};

export { AccountView };