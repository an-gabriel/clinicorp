import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Container, useMediaQuery, useTheme } from '@mui/material';
import { AccountCircle, ExitToApp } from '@mui/icons-material';

const drawerWidth = 240;

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div style={{ display: 'flex' }}>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <div>
          <Typography variant="h6" align="center" noWrap>
            Menu
          </Typography>
          <List>
            <ListItemButton component={Link} to="/login">
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemButton>
            <ListItemButton component={Link} to="/signup">
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Registrar" />
            </ListItemButton>
            {/* Adicione mais itens de menu conforme necessário */}
          </List>
        </div>
      </Drawer>
      <Container sx={{ flexGrow: 1, mt: 8, ml: isMobile ? 0 : drawerWidth }}>
        <Typography variant="h4" gutterBottom>
          Bem-vindo ao Dashboard
        </Typography>
        <Typography variant="body1">
          Aqui você pode gerenciar seus projetos e tarefas.
        </Typography>
      </Container>
    </div>
  );
};

export default Dashboard;
