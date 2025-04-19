import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { ExpandMore, SaveRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs-react";
import PropTypes from "prop-types";

/**
 * Component for managing user details and password updates in a side view.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.user - The user object containing user details.
 * @param {Function} props.setAlert - Function to set alert messages for success or error notifications.
 * @param {Function} props.refreshData - Function to refresh user data after updates.
 *
 * @returns {JSX.Element} The rendered SideViewUser component.
 *
 * @description
 * This component allows for viewing and editing user details, as well as updating passwords.
 * It supports both creating new users and editing existing ones. Password updates are handled
 * securely using hashed passwords. Alerts are displayed for success or error states, and
 * unauthorized access redirects the user to the login page.
 *
 * @example
 * <SideViewUser
 *   user={currentUser}
 *   setAlert={setAlertFunction}
 *   refreshData={refreshUserDataFunction}
 * />
 */
function SideViewUser({ user, setAlert, refreshData }) {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState(user);
  const [sendLoading, setSendLoading] = useState(false);
  const [password, setPassword] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setNewUser(user);
    setPassword({ oldPassword: "", password: "", confirmPassword: "" });
  }, [user]);

  const sendUser = async () => {
    setSendLoading(true);
    const isNewUser = newUser.id === -1;

    if (password.password !== password.confirmPassword) {
      setAlert({
        type: "error",
        message: "Les mots de passe ne correspondent pas",
      });
      setSendLoading(false);
      return;
    }

    const userUrl = `http://${process.env.REACT_APP_BACKEND_URL}:${
      process.env.REACT_APP_BACKEND_PORT
    }/api/${localStorage.getItem("restaurantID")}/users/${
      isNewUser ? "" : user.id
    }`;
    const method = isNewUser ? "POST" : "PUT";

    const body = {
      ...newUser,
      ...(isNewUser &&
        password.password && {
          password: bcrypt.hashSync(
            password.password,
            process.env.REACT_APP_SALT_HASH
          ),
        }),
    };

    try {
      const res = await fetch(userUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
      });

      if (res.status === 200 || res.status === 201) {
        if (!isNewUser && password.password) {
          const passRes = await fetch(
            `http://${process.env.REACT_APP_BACKEND_URL}:${
              process.env.REACT_APP_BACKEND_PORT
            }/api/${localStorage.getItem("restaurantID")}/users/${
              user.id
            }/password`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({
                oldPassword: bcrypt.hashSync(
                  password.oldPassword,
                  process.env.REACT_APP_SALT_HASH
                ),
                newPassword: bcrypt.hashSync(
                  password.password,
                  process.env.REACT_APP_SALT_HASH
                ),
              }),
            }
          );

          if (passRes.status !== 200) {
            const errorMsg =
              passRes.status === 400
                ? "Erreur lors de la mise à jour du mot de passe"
                : "Erreur inconnue lors de la mise à jour du mot de passe";
            setAlert({ type: "error", message: errorMsg });
            throw new Error(errorMsg);
          }

          setAlert({
            type: "success",
            message: "Mot de passe mis à jour avec succès",
          });
        } else {
          setAlert({
            type: "success",
            message: isNewUser
              ? "Utilisateur ajouté avec succès"
              : "Utilisateur mis à jour avec succès",
          });
        }

        refreshData();
      } else if (res.status === 400) {
        setAlert({
          type: "error",
          message: "Erreur lors de la mise à jour de l'utilisateur",
        });
      } else if (res.status === 401) {
        navigate("/", {
          state: { error: "Unauthorized access. Please log in." },
        });
      } else {
        setAlert({ type: "error", message: "Erreur lors de l'opération" });
      }
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "Une erreur est survenue" });
    } finally {
      setSendLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <Stack spacing={2} className="mb-4">
        <TextField
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          label="Nom d'utilisateur"
          variant="standard"
        />
        <TextField
          value={newUser.firstname}
          onChange={(e) =>
            setNewUser({ ...newUser, firstname: e.target.value })
          }
          label="Prénom"
          variant="standard"
        />
        <TextField
          value={newUser.lastname}
          onChange={(e) => setNewUser({ ...newUser, lastname: e.target.value })}
          label="Nom"
          variant="standard"
        />

        {newUser.id === -1 ? (
          <div className="flex flex-col">
            <TextField
              value={password.password}
              onChange={(e) =>
                setPassword({ ...password, password: e.target.value })
              }
              label="Nouveau mot de passe"
              variant="standard"
            />
            <TextField
              value={password.confirmPassword}
              onChange={(e) =>
                setPassword({ ...password, confirmPassword: e.target.value })
              }
              label="Confirmer mot de passe"
              variant="standard"
            />
          </div>
        ) : (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              Mot de passe
            </AccordionSummary>
            <AccordionDetails>
              <div className="w-full flex flex-col">
                <TextField
                  value={password.oldPassword}
                  onChange={(e) =>
                    setPassword({ ...password, oldPassword: e.target.value })
                  }
                  label="Ancien mot de passe"
                  variant="standard"
                />
                <TextField
                  value={password.password}
                  onChange={(e) =>
                    setPassword({ ...password, password: e.target.value })
                  }
                  label="Nouveau mot de passe"
                  variant="standard"
                />
                <TextField
                  value={password.confirmPassword}
                  onChange={(e) =>
                    setPassword({
                      ...password,
                      confirmPassword: e.target.value,
                    })
                  }
                  label="Confirmer mot de passe"
                  variant="standard"
                />
              </div>
            </AccordionDetails>
          </Accordion>
        )}

        <Button
          onClick={sendUser}
          endIcon={<SaveRounded />}
          variant="contained"
          style={{ backgroundColor: "#499CA6" }}
          disabled={sendLoading}
        >
          Enregistrer
        </Button>
      </Stack>
    </div>
  );
}

SideViewUser.propTypes = {
  user: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  refreshData: PropTypes.func.isRequired,
};

export default SideViewUser;
