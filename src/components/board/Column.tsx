import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task } from '../../types';
import { TaskCard } from './TaskCard';
import { Add } from '@mui/icons-material';
import { IconButton, Paper, Stack, Box, Typography, Chip, useTheme, alpha } from '@mui/material';

interface ColumnProps {
    id: string; // 'todo', 'doing', 'done'
    tasks: Task[];
    title: string;
    color: string; // Hex color or MUI palette color
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
    onAddTask: () => void;
    isOver?: boolean;
}

export const Column: React.FC<ColumnProps> = ({
    id,
    tasks,
    title,
    color,
    onEdit,
    onDelete,
    onAddTask,
    isOver
}) => {
    const { setNodeRef } = useDroppable({ id });
    const theme = useTheme();

    // Resolve color from theme if possible, or use as is
    const resolveColor = (colorString: string) => {
        const keys = colorString.split('.');
        if (keys.length === 2 && (theme.palette as any)[keys[0]] && (theme.palette as any)[keys[0]][keys[1]]) {
            return (theme.palette as any)[keys[0]][keys[1]];
        }
        return colorString;
    };

    const headerColor = resolveColor(color);

    return (
        <Paper
            ref={setNodeRef}
            elevation={isOver ? 0 : 0}
            variant="outlined"
            sx={{
                bgcolor: isOver ? alpha(headerColor, 0.05) : 'background.default',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                maxHeight: '100%',
                borderRadius: 3,
                minWidth: 320,
                width: 380,
                border: '1px solid',
                borderColor: isOver ? headerColor : 'divider',
                transition: 'all 0.2s',
                ...(isOver && {
                    boxShadow: `0 0 0 2px ${alpha(headerColor, 0.2)}`,
                })
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    p: 2,
                    pb: 1.5,
                    position: 'sticky',
                    top: 0,
                    bgcolor: 'inherit',
                    zIndex: 1,
                    borderRadius: '12px 12px 0 0'
                }}
            >
                <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Box sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '4px',
                        bgcolor: headerColor,
                        boxShadow: `0 0 0 2px ${alpha(headerColor, 0.2)}`
                    }} />
                    <Typography variant="h6" fontSize="1rem" fontWeight="bold" color="text.primary">
                        {title}
                    </Typography>
                    <Chip
                        label={tasks.length}
                        size="small"
                        sx={{
                            height: 20,
                            bgcolor: alpha(theme.palette.text.primary, 0.05),
                            color: 'text.secondary',
                            fontWeight: 'bold',
                            fontSize: '0.75rem',
                            '& .MuiChip-label': { px: 1 }
                        }}
                    />
                </Stack>

                <IconButton size="small" onClick={onAddTask} sx={{
                    color: 'text.secondary',
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                    '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main' }
                }}>
                    <Add fontSize="small" />
                </IconButton>
            </Stack>

            <Box sx={{
                flexGrow: 1,
                overflowY: 'auto',
                p: 1.5,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                scrollbarWidth: 'thin',
                '&::-webkit-scrollbar': { width: '6px' },
                '&::-webkit-scrollbar-track': { background: 'transparent' },
                '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '3px' },
                '&::-webkit-scrollbar-thumb:hover': { backgroundColor: 'rgba(0,0,0,0.2)' }
            }}>
                <SortableContext
                    items={tasks.map(t => t.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {tasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </SortableContext>
                {tasks.length === 0 && (
                    <Box sx={{
                        p: 4,
                        textAlign: 'center',
                        color: 'text.disabled',
                        border: '2px dashed',
                        borderColor: 'divider',
                        borderRadius: 2,
                        mt: 2
                    }}>
                        <Typography variant="body2">No tasks</Typography>
                    </Box>
                )}
            </Box>
        </Paper>
    );
};
