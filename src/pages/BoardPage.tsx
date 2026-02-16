import React, { useState, useMemo } from 'react';
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragEndEvent,
    defaultDropAnimationSideEffects,
    DropAnimation,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Column } from '../components/board/Column';
import { TaskCard } from '../components/board/TaskCard';
import { TaskModal } from '../components/board/TaskModal';
import { ActivityLog } from '../components/board/ActivityLog';
import { Navbar } from '../components/layout/Navbar';
import useLocalStorage from '../hooks/useLocalStorage';
import { Task, Activity, Priority } from '../types';
import { v4 as uuidv4 } from 'uuid';
import {
    Box,
    Stack,
    TextField,
    MenuItem,
    InputAdornment,
    Button,
    AppBar,
    Toolbar,
    useTheme,
    alpha,
    IconButton,
    Tooltip
} from '@mui/material';
import {
    Search,
    FilterList,
    Sort,
    RestartAlt,
    History,
    Add
} from '@mui/icons-material';

const COLUMNS = [
    { id: 'todo', title: 'To Do', color: 'primary.main' },
    { id: 'doing', title: 'In Progress', color: 'warning.main' },
    { id: 'done', title: 'Done', color: 'success.main' },
];

export const BoardPage: React.FC = () => {
    const theme = useTheme();
    const [tasks, setTasks] = useLocalStorage<Task[]>('board_tasks', []);
    const [activities, setActivities] = useLocalStorage<Activity[]>('board_activities', []);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterPriority, setFilterPriority] = useState<Priority | 'all'>('all');
    const [showActivityLog, setShowActivityLog] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const logActivity = (action: Activity['action'], task: Task, details?: string) => {
        const newActivity: Activity = {
            id: uuidv4(),
            action,
            taskId: task.id,
            taskTitle: task.title,
            details,
            timestamp: new Date().toISOString(),
        };
        setActivities((prev) => [newActivity, ...prev].slice(0, 50));
    };

    const handleTaskSave = (task: Task) => {
        if (editingTask) {
            setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
            logActivity('edit', task);
        } else {
            setTasks([...tasks, task]);
            logActivity('create', task);
        }
    };

    const handleTaskDelete = (id: string) => {
        const taskToDelete = tasks.find((t) => t.id === id);
        if (taskToDelete && window.confirm('Are you sure you want to delete this task?')) {
            setTasks(tasks.filter((t) => t.id !== id));
            logActivity('delete', taskToDelete);
        }
    };

    const handleResetBoard = () => {
        if (window.confirm('Are you sure you want to reset the board? All tasks will be deleted.')) {
            setTasks([]);
            setActivities([]);
        }
    };

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
            return matchesSearch && matchesPriority;
        });
    }, [tasks, searchTerm, filterPriority]);

    // Separate tasks by column
    const tasksByColumn = useMemo(() => {
        const columns: Record<string, Task[]> = {
            todo: [],
            doing: [],
            done: [],
        };
        filteredTasks.forEach((task) => {
            if (columns[task.status]) {
                columns[task.status].push(task);
            }
        });
        return columns;
    }, [filteredTasks]);

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) {
            setActiveId(null);
            return;
        }

        const activeId = active.id as string;
        const overId = over.id as string;

        const activeTask = tasks.find((t) => t.id === activeId);
        if (!activeTask) return;

        // Find if over is a container or a task
        let newStatus = activeTask.status;
        const overTask = tasks.find((t) => t.id === overId);

        if (overTask) {
            newStatus = overTask.status;
        } else if (COLUMNS.some(c => c.id === overId)) {
            newStatus = overId as any;
        }

        if (activeTask.status !== newStatus) {
            const updatedTasks = tasks.map((t) =>
                t.id === activeId ? { ...t, status: newStatus } : t
            );
            setTasks(updatedTasks);
            logActivity('move', activeTask, `Moved to ${newStatus}`);
        } else if (activeId !== overId) {
            const oldIndex = tasks.findIndex((t) => t.id === activeId);
            const newIndex = tasks.findIndex((t) => t.id === overId);
            setTasks(arrayMove(tasks, oldIndex, newIndex));
        }

        setActiveId(null);
    };

    const sortTasks = () => {
        const sorted = [...tasks].sort((a, b) => {
            if (!a.dueDate && !b.dueDate) return 0;
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        });
        setTasks(sorted);
    };

    const dropAnimationConfig: DropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5',
                },
            },
        }),
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Toolbar />


            <AppBar
                position="sticky"
                color="inherit"
                elevation={0}
                sx={{
                    top: 64,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    bgcolor: alpha(theme.palette.background.paper, 0.8),
                    backdropFilter: 'blur(8px)',
                    zIndex: 10
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between', gap: 2, py: 1 }}>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center" flex={1} width="100%">
                        <TextField
                            placeholder="Search tasks..."
                            size="small"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search fontSize="small" color="action" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ width: { xs: '100%', md: 300 } }}
                        />

                        <TextField
                            select
                            size="small"
                            value={filterPriority}
                            onChange={(e) => setFilterPriority(e.target.value as any)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FilterList fontSize="small" color="action" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ width: { xs: '100%', md: 180 } }}
                        >
                            <MenuItem value="all">All Priorities</MenuItem>
                            <MenuItem value="high">High</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="low">Low</MenuItem>
                        </TextField>

                        <Button
                            variant="outlined"
                            startIcon={<Sort />}
                            onClick={sortTasks}
                            color="inherit"
                            sx={{ borderColor: 'divider' }}
                        >
                            Sort by Date
                        </Button>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center">
                        <Tooltip title="Reset Board">
                            <IconButton onClick={handleResetBoard} color="error" sx={{ bgcolor: alpha(theme.palette.error.main, 0.1) }}>
                                <RestartAlt />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Activity Log">
                            <IconButton
                                onClick={() => setShowActivityLog(true)}
                                color={showActivityLog ? 'primary' : 'default'}
                                sx={{ bgcolor: showActivityLog ? alpha(theme.palette.primary.main, 0.1) : 'transparent' }}
                            >
                                <History />
                            </IconButton>
                        </Tooltip>

                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => { setEditingTask(null); setIsTaskModalOpen(true); }}
                            sx={{ px: 3, ml: 2 }}
                            disableElevation
                        >
                            New Task
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>


            <Box component="main" sx={{ flexGrow: 1, overflowX: 'auto', p: 3, display: 'flex', flexDirection: 'column' }}>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <Stack
                        direction="row"
                        spacing={4}
                        sx={{
                            height: '100%',
                            minWidth: 1000,
                            mx: 'auto',
                            alignItems: 'flex-start'
                        }}
                    >
                        {COLUMNS.map((col) => (
                            <Column
                                key={col.id}
                                id={col.id}
                                title={col.title}
                                color={col.color}
                                tasks={tasksByColumn[col.id]}
                                onEdit={(task) => { setEditingTask(task); setIsTaskModalOpen(true); }}
                                onDelete={handleTaskDelete}
                                onAddTask={() => { setEditingTask(null); setIsTaskModalOpen(true); }}
                                isOver={activeId ? true : false}
                            />
                        ))}
                    </Stack>

                    <DragOverlay dropAnimation={dropAnimationConfig}>
                        {activeId ? (
                            <TaskCard
                                task={tasks.find((t) => t.id === activeId)!}
                                onEdit={() => { }}
                                onDelete={() => { }}
                            />
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </Box>


            <ActivityLog
                activities={activities}
                open={showActivityLog}
                onClose={() => setShowActivityLog(false)}
            />

            <TaskModal
                isOpen={isTaskModalOpen}
                onClose={() => setIsTaskModalOpen(false)}
                onSave={handleTaskSave}
                taskToEdit={editingTask}
                initialStatus="todo"
            />
        </Box>
    );
};
