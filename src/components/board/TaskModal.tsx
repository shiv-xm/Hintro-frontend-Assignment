import React, { useState, useEffect } from 'react';
import { Priority, Task } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    Stack,
    Typography,
    InputAdornment,
    useTheme
} from '@mui/material';
import {
    Title,
    Description,
    Flag,
    CalendarMonth,
    LocalOffer
} from '@mui/icons-material';

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (task: Task) => void;
    taskToEdit?: Task | null;
    initialStatus: 'todo' | 'doing' | 'done';
}

export const TaskModal: React.FC<TaskModalProps> = ({
    isOpen,
    onClose,
    onSave,
    taskToEdit,
    initialStatus
}) => {
    const theme = useTheme();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<Priority>('medium');
    const [dueDate, setDueDate] = useState('');
    const [tags, setTags] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            if (taskToEdit) {
                setTitle(taskToEdit.title);
                setDescription(taskToEdit.description || '');
                setPriority(taskToEdit.priority);
                setDueDate(taskToEdit.dueDate ? new Date(taskToEdit.dueDate).toISOString().split('T')[0] : '');
                setTags(taskToEdit.tags.join(', '));
            } else {
                setTitle('');
                setDescription('');
                setPriority('medium');
                setDueDate('');
                setTags('');
            }
            setError('');
        }
    }, [isOpen, taskToEdit]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            setError('Title is required');
            return;
        }

        const newTask: Task = {
            id: taskToEdit ? taskToEdit.id : uuidv4(),
            title,
            description: description.trim() || undefined,
            priority,
            status: taskToEdit ? taskToEdit.status : initialStatus,
            dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
            tags: tags.split(',').map(t => t.trim()).filter(Boolean),
            createdAt: taskToEdit ? taskToEdit.createdAt : new Date().toISOString(),
        };

        onSave(newTask);
        onClose();
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    boxShadow: theme.shadows[10]
                }
            }}
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle sx={{
                    pb: 1,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.default'
                }}>
                    <Typography variant="h6" fontWeight="bold">
                        {taskToEdit ? 'Edit Task' : 'Create New Task'}
                    </Typography>
                </DialogTitle>

                <DialogContent sx={{ pt: 3 }}>
                    <Stack spacing={3} sx={{ mt: 1 }}>
                        <TextField
                            label="Task Title"
                            placeholder="What needs to be done?"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                if (error) setError('');
                            }}
                            error={!!error}
                            helperText={error}
                            fullWidth
                            autoFocus
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Title color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            label="Description"
                            placeholder="Add some details..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            multiline
                            rows={3}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                                        <Description color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <TextField
                                select
                                label="Priority"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value as Priority)}
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Flag color={
                                                priority === 'high' ? 'error' :
                                                    priority === 'medium' ? 'warning' : 'success'
                                            } />
                                        </InputAdornment>
                                    ),
                                }}
                            >
                                <MenuItem value="low">Low</MenuItem>
                                <MenuItem value="medium">Medium</MenuItem>
                                <MenuItem value="high">High</MenuItem>
                            </TextField>

                            <TextField
                                label="Due Date"
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CalendarMonth color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Stack>

                        <TextField
                            label="Tags"
                            placeholder="design, web, urgent (comma separated)"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocalOffer color="action" />
                                    </InputAdornment>
                                ),
                            }}
                            helperText="Separate multiple tags with commas"
                        />
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ p: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.default' }}>
                    <Button onClick={onClose} color="inherit" sx={{ color: 'text.secondary' }}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disableElevation
                        sx={{
                            px: 3
                        }}
                    >
                        {taskToEdit ? 'Save Changes' : 'Create Task'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
