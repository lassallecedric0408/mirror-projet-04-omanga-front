import React, { useState } from "react";
import useAuthStore from "../../states/OmangaStore";
import { Link as RouterLink, Navigate } from "react-router-dom";

import { snackBarAlert } from "../../utils/snackBarAlert";

import { Menu, MenuItem, Snackbar } from "@mui/material";
import { materialUITheme } from "../../utils/materialUITheme";

const settings = [
  { name: "Mon compte", link: "/account" },
  { name: "Déconnexion", link: "/" },
  { name: "Inscription", link: "/signup" },
  { name: "Connexion", link: "/login" },
];

type SettingsLinksProps = {
  anchorElUser: null | HTMLElement;
  setAnchorElUser: (value: null | HTMLElement) => void;
};

const SettingsMenu: React.FC<SettingsLinksProps> = ({
  anchorElUser,
  setAnchorElUser,
}) => {
  const isLogged = useAuthStore((state) => state.isLogged);
  const [openSuccessMessage, setOpenSuccessMessage] = useState(false);
  const [openErrorMessage, setOpenErrorMessage] = useState(false);
  const [redirectUser, setRedirectUser] = useState(false);

  const Alert = snackBarAlert;

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDisconnectUser = () => {
    useAuthStore.getState().logoutUser();
    handleClick("success");
    setTimeout(() => setRedirectUser(true), 2500);
  };

  const handleClick = (e: string) => {
    if (e === "success") {
      setOpenSuccessMessage(true);
    }
    if (e === "error") {
      setOpenErrorMessage(true);
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
    state?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    if (state === "success") {
      setOpenSuccessMessage(false);
    }
    if (state === "error") {
      setOpenErrorMessage(false);
    }
  };

  return (
    <>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {isLogged ? (
          <>
            <MenuItem>
              <RouterLink
                to={settings[0].link}
                style={{
                  color: `${materialUITheme.palette.primary.main}`,
                  textDecoration: "none",
                  fontSize: "1.2rem",
                  fontWeight: "500",
                  fontFamily: "Caveat",
                }}
              >
                {settings[0].name}
              </RouterLink>
            </MenuItem>
            <MenuItem onClick={handleDisconnectUser}>
              <RouterLink
                to={settings[1].link}
                style={{
                  color: `${materialUITheme.palette.primary.main}`,
                  textDecoration: "none",
                  fontSize: "1.2rem",
                  fontWeight: "500",
                  fontFamily: "Caveat",
                }}
              >
                {settings[1].name}
              </RouterLink>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem>
              <RouterLink
                to={settings[2].link}
                style={{
                  color: `${materialUITheme.palette.primary.main}`,
                  textDecoration: "none",
                  fontSize: "1.2rem",
                  fontWeight: "500",
                  fontFamily: "Caveat",
                }}
              >
                {settings[2].name}
              </RouterLink>
            </MenuItem>
            <MenuItem>
              <RouterLink
                to={settings[3].link}
                style={{
                  color: `${materialUITheme.palette.primary.main}`,
                  textDecoration: "none",
                  fontSize: "1.2rem",
                  fontWeight: "500",
                  fontFamily: "Caveat",
                }}
              >
                {settings[3].name}
              </RouterLink>
            </MenuItem>
          </>
        )}
      </Menu>
      <Snackbar
        open={openSuccessMessage}
        autoHideDuration={2000}
        onClose={(event, reason) => handleClose(event, reason, "success")}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Vous venez de vous déconnecter. Au revoir!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorMessage}
        autoHideDuration={2000}
        onClose={(event, reason) => handleClose(event, reason, "error")}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Une erreur s'est produit. Veuillez essayer à nouveau!
        </Alert>
      </Snackbar>
      {redirectUser && <Navigate to="/" />}
    </>
  );
};

export { SettingsMenu };
