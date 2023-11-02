import React, { useState } from "react";
import useAuthStore from "../../states/OmangaStore";
import { useQuery } from "react-query";
import { redirect } from "react-router";

import { TextFieldTable } from "../../components/TextFieldTable";
import { SingleSelect } from "../../components/singleSelect";
import { ModalTable } from "../../components/ModalTable/ModalTable";
import { selectStatus } from "./selectStatus";
import { DeleteUser } from "./DeleteUser";
import { removeAccents } from "../../utils/removeAccents";
import { getAllUsers } from "../../services/user";
import { UserResponse } from "../../models/User";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  useTheme,
  CircularProgress,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { materialUITheme } from "../../utils/materialUITheme";

const UsersTableView: React.FC = () => {
  const theme = useTheme();

  const user = useAuthStore((state) => state.user.user);
  const isAdmin = useAuthStore((state) => state.isAdmin);

  if (!user) {
    throw new Error("User not found");
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["getAllUsers", user],
    queryFn: () => getAllUsers(user.email),
  });

  const [userRow, setUserRow] = useState<UserResponse>({
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    image_url: "",
    role: "USER",
    city: "",
    zip_code: "",
  });
  const [userName, setUserName] = useState<string | null>("");
  const [city, setCity] = useState<string | null>("");
  const [isAdminUser, setIsAdminUser] = useState<
    string | "USERS" | "ADMIN" | "USER"
  >("USERS");

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleDeleteUser = (row: UserResponse) => {
    setUserRow(row);
    handleOpenDeleteModal();
  };

  const handleUserNameChange = (value: string | number) => {
    setUserName(value as string);
  };

  const handleCityChange = (value: string | number) => {
    setCity(value as string);
  };

  const handleIsAdminChange = (value: string | "USERS" | "ADMIN" | "USER") => {
    setIsAdminUser(value);
  };

  const getFitleredRows = () => {
    let filteredRows = [...(data?.data ?? [])];

    if (userName !== null && userName !== "") {
      const cityWithoutAccents = removeAccents(userName);
      filteredRows = filteredRows.filter((row) =>
        removeAccents(row.lastname).startsWith(cityWithoutAccents),
      );
    }
    if (city !== null && city !== "") {
      const cityWithoutAccents = removeAccents(city);
      filteredRows = filteredRows.filter((row) => {
        if (row.city !== null) {
          removeAccents(row.city).startsWith(cityWithoutAccents);
        }
      });
    }
    if (isAdminUser === "ADMIN") {
      filteredRows = filteredRows.filter((row) => row.role === "ADMIN");
    }
    if (isAdminUser === "USER") {
      filteredRows = filteredRows.filter((row) => row.role === "USER");
    }

    return filteredRows;
  };

  const allUsers = getFitleredRows();

  if (isLoading) {
    return (
      <div
        style={{
          height: "77vh",
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    redirect("/error");
  }

  if (!isAdmin) {
    redirect("/error");
  }
  return (
    <>
      <Grid
        container
        style={{
          height: "77vh",
          width: "85%",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid
          item
          sx={{
            height: "7vh",
            fontSize: "1.6rem",
            color: `${materialUITheme.palette.primary.main}`,
            [theme.breakpoints.down("md")]: {
              fontSize: "1.3rem",
            },
            [theme.breakpoints.down("sm")]: {
              fontSize: "1rem",
            },
            display: "flex",
            alignItems: "center",
          }}
        >
          <p> Utilisateur </p>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: "3rem",
            marginBottom: "1rem",
            width: "100%",
            flex: "0",
          }}
        >
          <Grid item xs={4}>
            <TextFieldTable
              label={"Nom"}
              value={userName === null ? "" : userName}
              onChange={handleUserNameChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextFieldTable
              label={"Ville"}
              value={city === null ? "" : city}
              onChange={handleCityChange}
            />
          </Grid>
          <Grid item xs={4}>
            <SingleSelect
              selectItems={selectStatus}
              selectName={"Admin et utilisateurs"}
              onChange={handleIsAdminChange}
            />
          </Grid>
        </Grid>
        <Grid
          item
          sx={{
            width: "100%",
            flex: "1",
            overflowY: "auto",
            maxHeight: "100%",
            marginBottom: "1rem",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nom</TableCell>
                  <TableCell>Prénom</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Ville</TableCell>
                  <TableCell>Droit</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allUsers.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.firstname}</TableCell>
                    <TableCell>{row.lastname}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.city}</TableCell>
                    <TableCell>
                      {row.role === "ADMIN" ? "Administrateur" : "Utilisateur"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleDeleteUser(row)}
                      >
                        <DeleteOutlineIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <ModalTable open={openDeleteModal} handleClose={handleCloseDeleteModal}>
        <DeleteUser
          row={userRow}
          onClose={handleCloseDeleteModal}
          userMail={user.email}
        />
      </ModalTable>
    </>
  );
};

export { UsersTableView };
