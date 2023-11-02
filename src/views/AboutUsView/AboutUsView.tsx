import React from "react";
import { Box, Stack, Tab, Tabs } from "@mui/material";

import { Faq } from "./Faq";
import { LegalNotice } from "./LegalNotice";

type TabComponentKey = "one" | "two";

const AboutUsView: React.FC = () => {
  const tabComponents: Record<TabComponentKey, JSX.Element> = {
    one: <Faq />,
    two: <LegalNotice />,
  };

  const [value, setValue] = React.useState("one");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Stack
      sx={{
        height: "77vh",
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Box
        sx={{
          height: "7vh",
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
          <Tab value="one" label="F.A.Q" sx={{ width: "50%" }} />
          <Tab value="two" label="Mentions légales" sx={{ width: "50%" }} />
        </Tabs>
      </Box>
      {tabComponents[value as TabComponentKey]}
    </Stack>
  );
};

export { AboutUsView };
