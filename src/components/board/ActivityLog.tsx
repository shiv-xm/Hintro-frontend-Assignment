import React from 'react';
import { Activity } from '../../types';
import { History } from '@mui/icons-material';
import {
    Drawer,
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    useTheme,
    alpha
} from '@mui/material';

interface ActivityLogProps {
    activities: Activity[];
    open: boolean;
    onClose: () => void;
}

export const ActivityLog: React.FC<ActivityLogProps> = ({ activities, open, onClose }) => {
    const theme = useTheme();

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': {
                    width: 350,
                    boxSizing: 'border-box',
                    bgcolor: 'background.default',
                },
            }}
        >
            <Box sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                bgcolor: 'background.paper',
                borderBottom: '1px solid',
                borderColor: 'divider',
                position: 'sticky',
                top: 0,
                zIndex: 1
            }}>
                <History color="primary" />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Activity Log
                </Typography>
            </Box>

            <List sx={{ p: 0 }}>
                {activities.length === 0 ? (
                    <Box sx={{ p: 4, textAlign: 'center', opacity: 0.6 }}>
                        <History sx={{ fontSize: 48, mb: 1, color: 'text.disabled' }} />
                        <Typography variant="body2" color="text.secondary">
                            No recent activity.
                        </Typography>
                    </Box>
                ) : (
                    activities.map((activity, index) => (
                        <React.Fragment key={activity.id}>
                            <ListItem alignItems="flex-start" sx={{
                                px: 3,
                                py: 2,
                                bgcolor: 'background.paper'
                            }}>
                                <Box sx={{
                                    mt: 0.8,
                                    mr: 2,
                                    width: 10,
                                    height: 10,
                                    borderRadius: '50%',
                                    bgcolor: getActionColor(activity.action, theme),
                                    boxShadow: `0 0 0 3px ${alpha(getActionColor(activity.action, theme), 0.2)}`
                                }} />
                                <ListItemText
                                    primary={
                                        <Typography variant="subtitle2" component="span" sx={{ display: 'block', mb: 0.5 }}>
                                            {getActionLabel(activity.action)}
                                            <Typography component="span" variant="subtitle2" color="primary" fontWeight="bold" sx={{ ml: 0.5 }}>
                                                "{activity.taskTitle}"
                                            </Typography>
                                        </Typography>
                                    }
                                    secondary={
                                        <Box component="span" sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                            {activity.details && (
                                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                                    {activity.details}
                                                </Typography>
                                            )}
                                            <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.7rem' }}>
                                                {new Date(activity.timestamp).toLocaleString(undefined, {
                                                    dateStyle: 'medium',
                                                    timeStyle: 'short'
                                                })}
                                            </Typography>
                                        </Box>
                                    }
                                    disableTypography
                                />
                            </ListItem>
                            {index < activities.length - 1 && <Divider component="li" variant="inset" />}
                        </React.Fragment>
                    ))
                )}
            </List>
        </Drawer>
    );
};

function getActionLabel(action: string) {
    switch (action) {
        case 'create': return 'Created task';
        case 'edit': return 'Updated task';
        case 'move': return 'Moved task';
        case 'delete': return 'Deleted task';
        default: return 'Modified task';
    }
}

function getActionColor(action: string, theme: any) {
    switch (action) {
        case 'create': return theme.palette.success.main;
        case 'delete': return theme.palette.error.main;
        case 'move': return theme.palette.info.main || theme.palette.primary.main;
        case 'edit': return theme.palette.warning.main;
        default: return theme.palette.grey[500];
    }
}
