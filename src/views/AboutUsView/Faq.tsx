import * as React from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { materialUITheme } from "../../utils/materialUITheme";

const Faq: React.FC = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Stack
      sx={{
        accordionContainer: {
          height: "70vh",
          overflowY: "scroll",
        },
      }}
    >
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{
          bgcolor: `${materialUITheme.palette.secondary.main}`,
          color: `${materialUITheme.palette.primary.main}`,
          marginTop: "1rem",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Qu'est-ce que O'manga ?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "text.secondary" }}>
            O'manga est une boutique en ligne spécialisée dans la vente de
            produits de japanisation, notamment des mangas, des figurines, des
            vêtements et des accessoires inspirés de la culture japonaise.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        sx={{
          bgcolor: `${materialUITheme.palette.secondary.main}`,
          color: `${materialUITheme.palette.primary.main}`,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Quels types de produits proposez-vous ?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "text.secondary" }}>
            Nous proposons une large gamme de produits liés à la japanisation,
            notamment des mangas, des anime, des figurines, des vêtements, des
            bijoux, des jeux et bien plus encore.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        sx={{
          bgcolor: `${materialUITheme.palette.secondary.main}`,
          color: `${materialUITheme.palette.primary.main}`,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Où sont situés vos produits ?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "text.secondary" }}>
            Nos produits sont principalement importés du Japon et stockés dans
            notre entrepôt local pour un retrait en boutique rapide et fiable.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
        sx={{
          bgcolor: `${materialUITheme.palette.secondary.main}`,
          color: `${materialUITheme.palette.primary.main}`,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Quelles sont vos options de paiement ?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "text.secondary" }}>
            Nous acceptons les paiements par carte de crédit, chéques et espéce.
            Le réglement se fait en boutique lors du retrait de la commande.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
        sx={{
          bgcolor: `${materialUITheme.palette.secondary.main}`,
          color: `${materialUITheme.palette.primary.main}`,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Quels sont les délais de retrait ?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "text.secondary" }}>
            Les commandes sont disponibles au retrait à la boutique dés que la
            réservation est faites.{" "}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
        sx={{
          bgcolor: `${materialUITheme.palette.secondary.main}`,
          color: `${materialUITheme.palette.primary.main}`,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Puis-je consulter mes commandes ?{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "text.secondary" }}>
            Oui, vous pouvez consulter vos commandes dans votre espace
            utilisateur'.{" "}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel8"}
        onChange={handleChange("panel8")}
        sx={{
          bgcolor: `${materialUITheme.palette.secondary.main}`,
          color: `${materialUITheme.palette.primary.main}`,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Puis-je retourner ou échanger un produit ?{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "text.secondary" }}>
            Oui, nous acceptons les retours et les échanges sous certaines
            conditions. Veuillez consulter notre politique de retour pour plus
            de détails.{" "}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel9"}
        onChange={handleChange("panel9")}
        sx={{
          bgcolor: `${materialUITheme.palette.secondary.main}`,
          color: `${materialUITheme.palette.primary.main}`,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Comment puis-je contacter votre service client ?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "text.secondary" }}>
            Vous pouvez nous contacter en utilisant le formulaire de contact sur
            notre site Web ou en nous envoyant un e-mail à contact@omanga.com.
            Nous sommes également disponibles sur les réseaux sociaux.{" "}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel10"}
        onChange={handleChange("panel10")}
        sx={{
          bgcolor: `${materialUITheme.palette.secondary.main}`,
          color: `${materialUITheme.palette.primary.main}`,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Puis-je précommander des produits à venir ?{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "text.secondary" }}>
            Nopn, nos produits sont mis en vente dés leurs réception dans nos
            sotcks et disponibles de suite.{" "}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel11"}
        onChange={handleChange("panel11")}
        sx={{
          bgcolor: `${materialUITheme.palette.secondary.main}`,
          color: `${materialUITheme.palette.primary.main}`,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Comment puis-je rester informé des promotions et des nouveaux
            produits ?{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "text.secondary" }}>
            Inscrivez-vous à notre newsletter pour recevoir des mises à jour
            régulières sur nos promotions, nos nouveaux produits et nos
            événements spéciaux. Vous pouvez également nous suivre sur les
            réseaux sociaux.{" "}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel12"}
        onChange={handleChange("panel12")}
        sx={{
          bgcolor: `${materialUITheme.palette.secondary.main}`,
          color: `${materialUITheme.palette.primary.main}`,
          marginBottom: "10rem",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Offrez-vous des remises pour les membres fidèles ?{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "text.secondary" }}>
            Oui, nous avons un programme de fidélité qui offre des remises
            spéciales et des avantages exclusifs aux membres fidèles.
            Inscrivez-vous pour en savoir plus.{" "}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export { Faq };
