import React, { ChangeEvent, useState } from "react";
import { useMutation, useQuery } from "react-query";

import { getAllCategories } from "../../services/categories";
import { getAllUniverses } from "../../services/universes";
import { Product } from "../../models/Product";
import { createOneProduct, updateOneProduct } from "../../services/products";

import {
  TextField,
  Button,
  Snackbar,
  Stack,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { snackBarAlert } from "../../utils/snackBarAlert";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

type CategoryFormProps = {
  row?: Product;
  onClose: () => void;
  status: "create" | "update";
  userMail: string | undefined;
};

const ProductForm: React.FC<CategoryFormProps> = ({
  row,
  onClose,
  status,
  userMail,
}) => {
  const Alert = snackBarAlert;

  const [openSuccessCreateMessage, setOpenSuccessCreateMessage] =
    useState(false);
  const [openSuccessUpdateMessage, setOpenSuccessUpdateMessage] =
    useState(false);
  const [openErrorMessage, setOpenErrorMessage] = useState(false);

  const [productName, setProductName] = useState<string>(row ? row.name : "");

  const [productPrice, setProductPrice] = useState<number>(row ? row.price : 0);
  const [productDescription, setProductDescription] = useState<string>(
    row ? row.description : "",
  );
  const [universSelect, setUniversSelect] = useState<number>(
    row ? row.universe_id : 0,
  );

  const [categorySelect, setCategorySelect] = useState<number>(
    row ? row.category_id : 0,
  );

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

  const handleChangeUnivers = (event: any) => {
    setUniversSelect(event.target.value);
  };

  const handleChangeCategory = (event: any) => {
    setCategorySelect(event.target.value);
  };

  const categories = useQuery({
    queryKey: ["getAllCategories"],
    queryFn: () => getAllCategories(),
  });
  const universes = useQuery({
    queryKey: ["getAllUniverses"],
    queryFn: () => getAllUniverses(),
  });

  const allCategories = categories?.data
    ? categories.data.data.map((category) => category.name)
    : [];

  const allUniverses = universes?.data
    ? universes.data.data.map((universe) => universe.name)
    : [];

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
  const productBodyRequest = {
    stock: 1,
    name: productName,
    description: productDescription,
    image_url: status === "update" ? row?.image_url : file,
    price: productPrice,
    category_id: universSelect,
    universe_id: categorySelect,
  };
  const createProduct = useMutation({
    mutationKey: ["createProduct", { productBodyRequest }],
    mutationFn: () => createOneProduct(productBodyRequest, userMail),
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

  const updateProduct = useMutation({
    mutationKey: ["updateProduct", { row, productBodyRequest }],
    mutationFn: () => updateOneProduct(row?.id, userMail, productBodyRequest),
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
    if (status === "update") {
      updateProduct.mutate();
    }
    if (status === "create") {
      createProduct.mutate();
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
              Produits
            </Typography>
          </Grid>
          <TextField
            type="text"
            variant="outlined"
            color="primary"
            label="Produit"
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
            defaultValue={row ? row.name : ""}
            fullWidth
            required
            sx={{ mb: 1 }}
          />
          <TextField
            type="number"
            variant="outlined"
            color="primary"
            label="Prix"
            onChange={(e) => setProductPrice(parseInt(e.target.value))}
            value={productPrice}
            defaultValue={row ? row.price : 0}
            fullWidth
            required
            sx={{ mb: 1 }}
          />
          <TextField
            label="Commentaire"
            onChange={(e) => setProductDescription(e.target.value)}
            multiline
            rows={2}
            required
            variant="outlined"
            color="primary"
            type="text"
            sx={{ mb: 1 }}
            fullWidth
            value={productDescription}
          />
          <InputLabel id="univers-select">Univers</InputLabel>
          <Select
            labelId="univers-select"
            id="univers-select-disabled"
            value={universSelect}
            label="Univers"
            onChange={handleChangeUnivers}
            fullWidth
            required
            sx={{ mb: 1 }}
          >
            {allUniverses.map((item, index) => (
              <MenuItem key={index} value={index}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <InputLabel id="univers-select">Catégorie</InputLabel>
          <Select
            labelId="univers-select"
            id="category-select-disabled"
            value={categorySelect}
            label="Catégorie"
            onChange={handleChangeCategory}
            fullWidth
            required
            sx={{ mb: 1 }}
          >
            {allCategories.map((item, index) => (
              <MenuItem key={index} value={index}>
                {item}
              </MenuItem>
            ))}
          </Select>

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
              sx={{ mt: 2 }}
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
          L'univers a été créée avec succès!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSuccessUpdateMessage}
        autoHideDuration={2000}
        onClose={(event, reason) => handleClose(event, reason, "successUpdate")}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          L'univers a été mis à jour avec succès!
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

export { ProductForm };
