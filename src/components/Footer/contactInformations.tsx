import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import HomeIcon from "@mui/icons-material/Home";

export type contactInformationsType = {
  icon: React.ReactNode;
  text: string;
  textAlign?: "left" | "center" | "right";
};

export const contactInformations: contactInformationsType[] = [
  {
    icon: (
      <LocalPhoneIcon style={{ marginRight: "0.5rem", fontSize: "0.7rem" }} />
    ),
    text: "01.18.46.96.34",
  },
  {
    icon: <HomeIcon style={{ marginRight: "0.5rem", fontSize: "0.7rem" }} />,
    text: `50 rue du Château Saint-germain-en-laye 
          78100 Saint-germain-en-laye`,
    textAlign: "center",
  },
  {
    icon: (
      <AlternateEmailIcon
        style={{ marginRight: "0.5rem", fontSize: "0.7rem" }}
      />
    ),
    text: "contact@omanga.com",
  },
];
