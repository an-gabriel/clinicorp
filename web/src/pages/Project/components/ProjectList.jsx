import React from "react";
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
  Grid,
  Fab,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";

import TaskForm from "../../Task/TaskForm";
import TaskListModal from "../../Task/components/TaskList";
import {
  listTasks,
  createTask,
  updateTask,
  deleteTask,
  deleteProject,
} from "../../../client/api";

const ProjectList = ({ projects, onDeleteProject, onEditProject }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:960px)");
  const [openTaskForm, setOpenTaskForm] = React.useState(false);
  const [editingTask, setEditingTask] = React.useState(null);
  const [selectedProjectId, setSelectedProjectId] = React.useState(null);
  const [openTaskListModal, setOpenTaskListModal] = React.useState(false);
  const [tasks, setTasks] = React.useState([]);

  React.useEffect(() => {
    fetchTasks(selectedProjectId);
  }, [selectedProjectId]);

  const fetchTasks = async (projectId) => {
    try {
      const tasksData = await listTasks(projectId);
      setTasks(tasksData);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteClick = async (projectId) => {
    try {
      await deleteProject(projectId);
    } catch (error) {
      console.error("Erro ao excluir projeto:", error);
    }
  };

  const handleEditClick = (project) => {
    onEditProject(project);
  };

  const handleAddTaskClick = (projectId) => {
    setSelectedProjectId(projectId);
    setEditingTask(null);
    setOpenTaskForm(true);
  };

  const handleListTasksClick = (projectId) => {
    navigate(`/tasks/${projectId}`);
  };

  const handleOpenTaskListModal = async (projectId) => {
    setSelectedProjectId(projectId);
    setOpenTaskListModal(true);
    await fetchTasks(projectId);
  };

  const handleCloseTaskListModal = () => {
    setOpenTaskListModal(false);
  };

  const handleGoHome = () => {
    navigate("/home");
  };

  const handleTaskFormSubmit = async (taskData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, taskData);
      } else {
        await createTask(selectedProjectId, taskData);
      }
      setOpenTaskForm(false);
      fetchTasks(selectedProjectId);
    } catch (error) {
      console.error("Erro ao salvar tarefa:", error);
    }
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
              <TableCell sx={{ textAlign: "center" }}>Ações</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Tarefas</TableCell>
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
                    <Grid
                      container
                      spacing={isMobile ? 1 : 2}
                      justifyContent="center"
                      alignItems="center">
                      <Grid item>
                        <Tooltip title="Editar" arrow>
                          <IconButton
                            aria-label="editar"
                            onClick={() => handleEditClick(project)}
                            style={{ color: "blue" }}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Tooltip title="Excluir" arrow>
                          <IconButton
                            aria-label="excluir"
                            onClick={() => handleDeleteClick(project.id)}
                            style={{ color: "red" }}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    <Grid
                      container
                      spacing={isMobile ? 1 : 2}
                      justifyContent="center"
                      alignItems="center">
                      <Grid item>
                        <Tooltip title="Adicionar Tarefa" arrow>
                          <IconButton
                            aria-label="adicionar-tarefa"
                            onClick={() => handleAddTaskClick(project.id)}
                            style={{ color: "green" }}>
                            <AddIcon />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Tooltip title="Listar Tarefas" arrow>
                          <IconButton
                            aria-label="listar-tarefas"
                            onClick={() => handleOpenTaskListModal(project.id)}
                            style={{ color: "purple" }}>
                            <ListIcon />
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
      <TaskForm
        open={openTaskForm}
        onClose={() => setOpenTaskForm(false)}
        onSubmit={handleTaskFormSubmit}
        editingTask={editingTask}
        projectId={selectedProjectId}
      />

      <TaskListModal
        open={openTaskListModal}
        onClose={handleCloseTaskListModal}
        tasks={tasks}
        onDeleteTask={async (taskId) => {
          try {
            await deleteTask(taskId);
            fetchTasks(selectedProjectId);
          } catch (error) {
            console.error("Erro ao excluir tarefa:", error);
          }
        }}
        onEditTask={(task) => {
          setEditingTask(task);
          setOpenTaskForm(true);
        }}
      />

      <Fab
        color="primary"
        aria-label="Voltar para /HOME"
        onClick={handleGoHome}
        style={{ position: "fixed", bottom: "16px", left: "16px" }}>
        <ArrowBackIcon />
      </Fab>
    </Paper>
  );
};

export default ProjectList;
