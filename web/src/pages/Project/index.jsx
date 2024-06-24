// src/pages/Project/index.js
import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, Snackbar, Alert, useMediaQuery, useTheme } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import api, { sendProjectData } from '../../client/api';

const Project = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [openModal, setOpenModal] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentProject, setCurrentProject] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleOpenModal = (project) => {
        setCurrentProject(project);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setCurrentProject(null);
        setOpenModal(false);
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    const fetchProjects = async () => {
        try {
            const response = await api.get('/project');
            setProjects(response.data);
        } catch (error) {
            console.error('Erro ao carregar projetos:', error);
        } finally {
            setLoading(false);
        }
    };

    const addOrUpdateProject = async (newProjectData) => {
        try {
            const response = await sendProjectData(newProjectData, currentProject);
            if (currentProject) {
                setProjects(prevProjects =>
                    prevProjects.map(project =>
                        project.id === currentProject.id ? { ...project, ...response.data } : project
                    )
                );
            } else {
                setProjects(prevProjects => [...prevProjects, response.data]);
            }
            handleCloseModal();
        } catch (error) {
            const err = JSON.parse(error.request.response);
            console.error('Erro ao adicionar/atualizar projeto:', error);
            setSnackbarMessage(err.message || 'Erro ao adicionar/atualizar projeto');
            setOpenSnackbar(true);
        }
    };

    const handleDeleteProject = async (projectId) => {
        try {
            await api.delete(`/project/${projectId}`);
            setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
        } catch (error) {
            const err = JSON.parse(error.request.response);
            console.error('Erro ao excluir projeto:', error);
            setSnackbarMessage(err.message || 'Erro ao excluir projeto');
            setOpenSnackbar(true);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ mt: 2, margin: '20px', height: '100vh', overflow: 'auto' }}>
            <Button onClick={() => handleOpenModal(null)} variant="contained" color="primary" sx={{ mb: 2 }}>
                <AddIcon /> Adicionar Novo Projeto
            </Button>

            <Box sx={{ marginBottom: 2 }}>
                <ProjectList
                    projects={projects}
                    onDeleteProject={handleDeleteProject}
                    onEditProject={handleOpenModal}
                />
            </Box>

            <ProjectForm
                open={openModal}
                onClose={handleCloseModal}
                onProjectAdded={addOrUpdateProject}
                projectInitial={currentProject}
            />

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Project;
