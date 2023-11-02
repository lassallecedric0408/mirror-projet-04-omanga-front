import * as React from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";
import { materialUITheme } from "../../utils/materialUITheme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const LegalNotice: React.FC = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Stack
      sx={{
        height: "70vh",
        overflowY: "scroll",
      }}
    >
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{
          bgcolor: `${materialUITheme.palette.secondary.main}`,
          color: `${materialUITheme.palette.primary.main}`,
          marginTop: "4rem",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Nom de l'Entreprise
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "text.secondary" }}>O'manga.</Typography>
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
            Forme Juridique
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "text.secondary" }}>SARL.</Typography>
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
            Siège Social
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "text.secondary" }}>
            50 rue du Château 78100 Saint-germain-en-laye.
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
            Numéro de Téléphone
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "text.secondary" }}>
            01.18.46.96.34.
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
            Adresse e-mail
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "text.secondary" }}>
            contact@omanga.com.
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
            Directeur de la Publication
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "text.secondary" }}>
            Mr Cédric Tartempion.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
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
            Hébergeur du Site Web
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "text.secondary" }}>Netlify.</Typography>
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
            Propriété Intellectuelle
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "text.secondary" }}>
            L'ensemble du contenu de ce site web, y compris les textes, les
            images, les vidéos, les logos et les éléments graphiques, est
            protégé par les lois sur la propriété intellectuelle et est la
            propriété exclusive de O'manga ou de ses fournisseurs de contenu.
            Toute utilisation non autorisée de ce contenu est strictement
            interdite.
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
            Protection des Données Personnelles
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "text.secondary" }}>
            O'manga s'engage à protéger la vie privée de ses utilisateurs. Pour
            plus d'informations sur la collecte, le traitement et la protection
            des données personnelles, veuillez consulter notre Politique de
            Confidentialité.
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
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Cookies</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "text.secondary" }}>
            Ce site web utilise des cookies pour améliorer l'expérience de
            l'utilisateur. Pour en savoir plus sur l'utilisation des cookies et
            comment les gérer, veuillez consulter notre Politique en matière de
            Cookies.
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
            Liens Externes
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "text.secondary" }}>
            Ce site web peut contenir des liens vers des sites web externes.
            [Nom de l'entreprise] n'est pas responsable du contenu ou des
            pratiques de confidentialité de ces sites web tiers.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel12"}
        onChange={handleChange("panel12")}
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
            Droit Applicable et Juridiction
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "text.secondary" }}>
            Tout litige découlant de l'utilisation de ce site web sera régi par
            les lois en vigueur dans [votre pays]. Les tribunaux de [votre
            ville] auront compétence exclusive pour tout litige lié à ce site
            web.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel13"}
        onChange={handleChange("panel13")}
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
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Contact</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "text.secondary" }}>
            Si vous avez des questions ou des préoccupations concernant ces
            mentions légales, veuillez nous contacter à l'adresse e-mail
            contact@omanga.com ou par courrier à l'adresse 50 rue du Château,
            78100, Saint-germain-en-laye.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel14"}
        onChange={handleChange("panel14")}
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
            Date de la Dernière Mise à Jour
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "text.secondary" }}>
            09 Octobre 2023.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export { LegalNotice };
