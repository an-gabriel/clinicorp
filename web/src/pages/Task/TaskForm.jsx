import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { createTask, updateTask } from "../../client/api";

const TaskForm = ({ open, onClose, onSubmit, editingTask, projectId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDescription(editingTask.description || "");
      setStatus(editingTask.status || "PENDING");
    } else {
      setTitle("");
      setDescription("");
      setStatus("PENDING");
    }
  }, [editingTask]);

  const handleSubmit = async () => {
    const newTask = {
      title,
      description,
      status,
      projectId,
    };

    setLoading(true);

    try {
      if (editingTask) {
        await updateTask(editingTask.id, newTask);
      } else {
        await createTask(projectId, newTask);
      }
      onSubmit();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar tarefa:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {editingTask ? "Editar Tarefa" : "Adicionar Nova Tarefa"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Título"
          type="text"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          id="description"
          label="Descrição"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value="PENDING">Pendente</MenuItem>
            <MenuItem value="COMPLETED">Concluída</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={loading}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={loading}>
          {loading ? (
            <CircularProgress size={24} />
          ) : editingTask ? (
            "Salvar Alterações"
          ) : (
            "Adicionar Tarefa"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;
