import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { PersonAdd, ListAlt } from "@mui/icons-material";
import Logout from "../components/Logout";
import RegistrationForm from "./SignUp";

const drawerWidth = 240;

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openRegistrar, setOpenRegistrar] = useState(false);

  const toggleDrawer = (open) => (event) => {
    setOpenRegistrar(open);
  };

  return (
    <div style={{ display: "flex" }}>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        open={!isMobile || openRegistrar}
        onClose={toggleDrawer(false)}>
        <Toolbar />
        <div>
          <Typography variant="h6" align="center" noWrap>
            Menu
          </Typography>
          <List>
            <Logout />
            <ListItemButton onClick={() => setOpenRegistrar(true)}>
              <ListItemIcon>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText primary="Registrar" />
            </ListItemButton>
            <ListItemButton component={Link} to="/projects">
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              <ListItemText primary="Projetos" />
            </ListItemButton>
          </List>
        </div>
      </Drawer>
      <Container sx={{ flexGrow: 1, mt: 8 }}>
        {!openRegistrar && (
          <>
            <Typography variant="h4" align="center" gutterBottom>
              Bem-vindo ao Dashboard
            </Typography>
            <Typography variant="body1" align="center">
              Aqui você pode gerenciar seus projetos e tarefas.
            </Typography>
          </>
        )}
        {openRegistrar && <RegistrationForm />}
      </Container>
    </div>
  );
};

export default Dashboard;
