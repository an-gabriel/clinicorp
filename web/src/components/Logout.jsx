import React, { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    handleDialogClose();
    navigate("/");
  };

  return (
    <>
      <ListItemButton onClick={handleDialogOpen}>
        <ListItemIcon>
          <IconButton style={{ padding: 0 }}>
            <ExitToAppIcon />
          </IconButton>
        </ListItemIcon>
        <ListItemText primary="Sair" />
      </ListItemButton>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirmar Logout</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Tem certeza que deseja sair?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Não
          </Button>
          <Button onClick={handleLogout} color="primary">
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Logout;
