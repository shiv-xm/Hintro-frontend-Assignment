import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
            light: '#333333',
            dark: '#1A1A1A',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#64748b',
            light: '#94a3b8',
            dark: '#475569',
            contrastText: '#ffffff',
        },
        error: {
            main: '#ef4444',
            light: '#fca5a5',
            dark: '#b91c1c',
        },
        warning: {
            main: '#f59e0b',
            light: '#fcd34d',
            dark: '#b45309',
        },
        success: {
            main: '#10b981',
            light: '#6ee7b7',
            dark: '#047857',
        },
        background: {
            default: '#f3f4f6',
            paper: '#ffffff',
        },
        text: {
            primary: '#1e293b',
            secondary: '#64748b',
        },
        divider: '#e2e8f0',
    },
    typography: {
        fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        h4: {
            fontWeight: 700,
            color: '#1e293b',
        },
        h5: {
            fontWeight: 600,
            color: '#1e293b',
        },
        h6: {
            fontWeight: 600,
            color: '#1e293b',
        },
        subtitle1: {
            fontWeight: 600,
            color: '#334155',
        },
        subtitle2: {
            fontWeight: 600,
            color: '#334155',
        },
        button: {
            fontWeight: 600,
            textTransform: 'none',
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '8px 16px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    },
                },
                containedPrimary: {
                    '&:hover': {
                        backgroundColor: '#1A1A1A',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                    backgroundImage: 'none',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    backgroundColor: '#ffffff',
                    '& fieldset': {
                        borderColor: '#e2e8f0',
                    },
                    '&:hover fieldset': {
                        borderColor: '#cbd5e1',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#000000',
                        borderWidth: 1,
                    },
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 16,
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                },
                filled: {
                    border: '1px solid transparent',
                },
                outlined: {
                    borderWidth: 1,
                },
            },
        },
    },
});

export default theme;
