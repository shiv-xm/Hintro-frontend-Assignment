export type Priority = 'low' | 'medium' | 'high';

export interface Task {
    id: string;
    title: string;
    description?: string;
    priority: Priority;
    dueDate?: string;
    tags: string[];
    createdAt: string;
    status: 'todo' | 'doing' | 'done';
}

export interface User {
    email: string;
    name: string;
}

export interface BoardState {
    tasks: Task[];
}

export type SortOption = 'dueDate' | 'title' | 'priority' | 'createdAt';

export interface Activity {
    id: string;
    action: 'create' | 'edit' | 'move' | 'delete';
    taskId: string;
    taskTitle: string;
    details?: string;
    timestamp: string;
}
