import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

export const servicesLinks = [
  {
    to: "/products",
    text: "Nos Produits",
    icon: (
      <ProductionQuantityLimitsIcon
        style={{ marginRight: "0.5rem", fontSize: "0.7rem" }}
      />
    ),
  },
  {
    to: "/account",
    text: "Votre compte",
    icon: (
      <AccountCircleIcon
        style={{ marginRight: "0.5rem", fontSize: "0.7rem" }}
      />
    ),
  },
  {
    to: "/aboutUS",
    text: "FAQ / Mentions légales",
    icon: (
      <QuestionAnswerIcon
        style={{ marginRight: "0.5rem", fontSize: "0.7rem" }}
      />
    ),
  },
];
