import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { Logout } from '@mui/icons-material';
import { AppBar, Toolbar, Typography, Box, Stack, Avatar, IconButton, Tooltip, useTheme, alpha } from '@mui/material';

export const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const theme = useTheme();

    if (!user) return null;

    return (
        <AppBar
            position="fixed"
            color="inherit"
            elevation={0}
            sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
                bgcolor: alpha(theme.palette.background.paper, 0.9),
                backdropFilter: 'blur(8px)',
                zIndex: theme.zIndex.drawer + 1
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', minHeight: 64 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                        sx={{
                            width: 32,
                            height: 32,
                            bgcolor: 'primary.main',
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.2)}`
                        }}
                    >
                        H
                    </Box>
                    <Typography
                        variant="h6"
                        fontWeight="700"
                        sx={{
                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            letterSpacing: -0.5
                        }}
                    >
                        Hintro Dashboard
                    </Typography>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        px: 1.5,
                        py: 0.75,
                        bgcolor: 'background.default',
                        borderRadius: 50,
                        border: '1px solid',
                        borderColor: 'divider'
                    }}>
                        <Avatar
                            sx={{
                                width: 24,
                                height: 24,
                                bgcolor: 'secondary.main',
                                fontSize: '0.75rem'
                            }}
                        >
                            {user.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Stack spacing={0}>
                            <Typography variant="subtitle2" fontSize="0.85rem" fontWeight="600" lineHeight={1.2}>
                                {user.name}
                            </Typography>
                            <Typography variant="caption" fontSize="0.7rem" color="text.secondary" lineHeight={1}>
                                Intern User
                            </Typography>
                        </Stack>
                    </Box>

                    <Tooltip title="Logout">
                        <IconButton
                            onClick={logout}
                            size="small"
                            sx={{
                                color: 'text.secondary',
                                '&:hover': { color: 'error.main', bgcolor: alpha(theme.palette.error.main, 0.1) }
                            }}
                        >
                            <Logout fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};
