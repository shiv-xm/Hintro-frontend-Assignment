import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../../types';
import { formatDate, isOverdue } from '../../utils/date';
import { CalendarMonth, Edit, DeleteOutline, DragIndicator } from '@mui/icons-material';
import { Card, CardContent, Typography, Stack, Chip, IconButton, Box, useTheme, alpha, Tooltip } from '@mui/material';

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
}

const getPriorityColor = (priority: string): 'error' | 'warning' | 'success' | 'default' => {
    switch (priority) {
        case 'high': return 'error';
        case 'medium': return 'warning';
        case 'low': return 'success';
        default: return 'default';
    }
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
    const theme = useTheme();
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id, data: { type: 'Task', task } });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    if (isDragging) {
        return (
            <Card
                ref={setNodeRef}
                style={style}
                sx={{
                    opacity: 0.4,
                    border: '1px dashed',
                    borderColor: 'primary.main',
                    bgcolor: 'action.hover',
                    minHeight: 120,
                    boxShadow: 'none',
                    borderRadius: 3
                }}
            />
        );
    }

    return (
        <Card
            ref={setNodeRef}
            style={style}
            elevation={0}
            sx={{
                position: 'relative',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                bgcolor: 'background.paper',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    borderColor: 'primary.light',
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[4],
                    '& .action-buttons': { opacity: 1 },
                    '& .drag-handle': { opacity: 1 },
                },
            }}
            onClick={() => onEdit(task)}
        >
            <Box
                {...attributes}
                {...listeners}
                className="drag-handle"
                sx={{
                    position: 'absolute',
                    top: 12,
                    right: 8,
                    color: 'text.disabled',
                    cursor: 'grab',
                    opacity: 0,
                    transition: 'opacity 0.2s',
                    zIndex: 2,
                    '&:hover': { color: 'text.primary' },
                    '&:active': { cursor: 'grabbing' }
                }}
            >
                <DragIndicator fontSize="small" />
            </Box>

            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Stack spacing={1.5}>
                    <Box pr={3}>
                        <Chip
                            label={task.priority}
                            size="small"
                            color={getPriorityColor(task.priority)}
                            variant="filled"
                            sx={{
                                height: 22,
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                borderRadius: 1.5,
                                mb: 1
                            }}
                        />
                        <Typography variant="subtitle1" fontWeight="600" lineHeight={1.3} color="text.primary">
                            {task.title}
                        </Typography>
                    </Box>

                    {task.description && (
                        <Typography variant="body2" color="text.secondary" sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            minHeight: '2.5em',
                            fontSize: '0.8125rem'
                        }}>
                            {task.description}
                        </Typography>
                    )}

                    <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                        <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5} sx={{ maxWidth: '65%' }}>
                            {task.tags.map(tag => (
                                <Chip
                                    key={tag}
                                    label={`#${tag}`}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                        height: 20,
                                        fontSize: '0.65rem',
                                        borderColor: 'divider',
                                        color: 'text.secondary',
                                        bgcolor: 'transparent'
                                    }}
                                />
                            ))}
                        </Stack>

                        {task.dueDate && (
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={0.5}
                                sx={{
                                    color: isOverdue(task.dueDate) ? 'error.main' : 'text.secondary',
                                    ml: 'auto'
                                }}
                            >
                                <CalendarMonth sx={{ fontSize: 14 }} />
                                <Typography variant="caption" fontWeight="medium">
                                    {formatDate(task.dueDate)}
                                </Typography>
                            </Stack>
                        )}
                    </Stack>
                </Stack>

                <Box
                    className="action-buttons"
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        display: 'flex',
                        gap: 0.5,
                        opacity: 0,
                        transition: 'opacity 0.2s',
                        bgcolor: 'background.paper',
                        borderRadius: 4,
                        boxShadow: 1,
                        p: 0.5
                    }}
                >
                    <Tooltip title="Edit">
                        <IconButton size="small" onClick={() => onEdit(task)} sx={{ color: 'primary.main', '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) } }}>
                            <Edit fontSize="small" sx={{ fontSize: 16 }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton
                            size="small"
                            onClick={() => onDelete(task.id)}
                            sx={{ color: 'error.main', '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.1) } }}
                        >
                            <DeleteOutline fontSize="small" sx={{ fontSize: 16 }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </CardContent>
        </Card>
    );
};
