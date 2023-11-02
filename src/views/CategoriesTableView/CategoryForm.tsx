import React, { ChangeEvent, useState } from "react";
import { useMutation } from "react-query";

import {
  createOneCategory,
  updateOneCategory,
} from "../../services/categories";
import { Category } from "../../models/Category";

import {
  TextField,
  Button,
  Snackbar,
  Stack,
  Grid,
  Typography,
} from "@mui/material";
import { snackBarAlert } from "../../utils/snackBarAlert";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

type CategoryFormProps = {
  row?: Category;
  userMail: string | undefined;
  onClose: () => void;
  status: "create" | "update";
};

const CategoryForm: React.FC<CategoryFormProps> = ({
  row,
  onClose,
  userMail,
  status,
}) => {
  const Alert = snackBarAlert;

  const [openSuccessCreateMessage, setOpenSuccessCreateMessage] =
    useState(false);
  const [openSuccessUpdateMessage, setOpenSuccessUpdateMessage] =
    useState(false);
  const [openErrorMessage, setOpenErrorMessage] = useState(false);

  const [categoryName, setCategoryName] = useState<string>(row ? row.name : "");

  const [file, setFile] = useState<string>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) throw new Error("no file");
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const base64Data = event.target.result.toString();
          setFile(base64Data);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleClick = (e: string) => {
    if (e === "successCreate") {
      setOpenSuccessCreateMessage(true);
    }
    if (e === "successUpdate") {
      setOpenSuccessUpdateMessage(true);
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
    if (state === "successCreate") {
      setOpenSuccessCreateMessage(false);
    }
    if (state === "successCreate") {
      setOpenSuccessUpdateMessage(false);
    }
    if (state === "error") {
      setOpenErrorMessage(false);
    }
  };

  const categoryBodyRequest = {
    name: categoryName,
    image_url: status === "update" ? row?.image_url : file,
  };

  const createCategory = useMutation({
    mutationKey: ["createUniverse", { categoryBodyRequest, userMail }],
    mutationFn: () => createOneCategory(categoryBodyRequest, userMail),
    onSettled: (data, error) => {
      if (error) {
        handleClick("error");
      }
      if (data) {
        handleClick("success");
        setTimeout(onClose, 2000);
      }
    },
  });

  const updateCategory = useMutation({
    mutationKey: ["updateProduct", { row, categoryBodyRequest }],
    mutationFn: () => updateOneCategory(row?.id, categoryBodyRequest, userMail),
    onSettled: (data, error) => {
      if (error) {
        handleClick("error");
      }
      if (data) {
        handleClick("successUpdate");
        setTimeout(onClose, 2000);
      }
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.preventDefault();
    if (status === "update") {
      updateCategory.mutate();
    }
    if (status === "create") {
      createCategory.mutate();
    }
  };

  return (
    <>
      <Grid
        container
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          style={{ width: "80%" }}
        >
          <Grid item xs={6}>
            <Typography variant="h5" gutterBottom color="primary">
              Catégorie
            </Typography>
          </Grid>
          <TextField
            type="text"
            variant="outlined"
            color="primary"
            label="Nom Catégorie"
            onChange={(e) => setCategoryName(e.target.value)}
            value={categoryName}
            fullWidth
            required
            sx={{ mb: 3 }}
          />
          <Stack
            spacing={2}
            direction="row"
            sx={{ mb: 3 }}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginLeft: "0",
            }}
          >
            <input
              accept="image/*"
              style={{ display: "none", marginLeft: "0" }}
              id="image-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label
              htmlFor="image-upload"
              style={{ width: "100%", marginLeft: "0" }}
            >
              <Button
                variant="contained"
                color="primary"
                component="span"
                startIcon={<CloudUploadIcon />}
                style={{ width: "100%", marginLeft: "0" }}
              >
                Joindre la photo
              </Button>
            </label>
          </Stack>
          <Stack
            spacing={10}
            direction="row"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              type="submit"
              sx={{ marginTop: "2rem" }}
            >
              {row ? "Mise à jour" : "Création"}
            </Button>
            <Button variant="outlined" onClick={onClose}>
              Annuler
            </Button>
          </Stack>
        </form>
      </Grid>

      <Snackbar
        open={openSuccessCreateMessage}
        autoHideDuration={2000}
        onClose={(event, reason) => handleClose(event, reason, "success")}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          La catégorie a été créée avec succès!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSuccessUpdateMessage}
        autoHideDuration={2000}
        onClose={(event, reason) => handleClose(event, reason, "successUpdate")}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          La catégorie a été mis à jour avec succès!
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
    </>
  );
};

export { CategoryForm };
