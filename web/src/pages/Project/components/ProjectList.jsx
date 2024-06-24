import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  Tooltip,
  useMediaQuery,
  Grid,
  Fab,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProjectList = ({ projects, onDeleteProject, onEditProject }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const navigate = useNavigate();

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteClick = (projectId) => {
    onDeleteProject(projectId);
  };

  const handleEditClick = (project) => {
    onEditProject(project);
  };

  const handleGoHome = () => {
    navigate('/home');
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.id}</TableCell>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>
                    <Grid container spacing={isMobile ? 1 : 2} justifyContent="center" alignItems="center">
                      <Grid item>
                        <Tooltip title="Editar" arrow>
                          <IconButton aria-label="editar" onClick={() => handleEditClick(project)} style={{ color: 'blue' }}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Tooltip title="Excluir" arrow>
                          <IconButton aria-label="excluir" onClick={() => handleDeleteClick(project.id)} style={{ color: 'red' }}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={projects.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Fab color="primary" aria-label="Voltar para /HOME" onClick={handleGoHome} style={{ position: 'fixed', bottom: '16px', left: '16px' }}>
        <ArrowBackIcon />
      </Fab>
    </Paper>
  );
};

export default ProjectList;
