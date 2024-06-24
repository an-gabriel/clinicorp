import React, { useEffect } from 'react';
import { TextField, Button, Typography, Modal, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ProjectForm = ({ open, onClose, onProjectAdded, projectInitial }) => {
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Nome é obrigatório'),
            description: Yup.string().required('Descrição é obrigatória'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                await onProjectAdded(values);
                resetForm();
                onClose();
            } catch (error) {
                console.error('Erro ao salvar projeto:', error);
            }
        },
    });

    useEffect(() => {
        if (projectInitial) {
            formik.setValues(projectInitial);
        } else {
            formik.resetForm();
        }
    }, [projectInitial]);

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-adicionar-projeto">
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    width: 400,
                    maxWidth: '90%',
                }}
            >
                <Typography variant="h6" gutterBottom>
                    {projectInitial ? 'Editar Projeto' : 'Novo Projeto'}
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        label="Nome do Projeto"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="normal"
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                        label="Descrição do Projeto"
                        id="description"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        {projectInitial ? 'Salvar Edição' : 'Adicionar'}
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default ProjectForm;
